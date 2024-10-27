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


database.select().table("games").orderBy("preco", "desc").then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})