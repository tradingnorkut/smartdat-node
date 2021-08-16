import express from "express"
import { config } from "dotenv"
import cors from "cors"
import router from "./routes"
import log from "./logger"
import connect from "./db"
import custom404Handler from "./utils/customErrorsPages"

config()

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use( cors() )

app.use("/api", router)

custom404Handler(app)

app.listen(process.env.PORT, () =>{
    log.info(`App listening on port ${ process.env.PORT }`)
    connect()
})
