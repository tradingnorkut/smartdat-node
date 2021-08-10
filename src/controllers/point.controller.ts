import { Request, Response} from "express"
import log from "../logger"
import pointModel from "../models/point.model"


const pageSize = 2500

export async function getInstrumentPoints (req :Request,res: Response){

    console.log(req.query)

    let startDate:any  = req.query.startDate 
    let endDate:any = req.query.endDate
    const page = Number(req.query.page)  || 1

    let fields = "_id datetime high low close"

    if ( req.query.calc){
        fields += " calcs"
    }

    if ( startDate && endDate) {
        
        startDate = new Date( startDate + "Z" )
        endDate =  new Date( endDate + "Z" )

        let count  = await pointModel.countDocuments( {"datetime": { "$gte": startDate, "$lte": endDate } } )
                        .exec()

        const points = await pointModel.find( {"datetime": { "$gte": startDate, "$lte": endDate } }, fields )
                                     .limit(pageSize)
                                     .skip( (page - 1) * pageSize)
                                     .exec()

        count = Math.ceil(count / pageSize)
        
        console.log(count)
        const resp = {
            total: count,
            start: startDate,
            end: endDate,
            data : points
        }
        res.status(200).json(resp)
                            
    }

    res.send("ok")


   


}