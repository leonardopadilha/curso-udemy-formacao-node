const PasswordToken = require("../models/PasswordToken")
const User = require("../models/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = 'fasdlkçjfak16546fasd565556afds875fasx'

class UsersController {
  
  async index(req, res) {
    const users = await User.findAll()
    res.json(users)
  }

  async userById(req, res) {
    const id = req.params.id
    const user = await User.findById(id)

    if (user == undefined) {
      res.status(404)
      res.json({})
    }else {
      res.status(200)
      res.json(user)
    }
  }

  async create(req, res) {
    const { name, email, password } = req.body;

    if (name == undefined || email == undefined || password == undefined) {
      res.status(400)
      res.json({ message: 'Os campos: Name, email e password são obrigatórios' })
      return;
    }
    const emailExists = await User.findEmail(email)

    if (emailExists) {
      res.status(406)
      res.json({ err: "O e-mail já está cadastrado!" })
      return;
    }

    await User.createUser(name, email, password)
    res.status(200)
    res.send("Tudo OK!")
  }

  async edit(req, res) {
    const { id, name, role, email } = req.body
    const result = await User.update(id, email, name, role)
    if (result != undefined) {
      if (result.status) {
        res.status(200)
        res.send("Tudo OK!")
      }else {
        res.status(406)
        res.send(result.err)
      }
    }else {
      res.status(406)
      res.send("Ocorreu um erro no servidor!")
    }
  }

  async remove(req, res) {
    const id = req.params.id
    const result = await User.delete(id)

    if (result.status) {
      res.status(200)
      res.send("Tudo OK!")
    }else {
      res.status(406)
      res.send(result.err)
    }
  }

  async recoverPassword(req, res) {
    const email = req.body.email

    const result = await PasswordToken.createToken(email)

    if (result.status) {
      res.status(200)
      res.send(result.token)
    }else {
      res.status(406)
      res.send(result.err)
    }
  }

  async changePassword(req, res) {
    const { token, password } = req.body

    const isTokenValid = await PasswordToken.validate(token)

    if (isTokenValid.status) {
      await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
      res.status(200)
      res.send('Senha alterada com sucesso')
    }else {
      res.status(406)
      res.send('Token inválido!')
    }
  }

  async login(req, res) {
    const { email, password } = req.body

    const user = await User.findEmail(email)
    if (user != undefined) {
      const resultado = await bcrypt.compare(password, user.password)

      if (resultado) {
        const token = jwt.sign({ email: user.email, role: user.role }, secret)
        res.status(200)
        res.json({ token: token })
      }
    }else {
      res.status(406)
      res.send("Senha incorreta")
    }
  }
}

module.exports = new UsersController()