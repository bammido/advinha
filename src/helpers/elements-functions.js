//funções que mexem com elementos
function pegaAdvinhacao() {
    return `${Number(document.getElementById('input').value)}`
}

function desenhaNumero (entrada, cor) {

    const numeros = `${entrada}`.split('')
    
    
    for(let numero of numeros){
        desenhaDigito(numero, cor)
    }
    
    document.getElementById('input').value = ''
}

function desenhaDigito(entrada, cor) {
    const numeroEntrada = entrada? entrada : '0'
   
    const numeroDiv = document.getElementById('numero')
   
    const digito = document.createElement('div')
    digito.setAttribute('class', 'digito')
    digito.setAttribute('name', `digito${numeroEntrada}`)
    
    const numeroDigital = numerosDigitais.find(({numero}) => numero === Number(numeroEntrada))
    
    for(let i=0; i<7; i++){
        const led = document.createElement('div')
        led.setAttribute('class', 'led')
        led.setAttribute('id', `led${i}`)
        numeroDigital.ids.includes(i)? led.style.backgroundColor = cor? cor : '#000' : led.style.backgroundColor = 'lightblue'
        digito.append(led)
    }
    numeroDiv.append(digito)
}


function limpaDigitos () {
    const digitos = document.getElementById('numero').children
    let i = digitos.length -1
    
    while( i>=0 ){
        digitos[i].remove()
        i--
    }
}

function escreveMensagem(msg, cor){
    const mensagemSpan = document.getElementById('mensagem-span')
    mensagemSpan.innerHTML = msg
    mensagemSpan.style.color = cor
}

function habilitaNovaPartida(){
    const novaPartidaBotao = document.getElementById('nova-partida-botao')
    novaPartidaBotao.style.display = 'flex'
    
}

function desabilitaNovaPartida(){
    const novaPartida = document.getElementById('nova-partida-botao')
    novaPartida.style.display = 'none'
}

function desabilitaBotaoEnviar(){
    const botaoEnviar = document.getElementById('enviar')
    botaoEnviar.disabled  = true  
}

function desabilitaInput(){
    const input = document.getElementById('input')
    input.disabled  = true  
}

function limpaInput () {
    document.getElementById('input').value = ''
}

function iniciaJogo(){
    escreveMensagem('')
    const botaoEnviar = document.getElementById('enviar')
    botaoEnviar.disabled  = false  

    const input = document.getElementById('input')
    input.disabled  = false  
}

function modoTeste () {
    const inputTeste = document.getElementById('input-teste')
    numeroParaAdvinhar = Number(inputTeste.value)

    if(Number(numeroParaAdvinhar)!==502){
        limpaDigitos()
        desenhaDigito()
        iniciaJogo()
    }
    else{
        const {mensagem , cor} = resultados.error
        limpaDigitos()
        desenhaNumero(numeroParaAdvinhar, cor)
        escreveMensagem(mensagem, cor)
        habilitaNovaPartida()
        desabilitaBotaoEnviar()
        desabilitaInput()
    }

    inputTeste.value = ''

}