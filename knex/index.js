const database = require('./database')

/* const dados = {
  nome: 'Call of duty',
  preco: 60.00
}; */

// Insert
/* const dados = [
  {
    nome: 'GTA',
    preco: 22.22
  },
  {
    nome: 'wOW',
    preco: 120.22
  },
]

database.insert(dados).into("games").then(data => {
  console.log(dados)
}).catch(err => {
  console.log(err)
}) */

/*  SELECT
 database.select(["id", "preco"]).table("games").then(data => {
    console.log(data)
  }).catch(err => {
    console.log(err)
  }) */

/* NESTED QUERIES 
database.insert({nome: "Mists of noyah", preco: 25.55}).into("games").then(data => {
  database.select().table("games").then(retorno => {
    console.log(retorno)
  }).catch(erroRetorno => {
    console.log(erroRetorno)
  })
}).catch(erroInsert => {
  console.log(erroInsert)
}) */

/* select com e sem where 
const result = database.select(["id", "preco"])
                        .where({nome : "Call of duty"})
                        .where({id: 2}) // AND
                        .orWhere({preco: 60})
                        .table("games")

console.log(result.toQuery())

const resultQueryRaw = database.select(["id", "preco"])
                        .whereRaw("preco >= 60" )
                        .table("games")

console.log(resultQueryRaw.toQuery())

const resultQueryRaw2 = database.select(["id", "preco"])
                        .whereRaw("nome = 'Call of duty' OR preco = 60" ) // OR
                        .table("games")

console.log(resultQueryRaw2.toQuery())

database.select().whereRaw("preco >= 60" ).table("games").then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})
 */

/* RAW -> Query crua
database.raw("SELECT * FROM games").then(data => {
  console.log(data[0])
}).catch(err => {
  console.log(err)
}) */

/* Delete 
database.where({ id: 2 }).delete().table("games").then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
}) */

/* Update 
database.where({ id: 3 }).update({ preco: 130.55}).table("games").then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
}) */


/* order by 
database.select().table("games").orderBy("preco", "desc").then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
}) */


/* INserção associada 
database.insert({
  nome: 'Blizzard',
  game_id: 4
}).table("estudios").then(dados => {
  console.log(dados)
}).catch(err => {
  console.log(err)
}) */


/* Join sem where 
database.select(["games.id", "games.nome as game", "estudios.nome as estudio", "games.preco"]).table("games").innerJoin("estudios", "estudios.game_id", "games.id").then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
}) 

database.select(["games.*", "estudios.nome as estudio"]).table("games").innerJoin("estudios", "estudios.game_id", "games.id").then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
}) */


/* Join 1 para 1 com where   
database.select(["games.*", "estudios.nome as estudio"])
              .table("games")
              .innerJoin("estudios", "estudios.game_id", "games.id")
              .whereRaw("games.id > 2")
              .then(data => {console.log(data) })
                .catch(err => { console.log(err) })


database.select(["games.*", "estudios.nome as estudio"])
          .table("games")
          .innerJoin("estudios", "estudios.game_id", "games.id")
          .where("games.id", 4)
          .then(data => {console.log(data) })
            .catch(err => { console.log(err) })  */


/* Join 1 para N 
database.select(["games.id", "games.nome AS game", "estudios.nome AS estudio_nome", "games.preco"]).table("games").innerJoin("estudios", "estudios.game_id", "games.id").then(data => {
  let game = {
    id: 0,
    nome: '',
    estudios: []
  }

  game.id = data[0].id
  game.nome = data[0].game

  data.forEach(estudio => {
    game.estudios.push({ nome: estudio.estudio_nome })
  })
  console.log(game)

}).catch(err => {
  console.log(err)
})  */

/* Relacionamento N para N 
database.select([
          "games.id AS id_game",
          "estudios.id AS id_estudio",
          "estudios.nome AS estudio_nome",
          "games.nome AS game_nome",
          "games.preco AS game_preco"
])
          .table("games_estudios")
          .innerJoin("games", "games.id", "games_estudios.game_id")
          .innerJoin("estudios", "estudios.id", "games_estudios.estudio_id")
          .where("games_estudios.game_id", 3)
          .then(data => { console.log(data) })
            .catch(err => { console.log(err) }) */

/* Transação 
async function testeTransacao() {
  try {
    await database.transaction(async t => {
      await database.insert({ nome: "Qualquer nome"}).table("estudios")
      await database.insert({ nome: "Pyxerelia"}).table("estudios")
      await database.insert({ nome: "Mojang"}).table("estudios")
      await database.insert({ nome: "Gearbox"}).table("estudios")
    })
  }catch(err) {
    console.log(err)
  }
}

testeTransacao()

async function testeTransacao() {
  try {
    await database.transaction(async t => {
      await t.insert({ nome: "Qualquer nome II"}).table("estudios")
    })
  }catch(err) {
    console.log(err)
  }
}

testeTransacao()
*/



                