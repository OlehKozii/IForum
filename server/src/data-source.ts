import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./entities/userModel";
import dotenv from "dotenv"
dotenv.config({path:__dirname+'/../.env'})

export const AppDataSource = new DataSource({
    type:"mariadb",
    url: process.env.TYPEORM_URL,
    synchronize: true,
    logging: false,
    entities: [User],
    // migrationsRun: false
    // migrations: [],
    // subscribers: [],
})

export const DBconnect = async ()=>{
    await AppDataSource.initialize()
}

