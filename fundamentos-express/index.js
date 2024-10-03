const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World my friend!')
})

app.get('/ola/:nome/:empresa', (req, res) => {
    const { nome, empresa } = req.params
    res.send(`Olá ${nome}, você trabalha na empresa ${empresa}?`)
})

app.get('/profissao/:area?', (req, res) => {
    const area = req.query.params
    console.log("área::::" + JSON.stringify(area))
    if (area) {
        res.send(`Você é um profissional da área ${area}?`)
    } else {
        res.send(`Você é um profissional?`)
    }
})

app.get('/:empresa/:blog?', (req, res) => { // último parâmetro opcional
    const { empresa, blog } = req.params
    if (blog) {
        res.send(`A empresa ${empresa} quer realizar qual alteração no blog ${blog}?`) 
    } else {
        res.send(`A empresa ${empresa} deseja criar um blog?`)
    }
})

app.listen(4000, function(erro) {
    if (erro) {
        console.log('Erro ao iniciar o servidor')
    } else {
        console.log('Servidor iniciado com sucesso!')
    }
})