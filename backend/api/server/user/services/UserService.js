import db from "../../src/models"

class LoginService {
  static async register(name, surname, email, password, roleId, isRemoved) {
    try {
      return await db.User.create({
        name,
        surname,
        password,
        email,
        roleId,
        isRemoved,
      })
    } catch (err) {
      throw err
    }
  }
  static async login(email) {
    try {
      const findUser = await db.User.findOne({ where: { email } })
      return findUser
    } catch (err) {
      throw err
    }
  }

  static async getAll() {
    const userGet = db.User.findAll()
    return userGet
  }
}
export default LoginService
