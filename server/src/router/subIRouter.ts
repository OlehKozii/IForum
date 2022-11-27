import Router, {Express} from "express"

const router:Express = Router()

router.post("/createSubI")
router.delete("/deleteSubI/:id")
router.get("/getOneSubI/:id")
router.get("/allSubI")
router.patch("/editSubI")
router.patch("/addModerator")
router.patch("/removeModerator")

module.exports = router