import db from "../../src/models"

class AdminService {
  static async updateUser(id, name, surname, email, roleId) {
    try {
      const userUpdate = await db.User.update(
        { name, surname, email, roleId },
        { where: { id } }
      )

      return userUpdate
    } catch (error) {
      throw error
    }
  }
  static async deleteUser(id) {
    try {
      const user = await db.User.findOne({ where: { id } })

      if (user) {
        return await db.User.update(
          { isRemoved: 1 },
          { where: { id: user.id } }
        )
      }
      return 0
    } catch (err) {
      throw err
    }
  }
}
export default AdminService
