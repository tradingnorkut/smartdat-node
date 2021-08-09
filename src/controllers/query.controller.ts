import { Request, Response} from "express"
import log from "../logger"
import queryModel from "../models/query.model"


export async function getAllQueries (req :Request,res: Response){
    try{
        const queries = await queryModel.find({}).populate("instrument", "name")
                                        .exec()

        console.log(queries[0].instrument.name)
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