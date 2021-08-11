import { Request, Response} from "express"
import log from "../logger"
import instrumentModel from "../models/instrument.model"
import pointModel from "../models/point.model"
import countStatuses from "../utils/calc.utils"


const pageSize = 2500

export async function getInstrumentPoints (req :Request,res: Response){

    try {
        // get all the reuest params and query params
        const instrumentId = req.params.instrumentId
        let startDate:any  = req.query.startDate 
        let endDate:any = req.query.endDate
        const page = Number(req.query.page)  || 1
        let queryParameters:any = { instrument:instrumentId }

        // represent the fields to query
        let fields = "_id datetime  open high low close"

        if ( req.query.calc){
            fields += " calcs"
        }
        
        let calcTotal: any= {}

        if ( startDate && endDate) {
            
            startDate = new Date( startDate + "Z" )
            endDate =  new Date( endDate + "Z" )

            queryParameters.datetime = { $gte: startDate, $lte: endDate }

            // Get the counting of the documents
            calcTotal  = await pointModel.find( queryParameters, "calcs" ).exec()
           // calcTotal = await countStatuses(calcTotal) 

        } else {
            calcTotal = await instrumentModel.findOne( {_id: instrumentId } , "buy sell stop"  ).lean() 

            calcTotal = {
                buy: calcTotal.buy,
                sell: calcTotal.sell,
                stop: calcTotal.stop
            }

            startDate = await pointModel.findOne( {instrument: instrumentId } ,"datetime" ).sort("datetime").lean()
            endDate = await pointModel.findOne( {instrument: instrumentId } ,"datetime" ).sort("-datetime").lean()

            startDate  = startDate.datetime 
            endDate = endDate.datetime

        }

        // Get the counting of the documents
        let count  = await pointModel.countDocuments( queryParameters )
                                     
        count = Math.ceil(count / pageSize)

        //Get the points paginated
        const points = await pointModel.find( queryParameters, fields )
            .limit(pageSize)
            .skip( (page - 1) * pageSize)
            .lean()

        const resp = {
            total: count,
            start: startDate,
            end: endDate,
            calcTotal,
            data : points
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