
// Array que contém a referencia dos leds a serem "acesos" de acordo com o número inserido
const numerosDigitais = [
    { numero: 0, ids: [0,1,2,4,5,6]},
    { numero: 1, ids: [2,5]},
    { numero: 2, ids: [0,2,3,4,6]},
    { numero: 3, ids: [0,2,3,5,6]},
    { numero: 4, ids: [1,2,3,5]},
    { numero: 5, ids: [0,1,3,5,6]},
    { numero: 6, ids: [0,1,3,4,5,6]},
    { numero: 7, ids: [0,2,5]},
    { numero: 8, ids: [0,1,2,3,4,5,6]},
    { numero: 9, ids: [0,1,2,3,5,6]},
]

// possiveis resultados 
const resultados =  {
    error: {
        mensagem: 'Erro',
        cor: '#CC3300'
    },
    errou:{
        maior: 'É maior',
        menor: 'É menor',
        cor: '#000'
    },
    acertou: {
        mensagem: 'Você acertou!!!',
        cor: '#32BF00'
    }
}

let numeroParaAdvinhar ;
