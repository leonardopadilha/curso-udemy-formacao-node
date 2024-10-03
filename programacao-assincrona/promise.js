function enviarEmail(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let deuErro = true
            if (!deuErro) {
                resolve() // Promessa ok
            } else {
                reject() // Foi mal, eu falhei :(
            }
        }, 4000)
    })
}

enviarEmail("Olá mundo!", "teste@teste.com.br").then(() => {
    console.log("Email enviado com sucesso!")
}).catch(() => {
    console.log("Desculpe mas aconteceu um erro!")
})