const HtmlParser = require("./htmlParser");
const PDFWriter = require("./PDFWriter");
const Processor = require("./Processor");
const Reader = require("./Reader");
const Table = require("./Table");
const Writer = require("./writer");

let leitor = new Reader()
let escritor = new Writer()

;(async () => {
    let dados = await leitor.read("./04-usuarios.csv")
    let dadosProcessados = Processor.process(dados)
    let usuarios = new Table(dadosProcessados)

    let html = await HtmlParser.parse(usuarios)
    await escritor.write(`${Date.now()}.html`, html)
    PDFWriter.writePDF(`${Date.now()}.pdf`, html)


})()

/*
Bibliotecas
ejs
html-pdf
*/

/*
async function main() {
    let dados = await leitor.read("./04-usuarios.csv")
    console.log(dados)
}
main()
*/