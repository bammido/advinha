
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

window.addEventListener('load', () => carregaJogo() )
let numeroParaAdvinhar ;


async function pegaNumeroParaAdvinhar()  {
    
    const response = await fetch('https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300')
        .then( res => {
            return res.json()
        })
        .catch ( error =>  error )
    console.log(response)
    return response
    
}

async function carregaJogo (){
    numeroParaAdvinhar = await pegaNumeroParaAdvinhar().then( res => res.value? res.value : res)
    console.log(numeroParaAdvinhar)
    
    if(numeroParaAdvinhar.StatusCode){
        const {mensagem , cor} = resultados.error
        desenhaNumero(`${numeroParaAdvinhar.StatusCode}`, cor)
        escreveMensagem(mensagem, cor)
        habilitaNovaPartida()
        desabilitaBotaoEnviar()
        desabilitaInput()
        return false
    }
    iniciaJogo()
    desenhaDigito()
    //colocando numero para testar
    const numero = document.getElementById('numero')
    numero.dataset.teste = `${numeroParaAdvinhar}`
}

function form (e) {
    e.preventDefault()

    console.log(numeroParaAdvinhar)

    const numero = `${Number(document.getElementById('input').value)}`
    console.log(numero)
    if(!verificaNumero(numero)) return false
    
    limpaDigitos()
    
    const {mensagem, cor } = verificaResultado(numero)
    
    escreveMensagem(mensagem , cor)
    desenhaNumero(numero, cor)
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

function desenhaNumero (entrada, cor) {

    const numeros = entrada
    
    
    for(let numero of numeros){
        desenhaDigito(numero, cor)
    }
    
    document.getElementById('input').value = ''
}

function limpaDigitos () {
    const digitos = document.getElementById('numero').children
    let i = digitos.length -1
    
    while( i>=0 ){
        digitos[i].remove()
        i--
    }
}

function verificaResultado(entrada){
    console.log('verificanumero',numeroParaAdvinhar)
    const entradaNumber = Number(entrada)
    if(numeroParaAdvinhar !== entradaNumber){
        const {cor, maior, menor} = resultados.errou
        const numeroEhMaior = numeroParaAdvinhar > entradaNumber
        const mensagem = numeroEhMaior? maior : menor
        return {mensagem, cor}
        
    } 

    const {mensagem, cor} = resultados.acertou
    desabilitaBotaoEnviar()
    desabilitaInput()
    habilitaNovaPartida()
    return {mensagem, cor}
}

function verificaNumero(entrada) {
    if(Number(entrada)<=300){
        const entradaArray = entrada.split('')
        if(entradaArray[0]==='0' && entradaArray[1]==='0' && entradaArray[2]==='0'){
            window.alert('digite um número maior que 0 !')
            document.getElementById('input').value = ''
            return false
        }
        if(entradaArray[0]==='0' && entradaArray[1]==='0'){
            if(entradaArray.length===2){
                window.alert('digite um número maior que 0 !')
                document.getElementById('input').value = ''
                return false
            }
        } 
        if(entradaArray[0]==='0') {
            if(entradaArray.length===1){
                window.alert('digite um número maior que 0 !')
                document.getElementById('input').value = ''
                return false
            }
        }
        return entradaArray
    }
    
    window.alert('digite um número menor que 300!')
    
    // limpa input
    document.getElementById('input').value = ''
    return false
}

function escreveMensagem(msg, cor){
    const mensagemSpan = document.getElementById('mensagem-span')
    mensagemSpan.innerHTML = msg
    mensagemSpan.style.color = cor
}

function habilitaNovaPartida(){
    const novaPartidaBotao = document.getElementById('nova-partida-botao')
    novaPartidaBotao.style.display = 'initial'
    
}
function desabilitaBotaoEnviar(){
    const botaoEnviar = document.getElementById('enviar')
    botaoEnviar.disabled  = true  
}
function desabilitaInput(){
    const input = document.getElementById('input')
    input.disabled  = true  
}
function novaPartida(){
    limpaDigitos()
    carregaJogo()
}
function iniciaJogo(){
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
        desenhaNumero(numeroParaAdvinhar, cor)
        escreveMensagem(mensagem, cor)
        habilitaNovaPartida()
        desabilitaBotaoEnviar()
        desabilitaInput()
    }

    inputTeste.value = ''

}