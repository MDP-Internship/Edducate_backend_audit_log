import jwt from "jsonwebtoken"
import express from "express"
import bcrypt from "bcrypt"
import { encrypText } from "../src/config/settings"
import Helpers from "../utils/Util"
import Util from "../utils/Util"

const app = express()
const util = new Util()

app.use(async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    util.send(401, "Token cannot empty")
    return util.send(res)
  }
  jwt.verify(token, encrypText, (err, decoded) => {
    if (err) {
      util.setError(401, "Token not found")
      return util.send(res)
    }
    util.setError(200, "Your access is succesfull")
    req.decoded = decoded
    next()
  })
})
module.exports = app
