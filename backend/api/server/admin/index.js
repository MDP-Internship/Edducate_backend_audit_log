import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { encrypText } from "../../server/src/config/settings"
import Helpers from "../utils/helpers"
import adminRoutes from "../admin/routes/AdminRoute"

const app = express()

app.use((req, res, next) => {
  const token = req.headers.authorization
  jwt.verify(token, encrypText, async (err, decoded) => {
    console.log(decoded)
    if (!decoded || err) {
      res.json({ type: false, message: "Your access is denied" })
    }
    console.log(decoded)
    const isAdmin = await Helpers.isAdmin(decoded.roleId)
    const isRemoved = await Helpers.userIsRemoved(decoded.id)

    if (isRemoved === 1) {
      res.json({ type: false, message: "Your account is not active" })
    }

    if (isAdmin === 0) {
      res.json({ type: false, message: "Permission denied" })
    }

    next()
  })
})

app.use(adminRoutes)

export default app
