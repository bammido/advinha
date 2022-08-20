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


function form (e) {
    e.preventDefault()
    const numero = document.getElementById('input').value
    desenhaNumero(numero)
}

function desenhaDigito(entrada) {
    const numero = document.getElementById('numero')
    const digito = document.createElement('div')
    digito.setAttribute('class', 'digito')
    
    const numeroDigital = numerosDigitais.find(({numero}) => numero === Number(entrada))
    
    
    for(let i=0; i<7; i++){
        const led = document.createElement('div')
        led.setAttribute('class', 'led')
        led.setAttribute('id', `led${i}`)
        numeroDigital.ids.includes(i)? led.style.backgroundColor = '#32BF00' : led.style.backgroundColor = 'lightblue'
        digito.append(led)
    }
    
    numero.append(digito)
    
}

function desenhaNumero (entrada) {
    const numeros =  entrada.split('')
    const digitos = document.getElementById('numero').children
    let i = digitos.length -1
    
    while( i>=0 ){
        digitos[i].remove()
        i--
    }
    for(let numero of numeros){
        desenhaDigito(numero)
    }
    
    document.getElementById('input').value = ''
}
