function enviarEmail(corpo, para, callback) {
    setTimeout(() => {
        // .... Lógica

        var deuErro = true
        if (deuErro) {
            callback("O Envio do e-mail falhou")
        } else {
            callback()
        }
    }, 8000)
}

console.log("Início do envio de e-mail")
enviarEmail("Oi, bem vindo a programação assíncrona", "teste@teste.com", (erro) => {
    if (erro == undefined) { // OK
        console.log("E-mail enviado com sucesso")
    } else { // Opa, deu um erro!
        console.log("Erro ao enviar e-mail: ", erro)
    }

    console.log("FIM!")
})
