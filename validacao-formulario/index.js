const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')

// parse applications/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser("faldkflkj"))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash())

app.get('/', (req, res) => {
  var emailError = req.flash("emailError")
  var pontosError = req.flash("pontosError")
  var nomeError = req.flash("nomeError")
  var email = req.flash("email")

  emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
  email = (email == undefined || email.length == 0) ? "" : email

  res.render("index", { emailError, pontosError, nomeError, email })
})

app.post('/form', (req, res) => {
  const { email, nome, pontos } = req.body

  var emailError;
  var pontosError;
  var nomeError;

  if (email == undefined || email == "") {
    emailError = "O campo e-mail é obrigatório"
  }

  if (pontos == undefined || pontos < 20) {
    pontosError = "O campo pontos é obrigatório e deve ser maior que 20"
  }

  if (nome == undefined || nome == "") {
    nomeError = "O campo nome é obrigatório"
  }

  if (nome.length < 3) {
    nomeError = "O campo nome deve ter mais de 2 caracteres"
  }

  if (emailError != undefined || pontosError != undefined || nomeError != undefined) {
    req.flash("emailError", emailError)
    req.flash("pontosError", pontosError)
    req.flash("nomeError", nomeError)

    req.flash("email", email)

    res.redirect("/")
  }else {
    res.send("SHOW DE BOLA ESSE FORM!")
  }

  res.send(email)
})

app.listen(5678, (req, res) => {
  console.log('Servidor rodando!')
})