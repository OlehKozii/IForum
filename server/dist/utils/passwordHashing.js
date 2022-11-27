"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
class pwdActions {
    async hashPwd(Pwd) {
        try {
            const hash = await argon2_1.default.hash(Pwd, { type: argon2_1.default.argon2d });
            return hash;
        }
        catch (e) {
            console.log(e);
        }
    }
    async verifyPwd(candPwd, hashPwd) {
        try {
            const verify = await argon2_1.default.verify(hashPwd, candPwd, { type: argon2_1.default.argon2d });
            return verify;
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = new pwdActions();
