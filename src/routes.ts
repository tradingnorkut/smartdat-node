import { Router } from "express"
import { getASpecificInstrument } from "./controllers/instrument.controller"
import { getAllQueries } from "./controllers/query.controller"

const router = Router()

router.get("/queries",getAllQueries)
router.get("/instruments/:instrumentId", getASpecificInstrument)

export default router