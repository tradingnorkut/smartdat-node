import { Router } from "express"
import { getASpecificInstrument } from "./controllers/instrument.controller"
import { getASpecificCoordinateWithCalcs, getInstrumentPoints } from "./controllers/point.controller"
import { getAllQueries, getASpecificQuery } from "./controllers/query.controller"

const router = Router()

//Queries routes
router.get("/queries",getAllQueries)
router.get("/queries/:queryId",getASpecificQuery)

//Instruments Routes
router.get("/instruments/:instrumentId", getASpecificInstrument)

//Points Routes
router.get("/points/:instrumentId",getInstrumentPoints)

router.get("/calcs/:pointId",getASpecificCoordinateWithCalcs)
export default router