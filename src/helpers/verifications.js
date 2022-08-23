function verificaNumero(entrada) {
    if(Number(entrada)<=300){
        const entradaArray = entrada.split('')
       
        if(entradaArray[0]==='0' && entradaArray[1]==='0' && entradaArray[2]==='0'){
            window.alert('digite um número maior que 0 !')
            limpaInput()
            return false
        }
        
        if(entradaArray[0]==='0' && entradaArray[1]==='0'){
            if(entradaArray.length===2){
                window.alert('digite um número maior que 0 !')
                limpaInput()
                return false
            }
        } 
        
        if(entradaArray[0]==='0') {
            if(entradaArray.length===1){
                window.alert('digite um número maior que 0 !')
                limpaInput()
                return false
            }
        }
        return entradaArray
    }
    
    window.alert('digite um número menor que 300!')
    
    limpaInput()
    return false
}

function verificaResultado(entrada){
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
