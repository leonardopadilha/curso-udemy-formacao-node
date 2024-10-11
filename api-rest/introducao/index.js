const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false} ))
app.use(bodyParser.json())

const DB = {
    games: [
        { id: 23, title: "Call of duty MW", year: 2019, price: 60 },
        { id: 65, title: "Sea of thieves", year: 2018, price: 40 },
        { id: 2, title: "Minecraft", year: 2012, price: 20 }
    ]
}

app.get('/games', (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get('/games/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)        
    }else {
        const id = parseInt(req.params.id);
        const game = DB.games.find(game => game.id === id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game)
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

app.listen(45678, () => {
    console.log('API RODANDO!!!')
})