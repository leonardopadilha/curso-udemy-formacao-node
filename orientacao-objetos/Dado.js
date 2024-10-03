class Dado {
    constructor(faces) {
        this.faces = faces
    }

    rolar() {
        console.log("Resultado::: " + this.getRandomIntInclusive(1, this.faces))
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
        //return Math.floor(Math.random() * this.faces)
    }
}

let d6 = new Dado(6)
let d12 = new Dado(12)
let d100 = new Dado(100)

d6.rolar()
d12.rolar()
d100.rolar()