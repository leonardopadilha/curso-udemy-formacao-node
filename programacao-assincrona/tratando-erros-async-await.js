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
        }, 2000);
    })
}

function enviarEmail(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var deuErro = false
            if(!deuErro) {
                resolve({ time: 6, to: para }) // Promise ok
            }else {
                reject("Fila cheia") // Foi mal, eu falhei :(
            }
        }, 4000)
    })
}

function pegarUsuarios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { name: "Teste 1", lang: "JS" },
                { name: "Teste 2", lang: "C#" },
                { name: "Teste 3", lang: "Java" },
            ])
        }, 3000)
    })
}

async function principal() {
    var id = await pegarId()
    var email = await buscarEmailNoBanco(id)

    try {
        await enviarEmail("Olá, tudo bem?", email)
        console.log("Email enviado com sucesso")
    } catch(erro) {
        console.log("Erro ao enviar email: ", erro)
    }
}

principal()