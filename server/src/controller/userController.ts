import {NextFunction, Response} from "express";
import {User} from "../entities/userModel";
import {AppDataSource} from "../data-source";
import {CustomError as err}  from "../middleware/errorHandler";
import * as dto from "./dto/index"
import pwdActions from "../utils/passwordHashing";
import {signUpDto} from "./dto/index";
import jwtActions from "../utils/jwt"
import logger from "../utils/logger";

class userController{
    async signUp(req:any, res:Response, next:NextFunction){
        try{
            const {nickname, password, email} = req.body
            if(!nickname || !password || !email){
                return next(err.badRequest("[Server] No data entered"))
            }
            const candidate = await AppDataSource
                .createQueryBuilder()
                .select(["nickname", "email"])
                .from(User, "user")
                .where([{nickname},{email}])
                .getRawOne()
            if(candidate){
                return next(err.badRequest("[Server] Such user exists"))
            }
            const hash = await pwdActions.hashPwd(password)
            const user = await AppDataSource.manager.save(
                User,
                {
                    nickname:nickname,
                    password:hash,
                    email:email
                }
            )
            const tokens = jwtActions.createBothToken(user)
            logger.info(`${JSON.stringify(tokens)}`)
            // console.log("[Server] I have sent to database some data " + JSON.stringify(user))
            return res.json({"refresh_token":tokens.refresh, "access_token":tokens.access})
        }catch (e) {
            console.log(e)
        }

    }

    async signIn(req:any,res:Response, next:NextFunction){
        try{
            const {email, nickname, password} = req.body
            if((!email && !nickname) || !password){
                return next(err.badRequest("[Server] No data entered"))
            }
            const candidate = await AppDataSource
                .createQueryBuilder()
                .select()
                .from(User, "user")
                .where([{
                    email:email
                },{
                    nickname:nickname
                }])
                .getRawOne()
            if(!candidate){
                return next(err.notFound("[Server] User doesn\'t exist"))
            }
            const verify = await pwdActions.verifyPwd(password, candidate.password,)
            if(!verify){
                return next(err.unauthorized("[Server] Wrong password"))
            }
            return res.json(candidate)
        }catch (e) {

        }
    }

    async getAll(req:any,res:Response, next:NextFunction){

        const users = await AppDataSource
            .createQueryBuilder()
            .from(User, "user")
            .select(["id as id", "email","nickname"])
            .getRawMany()

        users.map((i:any)=>{
            console.log(i.email)
        })
        return res.json(users)

    }

    async banUser(req:any, res:Response, next:NextFunction){
        const {email, banReason} = req.body
        if(!banReason || !email){
            return false
        }
        const user = await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set({
                 ban:{
                     baned:true,
                     banReason:banReason
                 }
                })
            .where({email:email})
            .execute()
        return res.json(JSON.parse(JSON.stringify(user)))
    }

    async unbanUser(req:any, res:Response, next:NextFunction){
        const {email} = req.body
        const user = await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set({
                ban:null
            })
            .where({email:email})
            .execute()
        return res.json(user)
    }

}

export default new userController()