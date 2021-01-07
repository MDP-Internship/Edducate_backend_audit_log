import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import amqp from 'amqplib'
import LoginService from "../services/UserService"
import Helpers from "../../utils/helpers"
import {connect_rabbitmq} from '../../utils/rabbitmq_consumer'
import { encrypText } from "../../src/config/settings"
import { registerValidate, loginValidate } from "../../utils/validate"

class UserController {
  static async register(req, res) {
    const {
      name,
      surname,
      email,
      password: cryptedPassword,
      roleId = "0",
      isRemoved = "0",
    } = req.body
    const reqFullBody = req.body
    const isHaveUser = await Helpers.isHaveUser(email)
    
    if (isHaveUser) {
      res.send({ type: false, message: "email adresi kullanımda" })

    }
      const isRegisterValidateResult = registerValidate(reqFullBody)

      if (isRegisterValidateResult.type) {
        const password = await bcrypt.hash(cryptedPassword, 10)

        

          
          const userRes = await LoginService.register(
            name,
            surname,
            email,
            password,
            roleId,
            isRemoved
          )
          await connect_rabbitmq('logChannel', JSON.stringify(reqFullBody));

          res.json({ type: true, data: userRes._previousDataValues })
        
      }
      res.json(isRegisterValidateResult.error)
    
    
  }

  static async login(req, res) {
    const { email, password } = req.body
    const reqFullBody = req.body
    const isLoginValidateResult = loginValidate(reqFullBody)
    console.log(isLoginValidateResult.type)
    if (isLoginValidateResult.type) {
      const userRes = await LoginService.login(email)

      if (!userRes) {
        return res.json({ status: "error", error: "user not found" })
      }
      if (await bcrypt.compare(password, userRes.password)) {
        const token = jwt.sign(
          {
            id: userRes.id,
            name: userRes.name,
            email: userRes.email,
            roleId: userRes.roleId,
            isRemoved: userRes.isRemoved,
          },
          encrypText,
          { expiresIn: 1000 }
        )
        console.log(token)
        return res.json({ type: true, token: token })
      }
      res.json({ error: "e-mail and password incorrect" })
    }
    res.json(isLoginValidateResult.error)
  }

  static async userGetAll(req, res) {
    const getAllResult = await LoginService.getAll()
    const data = getAllResult.map((i) => {
      return {
        id: i.id,
        name: i.name,
        surname: i.surname,
        email: i.email,
        roleId: i.roleId,
      }
    })
    res.json(data)
  }
}

export default UserController
