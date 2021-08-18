import { Request, Response} from "express"
import log from "../logger"
import instrumentModel from "../models/instrument.model"
import pointModel from "../models/point.model"
import countStatuses, { countStatusesFiltered } from "../utils/calc.utils"
import formatStrategiesAndCountingByTimeframe, { APROX_PAGE_SIZE, getTimeframeValue, TIMEFRAMES } from "../utils/specialQueries"




export async function getInstrumentPoints (req :Request,res: Response){

    try {
        // get all the reuest params and query params
        const instrumentId = req.params.instrumentId
        let startDate:any  = req.query.startDate 
        let endDate:any = req.query.endDate
        const page = Number(req.query.page)  || 1
        let queryParameters:any = { instrument:instrumentId }
        let formattedQuery:any =[]
        let start:any = ""
        let end:any = ""

        const timeframeString = req.query.tf

        let timeframeValue = 0

        if( timeframeString){

            timeframeValue = getTimeframeValue( timeframeString )
        }
        

        const pageSize = Math.ceil(APROX_PAGE_SIZE / timeframeValue ) * timeframeValue
        
        // represent the fields to query
        let fields = "_id datetime  open high low close calcs"

        
        let calcTotal: any= {}

        if ( startDate && endDate) {
            start = startDate
            end = endDate
            startDate = new Date( startDate  )
            endDate =  new Date( endDate  )

            queryParameters.datetime = { $gte: startDate, $lte: endDate }

            // Get the counting of the documents
            calcTotal  = await pointModel.find( queryParameters ).lean()
            formattedQuery = await formatStrategiesAndCountingByTimeframe( calcTotal, timeframeValue )
            calcTotal = await countStatusesFiltered(formattedQuery)


        } else {
            calcTotal = await instrumentModel.findOne( {_id: instrumentId } , "buy sell stop"  ).lean() 

            calcTotal = {
                buy: calcTotal.buy,
                sell: calcTotal.sell,
                stop: calcTotal.stop
            }

            //get the initial and final date for the instrument records
            start = await pointModel.findOne( {instrument: instrumentId } ,"datetime" ).sort("datetime").lean()
            end = await pointModel.findOne( {instrument: instrumentId } ,"datetime" ).sort("-datetime").lean()

            start  = start.datetime 
            end = end.datetime

        }

        

        // Get the counting of the documents
        let count  = await pointModel.countDocuments( queryParameters )
                                     
        count = Math.ceil(count / pageSize)

        //Get the points paginated
        const points = await pointModel.find( queryParameters, fields )
            .sort("datetime")
            .limit(pageSize)            
            .skip( (page - 1) * pageSize)
            .lean()

        formattedQuery = await formatStrategiesAndCountingByTimeframe( points, timeframeValue )

        const resp = {
            total: count,
            start,
            end,
            calcTotal,
            data : formattedQuery
        }

        //Send the final data
        res.status(200).json(resp)
    } catch(err){
        log.error(err)
        res.status(500).json(
            {
                ok:false,
                msg:"Internal server Error"
            }
        )
    }


}

export async  function getASpecificCoordinateWithCalcs( req: Request, res:Response){
    try{
        const pointId= req.params.pointId
        const coordinate = await pointModel.findOne({_id: pointId},"_id datetime open high low close calcs").lean()

        res.status(200).json(coordinate)
    } catch(err){
        log.error(err)
        res.status(500).json(
            {
                ok:false,
                msg:"Internal server Error"
            }
        )
    }
}