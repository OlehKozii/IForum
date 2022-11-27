"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../entities/userModel");
const data_source_1 = require("../data-source");
const errorHandler_1 = require("../middleware/errorHandler");
const passwordHashing_1 = __importDefault(require("../utils/passwordHashing"));
class userController {
    async signUp(req, res, next) {
        try {
            const { nickname, password, email } = req.body;
            if (!nickname || !password || !email) {
                return next(errorHandler_1.CustomError.badRequest("Where is data, suka?"));
            }
            const candidate = await data_source_1.AppDataSource
                .createQueryBuilder()
                .select()
                .from(userModel_1.User, "user")
                .where([{ nickname }, { email }])
                .getRawOne();
            if (candidate) {
                return next(errorHandler_1.CustomError.badRequest("Want naebaty me? Such user exists"));
            }
            const hash = await passwordHashing_1.default.hashPwd(password);
            const user = await data_source_1.AppDataSource.manager.save(userModel_1.User, {
                nickname: nickname,
                password: hash,
                email: email
            });
            console.log("[Server] I have sent to database some data " + JSON.stringify(user));
            return res.json(user);
        }
        catch (e) {
            console.log(e);
        }
    }
    async signIn(req, res, next) {
        try {
            const { email, nickname, password } = req.body;
            if ((!email && !nickname) || !password) {
                return next(errorHandler_1.CustomError.badRequest("No data entered"));
            }
            const candidate = await data_source_1.AppDataSource
                .createQueryBuilder()
                .select()
                .from(userModel_1.User, "user")
                .where([{
                    email: email
                }, {
                    nickname: nickname
                }])
                .getRawOne();
            if (!candidate) {
                return next(errorHandler_1.CustomError.notFound("No such user. Idy nahuy!"));
            }
            const verify = await passwordHashing_1.default.verifyPwd(password, candidate.password);
            if (!verify) {
                return next(errorHandler_1.CustomError.unauthorized("Wrong password"));
            }
            return res.json(candidate);
        }
        catch (e) {
        }
    }
    async getAll(req, res, next) {
        const users = await data_source_1.AppDataSource
            .createQueryBuilder()
            .from(userModel_1.User, "user")
            .select(["id as id", "email", "nickname"])
            .getRawMany();
        users.map((i) => {
            console.log(i.email);
        });
        return res.json(users);
    }
    async banUser(req, res, next) {
        const { email, banReason } = req.body;
        if (!banReason || !email) {
            return false;
        }
        const user = await data_source_1.AppDataSource
            .createQueryBuilder()
            .update(userModel_1.User)
            .set({
            ban: {
                baned: true,
                banReason: banReason
            }
        })
            .where({ email: email })
            .execute();
        return res.json(JSON.parse(JSON.stringify(user)));
    }
    async unbanUser(req, res, next) {
        const { email } = req.body;
        const user = await data_source_1.AppDataSource
            .createQueryBuilder()
            .update(userModel_1.User)
            .set({
            ban: null
        })
            .where({ email: email })
            .execute();
        return res.json(user);
    }
}
exports.default = new userController();
