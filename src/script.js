
window.addEventListener('load', () => carregaJogo() )

async function carregaJogo (){
    numeroParaAdvinhar = await pegaNumeroParaAdvinhar().then( res => res.value? res.value : res)
    
    // caso bad request
    if(numeroParaAdvinhar.StatusCode){
        const {mensagem , cor} = resultados.error
        desenhaNumero(`${numeroParaAdvinhar.StatusCode}`, cor)
        escreveMensagem(mensagem, cor)
        habilitaNovaPartida()
        desabilitaBotaoEnviar()
        desabilitaInput()
        return false
    }

    // caso good request
    iniciaJogo()
    desenhaDigito()
    
}

async function pegaNumeroParaAdvinhar()  {
    
    const response = await fetch('https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300')
        .then( res => {
            return res.json()
        })
        .catch ( error =>  error )
    return response  
}

function enviaAdvinhacao (e) {
    e.preventDefault()

    const numero = pegaAdvinhacao()

    // caso o numero enviado não passe na verificação sai da função
    if(!verificaNumero(numero)) return false
    
    limpaDigitos()
    
    const {mensagem, cor } = verificaResultado(numero)
    
    escreveMensagem(mensagem , cor)
    desenhaNumero(numero, cor)
}

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

function novaPartida(){
    limpaDigitos()
    carregaJogo()
    desabilitaNovaPartida()
}
