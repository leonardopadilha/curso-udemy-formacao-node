const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors')
const jwt = require("jsonwebtoken")

const JWTSECRET = "KJFÇAKSLHFÇAHSKjlkjfksdjf2897423547"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false} ))
app.use(bodyParser.json())

function auth(req, res, next) {
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearer = authToken.split(' ')
        const token = bearer[1]
        
        jwt.verify(token, JWTSECRET, (err, data) => {
            if (err) {
                res.status(401)
                res.json({ err: "Token inválido!" })
            }else {
                req.token = token
                req.loggedUser = { id: data.id, email: data.email }
                next()
            }
        })

    }else {
        res.status(401)
        res.json({ err: "Token inválido!" })
    }
}

const DB = {
    games: [
        { id: 23, title: "Call of duty MW", year: 2019, price: 60 },
        { id: 65, title: "Sea of thieves", year: 2018, price: 40 },
        { id: 2, title: "Minecraft", year: 2012, price: 20 }
    ],
    users: [
        { id: 1, name: "John", email: "john@example.com", password: "node123" },
        { id: 2, name: "Maria", email: "maria@example.com", password: "java123"}
    ]
}

app.get('/games', auth, (req, res) => {
    const HATEOAS = [
        {
            href: "http://localhost:45679/games/0",
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:45679/games/0",
            method: "GET",
            rel: "get_games"
        },
        {
            href: "http://localhost:45679/auth",
            method: "POST",
            rel: "login"
        }
    ]

    res.statusCode = 200;
    res.json({ user: req.loggedUser, game: DB.games, _links: HATEOAS });
});

app.get('/games/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)        
    }else {
        const id = parseInt(req.params.id);

        const HATEOAS = [
            {
                href: `http://localhost:45679/games/${id}`,
                method: "DELETE",
                rel: "delete_game"
            },
            {
                href: `http://localhost:45679/games/${id}`,
                method: "PUT",
                rel: "edit_game"
            },
            {
                href: `http://localhost:45679/games/${id}`,
                method: "GET",
                rel: "get_game"
            },
            {
                href: "http://localhost:45679/games/0",
                method: "GET",
                rel: "get_games"
            }
        ]

        const game = DB.games.find(game => game.id === id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json({ game, _links: HATEOAS})
        }else {
            res.sendStatus(404);
        }
    }
})

app.post('/games', (req, res) => {
    const { title, price, year } = req.body

    DB.games.push({
        id: 2323,
        title: title,
        year: year,
        price: price
    })

    res.statusCode = 201;
    res.json(DB.games)
})

app.delete('/games/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)        
    }else {
        const id = parseInt(req.params.id);
        const game = DB.games.findIndex(game => game.id === id);

        if (game == -1) {
            res.sendStatus(404);
        }else {
            DB.games.splice(game, 1);
            res.sendStatus(200)
        }
    }
})

app.put('/games/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)        
    }else {
        const id = parseInt(req.params.id);
        const game = DB.games.find(game => game.id === id);

        if (game != undefined) {
            const { title, price, year } = req.body

            if (title != undefined) game.title = title
            if (price != undefined) game.price = price
            if (year != undefined) game.year = year
        res.sendStatus(200)

        }else {
            res.sendStatus(404);
        }
    }
})

app.post("/auth", (req, res) => {
    const { email, password } = req.body

    if (email != undefined) {
        const user = DB.users.find(u => u.email == email)

        if (user != undefined) {
            if (user.password == password) {

                jwt.sign({id: user.id, email: user.email}, JWTSECRET, { expiresIn: '1h'}, (err, token) => {
                    if(err) {
                        res.status(400)
                        res.json({ err: "Falha interna" })
                    }else {
                        res.status(200)
                        res.json({ email, token })
                    }
                })
            }else {
                res.status(401)
                res.json({ message: "Credenciais inválidas!" })
            }
        }else {
            res.status(404)
            res.json({ err: "O e-mail enviado não existe na base de dados!" })
        }

    }else {
        res.status(400)
        res.json({ err: "O e-mail enviado é inválido" })
    }
})

app.listen(45678, () => {
    console.log('API RODANDO!!!')
})