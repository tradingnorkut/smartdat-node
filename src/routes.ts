import { Router } from "express"
import { getASpecificInstrument } from "./controllers/instrument.controller"
import { getAllQueries, getASpecificQuery } from "./controllers/query.controller"

const router = Router()

//Queries routes
router.get("/queries",getAllQueries)
router.get("/queries/:queryId",getASpecificQuery)

//Instruments Routes
router.get("/instruments/:instrumentId", getASpecificInstrument)

export default router