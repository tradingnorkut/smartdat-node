import express from "express"
import { config } from "dotenv"
import cors from "cors"
import router from "./routes"
import log from "./logger"
import connect from "./db"

config()

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use( cors() )

app.use("/api", router)

app.listen(process.env.PORT, () =>{
    log.info(`App listening on port ${ process.env.PORT }`)
    connect()
})
