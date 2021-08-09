import mongoose from "mongoose"
import log from "../logger"

export default async function connect(){
    try {
        
        await mongoose.connect( process.env.DB_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        log.info('Database connected')


    } catch (error) {
        log.error('Database connection error')
        process.exit(1)
    }
}