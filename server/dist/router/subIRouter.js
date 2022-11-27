"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.post("/createSubI");
router.delete("/deleteSubI/:id");
router.get("/getOneSubI/:id");
router.get("/allSubI");
router.patch("/editSubI");
router.patch("/addModerator");
router.patch("/removeModerator");
module.exports = router;
