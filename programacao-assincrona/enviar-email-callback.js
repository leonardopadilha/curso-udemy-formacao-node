function enviarEmail(corpo, para, callback) {
    setTimeout(() => {
        console.log(`
            Para: ${para}
            -----------------------
            ${corpo}
            -----------------------
            De: JavaScript
        `)
    callback()
    }, 8000)
}

console.log("Início do envio de e-mail")
enviarEmail("Oi, bem vindo a programação assíncrona", "teste@teste.com", () => {
    console.log("Seu e-mail foi enviado, deve chegar em minutos")
    console.log("TUDO OK!")
})
