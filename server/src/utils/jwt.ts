import jwt from "jsonwebtoken"
import {AppDataSource} from "../data-source";
import {User} from "../entities/userModel";

interface IJWT{
    nickname:string
    email:string
    role:string
}

class jwtActions{
    createRefreshToken(user:IJWT){
        return jwt.sign(user,`${process.env.SECRET_REFRESH}`,{expiresIn:60*60*24*5})
    }

    createAccessToken(user:IJWT){
        return jwt.sign(user,`${process.env.SECRET_ACCESS}`,{expiresIn:60*60*2})
    }

    createBothToken(user:IJWT){
        const access = this.createAccessToken(user)
        const refresh = this.createRefreshToken(user)
        return {access, refresh}
    }

    verifyRefreshToken(refresh_token:string){
        return jwt.verify(refresh_token,`${process.env.SECRET_REFRESH}`)
    }
    verifyAccessToken(access_token:string){
        return jwt.verify(access_token,`${process.env.SECRET_ACCESS}`)
    }

    verifyBothToken(access_token:string, refresh_token:string){
        const access = this.verifyAccessToken(access_token)
        const refresh = this.verifyRefreshToken(refresh_token)
        return {access, refresh}
    }

    async saveRefreshToken(refresh_token:string, user:IJWT){
        await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set(refresh_token = refresh_token)
            .where({email: user.email})
            .execute()

    }
}

export default new jwtActions()