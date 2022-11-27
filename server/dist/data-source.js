"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnect = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const userModel_1 = require("./entities/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/../.env' });
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mariadb",
    url: process.env.TYPEORM_URL,
    synchronize: true,
    logging: false,
    entities: [userModel_1.User],
    // migrationsRun: false
    // migrations: [],
    // subscribers: [],
});
const DBconnect = async () => {
    await exports.AppDataSource.initialize();
    // await createConnection({
    //     type:"mariadb",
    //     url: process.env.TYPEORM_URL,
    //     synchronize: true,
    //     logging: false,
    //     entities: [User],
    //     // migrationsRun: false
    //     // migrations: [],
    //     // subscribers: [],
    // })
};
exports.DBconnect = DBconnect;
