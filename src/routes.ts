import { Router, Request, Response } from "express"
import { getAllQueries } from "./controllers/query.controller"

const router = Router()

router.get("/",(req:Request, res:Response) => {
    res.status(200).json(
        {
            status: "ok"
        }
    )
})

router.get("/queries",getAllQueries)

export default router