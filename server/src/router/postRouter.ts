import Router, {Express} from "express"

const router:Express = Router()

router.post("/createPost")
router.delete("/deletePost")
router.get("/getOnePost/:id")
router.get("/getAllPosts")
router.patch("/editSubI")
router.patch("/addModerator")
router.patch("/removeModerator")

module.exports = router