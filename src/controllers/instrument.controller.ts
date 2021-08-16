import {Request, Response} from "express"
import log from "../logger"
import instrumentModel from "../models/instrument.model"

export async function getASpecificInstrument(req: Request, res:Response) {

    try 
    {
        const instrumentId: string = req.params.instrumentId



        const instrument = await instrumentModel.findOne( {_id : instrumentId}, "_id name params" ).lean()

        if (!instrument){

            res.status(404).json({
                ok:"False",
                msg:"instrument not found"
            })
            return
        }


        res.status(200).json(instrument)

        
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