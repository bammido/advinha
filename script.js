const numerosDigitais = [
    { numero: 0, ids: [0,1,2,4,5]},
    { numero: 1, ids: [2,5]},
    { numero: 2, ids: [0,2,3,4,6]},
    { numero: 3, ids: [0,2,3,5,6]},
    { numero: 4, ids: [1,2,3,5]},
    { numero: 5, ids: [0,1,3,5,6]},
    { numero: 6, ids: [0,1,3,4,5,6]},
    { numero: 7, ids: [0,2,5]},
    { numero: 8, ids: [0,1,2,3,4,5,6]},
    { numero: 9, ids: [0,1,2,3,5]},
]

function desenhaDigito() {
    const digito = document.createElement('div')
    digito.setAttribute('class', 'digito')


    for(let i=0; i<7; i++){
        const led = document.createElement('div')
        led.setAttribute('class', 'led')
        led.setAttribute('id', `led${i}`)
        led.style.backgroundColor = 'green'
        digito.append(led)
    }

    const numero = document.getElementById('numero')
    numero.append(digito)
}