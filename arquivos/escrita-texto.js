const fs = require('fs')

const texto = 'O versículo 32 do capítulo 8 do Evangelho de João diz: "E conhecereis a verdade, e a verdade vos libertará"'

fs.writeFile('./texto.txt', texto, (erro) => {
    if (erro) {
        console.log("Erro durante a escrita")
    }
})