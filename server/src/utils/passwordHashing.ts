import argon2 from "argon2"

class pwdActions {
    async hashPwd(Pwd: string) {
        try{
            const hash = await argon2.hash(Pwd, {type: argon2.argon2d})
            return hash
        }catch (e) {
            console.log(e)
        }
    }

    async verifyPwd(candPwd: string, hashPwd: string) {
        try{
            const verify = await argon2.verify(hashPwd, candPwd, {type: argon2.argon2d})
            return verify
        }catch (e) {
            console.log(e)
        }
    }
}

export default new pwdActions()