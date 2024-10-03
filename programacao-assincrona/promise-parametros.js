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

enviarEmail("Olá mundo!", "teste@teste.com.br").then((dados) => {
    console.log(`Informações de envio: 
        time: ${dados.time}s,
        para: ${dados.to}
    `)

}).catch((erro) => {
    console.log(`Ocorreu o seguinte erro: ${erro}`)
})

// utilizando o destruction
enviarEmail("Olá mundo!", "teste@teste.com.br").then(({time, to}) => {
    console.log(`Informações de envio: 
        time: ${time}s,
        para: ${to}
    `)

}).catch((erro) => {
    console.log(`Ocorreu o seguinte erro: ${erro}`)
})


/*
As promises só aceitam um parâmetro ou um json de parâmetros no reject ou resolve 
*/