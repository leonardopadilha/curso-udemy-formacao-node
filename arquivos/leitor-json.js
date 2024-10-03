const fs = require('fs')
fs.readFile('./usuario.json', { encoding: 'utf-8' }, (erro, dados) => {
    if (erro) {
        console.log('Ocorreu uma falha durante a leitura do arquivo!')
    }else {
        let conteudo = JSON.parse(dados) // Texto para objeto javascript(JSON)
        conteudo.nome = "Novo usuário II"
        console.log(conteudo)

        fs.writeFile('./usuario.json', JSON.stringify(conteudo), (erro) => { // Objeto javascript para texto
            if (erro) {
                console.log('Ocorreu uma falha durante a escrita do arquivo!')
            }
        }) 
    }
})