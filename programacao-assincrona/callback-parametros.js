function enviarEmail(corpo, para, callback) {
    setTimeout(() => {
        console.log(`
            Para: ${para}
            -----------------------
            ${corpo}
            -----------------------
            De: JavaScript
        `)
    callback("OK", 5, "8s")
    }, 8000)
}

console.log("Início do envio de e-mail")
enviarEmail("Oi, bem vindo a programação assíncrona", "teste@teste.com", (status, amount, time) => {
    console.log(`
        Status: ${status}
        ------------------
        Contatos: ${amount}
        ------------------
        Tempo de envio: ${time}    
    `)
    console.log("TUDO OK!")
})
