import Router, {Express} from "express"
import UserController from "../controller/userController";

export const UserRouter:Express = Router()

UserRouter.post("/signup", UserController.signUp)
UserRouter.post("/signin", UserController.signIn)
UserRouter.post("/ban", UserController.banUser)
UserRouter.post("/unban", UserController.unbanUser)
UserRouter.get("/getall", UserController.getAll)