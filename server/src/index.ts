import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { DBconnect} from "./data-source";
import {router} from "./router/router";
import {ErrorMiddleware} from "./middleware/errorHandler";
import logger from "./utils/logger";

dotenv.config({path:__dirname+'/../.env'})

const app = express()
const port:number=Number(process.env.PORT) || 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/",router)
app.use(ErrorMiddleware)

const start = async()=>{
    try{
        await DBconnect()
            .then(()=>{
                app.listen(port, ()=>{
                    logger.info(`Hello, i'm running on port ${port}`)
                    logger.info(`http://localhost:${port}`)
                })
            })
            .catch(e=>{
                throw e
            })
    }catch (e) {
        logger.error(`${e}`)
    }


}
start().then().catch()
