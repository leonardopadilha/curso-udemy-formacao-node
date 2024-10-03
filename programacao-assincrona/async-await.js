function pegarUsuario() {
    return new Promise((resolve, reject) => {
        resolve([
            { name: "victor", lang: "JS" },
            { name: "Lima", lang: "C#" },
            { name: "Daniel", lang: "Java" },
        ])
    })
}

async function principal() {
    var usuarios = await pegarUsuario()
    console.log(usuarios)
}
principal()