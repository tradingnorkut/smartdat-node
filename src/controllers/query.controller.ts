import { Request, Response} from "express"
import log from "../logger"
import instrumentModel from "../models/instrument.model"
import queryModel from "../models/query.model"
import map from "../utils/async.utils"


export async function getAllQueries (req :Request,res: Response){
    try{
        // Find the reque
        let queries = await queryModel.find({}).exec()
        
        if (queries){
            queries = await map(queries, async (query:any) => {
                const instruments = await instrumentModel.find({query:query._id}, "_id name").exec()

                return {
                    _id: query._id,
                    name: query.name,
                    datetime: query.datetime,
                    instruments
                }

            })
        }

        res.status(200).json(queries)

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