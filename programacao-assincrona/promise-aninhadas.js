function pegarId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 1500)
    })
}

function buscarEmailNoBanco(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("teste@teste.com")
        }, 2000)
    })
}


function enviarEmail(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let deuErro = false
            if (!deuErro) {
                resolve({ time: 6, to: para }) // Promessa ok
            } else {
                reject("Fila cheia!") // Foi mal, eu falhei :(
            }
        }, 4000)
    })
}

pegarId().then((id) => {
    buscarEmailNoBanco(id).then((email) => {
        enviarEmail("Olá, como vai?", "teste@teste.com").then(() => {
            console.log(`Email enviado para o usuário ${id}`)
        }).catch(err => {
            console.log(err)
        })
    })
})