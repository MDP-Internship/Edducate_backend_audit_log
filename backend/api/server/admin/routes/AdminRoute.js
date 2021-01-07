import { Router } from "express"
import AdminController from "../controller/AdminController"

const router = Router()

router.put("/delete/:id", AdminController.deleteUser)
router.put("/update/:id", AdminController.updateUserInfo)

export default router
