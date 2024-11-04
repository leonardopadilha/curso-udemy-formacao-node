const User = require("../models/User")

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
}

module.exports = new UsersController()