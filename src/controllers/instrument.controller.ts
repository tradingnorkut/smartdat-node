import {Request, Response} from "express"
import log from "../logger"
import instrumentModel from "../models/instrument.model"

export async function getASpecificInstrument(req: Request, res:Response) {

    try 
    {
        const instrumentId: string = req.params.instrumentId

        const query = await instrumentModel.find( {_id : instrumentId}, "_id name params" ).exec()


        res.status(200).json(query)

        
    } catch (err) {
        log.error(err)
        res.status(500).json(
            {
                ok:false,
                msg:"Internal server Error"
            }
        )
    }
    
}