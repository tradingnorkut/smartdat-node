import { Express,Request,Response } from "express"

function custom404Handler ( app:Express  ) {
    app.get("*", (req:Request ,res:Response) => {
        res.status(404).json({
            ok:"False",
            msg:"Page not found"
        })
    })
}

export default custom404Handler