import Router, {IRouter} from "express"
import {UserRouter} from "./userRouter";
export const router = Router()

router.use("/user",UserRouter)
// router.use("/sub",subRouter)