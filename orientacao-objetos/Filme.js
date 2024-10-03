class Filme {
    constructor() {
        this.titulo = '';
        this.ano = 0;
        this.genero = '';
        this.diretor = '';
        this.atores = [];
        this.duracao = 0;
    }

    reproduzir() {
        console.log("Play....")
    }

    pausar() {
        console.log("Pausar ||")
    }

    avancar() {
        console.log("Avançar >>")
    }

    fechar() {
        console.log("Fechar X")
    }
}

module.exports = new Filme()