const knex = require('../database/connection')
const User = require('./User')

class PasswordToken {
  async createToken(email) {
    const user = await User.findEmail(email)

    if (user != undefined) {
      try {
        await knex.insert({
          user_id: user.id,
          used: 0,
          token: Date.now() // Sugestão: UUID
        }).table('passwordToken')

        return { status: true }

      } catch (error) {
        console.log(error)
        return { status: false, err: error}
      }

    }else {
      return { status: false, err: 'E-mail não encontrado' }
    }
  }

  async validate(token) {
    try {
      const result = await knex.select().where({ token: token }).table('passwordToken')

      if (result.length > 0) {
        const tk = result[0]

        if (tk.used) {
          return { status: false }
        }else {
          return { status: true, token: tk }
        }

      }else {
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      return { status: false }
    }
  }
}

module.exports = new PasswordToken()