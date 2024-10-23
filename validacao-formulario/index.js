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
  res.render("index")
})

app.post('/form', (req, res) => {
  const { email, nome, pontos } = req.body

  let emailError;
  let pontosError;
  let nomeError;

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
    res.redirect("/")
  }else {
    res.send("SHOW DE BOLA ESSE FORM!")
  }


  
  res.send(email)
})

app.listen(5678, (req, res) => {
  console.log('Servidor rodando!')
})