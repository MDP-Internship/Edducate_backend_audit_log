import db from "../src/models/"

class Helpers {
  static async isHaveUser(email) {
    try {
      const user = await db.User.findOne({ where: { email } })
      if (!user) {
        return false
      }
      return true
    } catch (err) {
      throw err
    }
  }

  static async isAdmin(id) {
    try {
      const user = await db.User.findOne({ where: { id } })
      if (user) {
        return await db.User.findOne({
          where: { id: user.roleId },
        })
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async userIsRemoved(id) {
    try {
      const user = await db.User.findOne({ where: { id } })
      return user.isRemoved
    } catch (error) {
      throw error
    }
  }
}

export default Helpers
