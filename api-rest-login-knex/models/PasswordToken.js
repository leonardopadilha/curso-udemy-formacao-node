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

}

module.exports = new PasswordToken()