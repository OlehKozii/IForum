"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
exports.UserRouter = (0, express_1.default)();
exports.UserRouter.post("/signup", userController_1.default.signUp);
exports.UserRouter.post("/signin", userController_1.default.signIn);
exports.UserRouter.post("/ban", userController_1.default.banUser);
exports.UserRouter.post("/unban", userController_1.default.unbanUser);
exports.UserRouter.get("/getall", userController_1.default.getAll);
