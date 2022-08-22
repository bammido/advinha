const numeroParaAdvinhar = 150

const cores = {
    inicial: 'rgb(0, 0, 0)',
    ledApagado: 'lightblue',
    errou: 'rgb(0, 0, 0)',
    acertou: '#32BF00',
}

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

describe('testando jogo caso a requisição de certo!!', () => {
    
    beforeEach(() => {
        cy.visit('/') // entra no site antes de cada teste

        cy.wait(1000)//espera a requisição para não quebrar

        // seta valorParaAdvinhar (150)
        cy.get('#input-teste').type(`${numeroParaAdvinhar}`, {force: true})
        cy.get("#botao-teste").click({force: true})
        
    })
    it('ao iniciar o jogo deve exibir o número 0',()=>{
        
        //pega o digito da tela
        const digitosTela = cy.get('div[class="digito"]')
        
        //verifica se tem somente um digito na tela 
        digitosTela.should("have.length", 1)

        //pega o dígito 0 (os dígitos ao serem criados tem name= "digito" + numero)
        const digito0 = cy.get('di[name=digito0]')

        //verifica se o dígito 0 está na tela
        digito0.should('not.be.empty')
    })

    it('escreve 1 e exibe na tela', () => {

        const input = cy.get('#input')
        const enviar = cy.get('button[id*="enviar"]')
        
        input.type('1') //digita 1
        enviar.click() //clica no botão enviar 
        
        // pega dígitos da tela
        const digitosTela =  cy.get('div[class="digito"]')

        digitosTela.should('have.length', 1)       
        
        const digito1 = cy.get('di[name=digito1]')

        digito1.should('not.be.empty')
    })

    it('escreve "01" e "001" e exibe somente 1',()=>{
        const input = cy.get('#input')
        const enviar = cy.get('button[id*="enviar"]')

        input.type('01') //digita 01
        enviar.click() //clica no botão enviar 

        let digitos =  cy.get('div[class="digito"]')

        digitos.should('have.length', 1)
        
        input.type('001') //digita 001
        enviar.click() //clica no botão enviar 

        digitos =  cy.get('div[class="digito"]')

        digitos.should('have.length', 1)
    })

    it('escreve números maiores que 300 e verifica se não foram exibidos', ()=>{

        const input = cy.get('#input')
        const enviar = cy.get('button[id*="enviar"]')

        let digitos = cy.get('div[class="digito"]')

        input.type('301')
        enviar.click()

        digitos.should('not.have.length', 3)

        input.type('500')
        enviar.click()

        digitos = cy.get('div[class="digito"]')

        digitos.should('not.have.length', 3)
    })

    it('digita números negativos e verifica se não foram exibidos',()=>{
        const input = cy.get('#input')
        const enviar = cy.get('#enviar')

        const digitos = cy.get('.digito')

        input.type('-22')
        enviar.click()

        digitos.should('not.have.length', 2)

        const digito0 = cy.get('div[name=digito0]')

        digito0.should('not.be.empty')
    })

    it('ao iniciar o jogo verifica se o input e o botão enviar não estão desabilitados',()=>{
        const input = cy.get('#input')
        const enviar = cy.get('#enviar')

        input.should('not.be.disabled')
        enviar.should('not.be.disabled')
    })

    it('verifica se ao enviar valores maiores que o número a mensagem exibida é "É menor" obs: numero definido no início do arquivo de teste',()=>{
        const input = cy.get('#input')
        const enviar = cy.get('#enviar')
        const mensagem = cy.get('#mensagem')

        input.type(`${numeroParaAdvinhar + 1}`)
        enviar.click()

        mensagem.then( divMsg => {
            const txt = divMsg[0].innerText
            expect(txt).to.be.eq('É menor')
        })
    })

    it('verifica se ao enviar valores menores que o número a mensagem exibida é "É maior" obs: numero definido no início do arquivo de teste',()=>{
        const input = cy.get('#input')
        const enviar = cy.get('#enviar')
        const mensagem = cy.get('#mensagem')

        input.type(`${numeroParaAdvinhar - 1}`)
        enviar.click()

        mensagem.then( divMsg => {
            const txt = divMsg[0].innerText
            expect(txt).to.be.eq('É maior')
        })
    })

    it('verifica se ao enviar valor igual ao número exibe a mensagem "Você acertou!!!"',()=>{
        const input = cy.get('#input')
        const enviar = cy.get('#enviar')
        const mensagem = cy.get('#mensagem')

        input.type(`${numeroParaAdvinhar}`)
        enviar.click()

        mensagem.then( divMsg => {
            const txt = divMsg[0].innerText
            expect(txt).to.be.eq('Você acertou!!!')
        })
    })

    it('envia espaços antes e depois e verifica se não foi desenhado o número', ()=>{
        const input = cy.get('#input')
        const enviar = cy.get('#enviar')

        input.type(' 1')//espaço antes
        enviar.click()

        let digitos = cy.get('.digito')

        digitos.should('have.length', 1)

        digitos.then( div =>{
            const divName = div[0].attributes[1].value
            expect(divName).to.be.eq('digito0')
        })

        input.clear()

        input.type('2  ') //espaço depois
        enviar.click()

        digitos = cy.get('.digito')

        digitos.should('have.length', 1)

        digitos.then( div =>{
            const divName = div[0].attributes[1].value
            expect(divName).to.be.eq('digito0')

        })

    })

    it('ao carregar a página verifica se os leds acesos do dígito inicial estão na cor preta ( rgb(0, 0, 0) ) e leds apagados na cor lightblue',()=>{

        const { inicial, ledApagado } = cores
        const digitoInicial = cy.get('.digito')

        digitoInicial.then( digDiv =>{
            const digito = Number(digDiv[0].attributes[1].value.split('digito')[1])

            const {ids} = numerosDigitais.find( ({numero}) => numero === digito)

            const leds = digitoInicial.children()

            leds.each( led =>{
                const attributes = led[0].attributes
                const id = Number(attributes[1].value.split('led')[1])
                const style = attributes['style']
                const bg = style.value
    
                console.log(id)
    
                ids.includes(id)? expect(bg).to.includes(inicial) : expect(bg).to.includes(ledApagado)
            })
        })
    })

    it('ao enviar valor diferente do número correto verifica se os leds acesos do dígito estão na cor preta ( rgb(0, 0, 0) ) e leds apagados na cor lightblue',()=>{

        const { errou, ledApagado } = cores

        const input = cy.get('#input')
        const enviar = cy.get('#enviar')

        input.type(`${numeroParaAdvinhar + 1}`)
        enviar.click()

        cy.get('.digito').each( digDiv =>{

            // const digito = digDiv.children()
            const numDigito = Number(digDiv[0].attributes[1].value.split('digito')[1])
            
            // console.log(digito)
            
            const {ids} = numerosDigitais.find( ({numero}) => numero === numDigito)

            const leds = digDiv.children()

            leds.each( led =>{
                const attributes = led[0].attributes
                const id = Number(attributes[1].value.split('led')[1])
                const style = attributes['style']
                const bg = style.value
    
                console.log(id)
    
                ids.includes(id)? expect(bg).to.includes(errou) : expect(bg).to.includes(ledApagado)
            })
            
        })


        input.type(`${numeroParaAdvinhar - 1}`)
        enviar.click()
    })

    // it('digita "1", "11", "111" e verifica se foi exibido em caso a request não dê erro', ()=>{
    //     const input = cy.get('#input')
    //     const enviar = cy.get('button[id*="enviar"]')

    //     input.then( inp => {
    //         if(inp[0].disabled){
    //             cy.reload()
    //             cy.wait(1000)
    //         }

    //         input.type('1')
    //         enviar.click()

    //         const digito1 = cy.get('div[name="digito1"]')

    //         digito1.should('have.length', 1)

    //         input.type('11')
    //         enviar.click()

    //         const digitos11 = cy.get('div[name="digito1"]')

    //         digitos11.should('have.length', 2)

    //     })
    // })
    
    // it('verifica se a mensagem é corretamente exibida',()=>{
        
    //     const mensagem = cy.get("div[id*='mensagem']")
    //     const numero = cy.get('#numero')
    //     const input = cy.get('#input')
    //     const enviar = cy.get('button[id*="enviar"]')
        
    //     input.then(inp =>{

    //         // verifica se a requisição deu erro
    //         if(inp[0].disabled){
                
    //             //deve exibir 'Error' com mensagem
    //             mensagem.then((value)=>{
    //                 expect(value[0].innerText).to.be.eq('Erro')
    //             } )
    //         }
    //         else{
    //             numero.then( num =>{
    //                 const numeroParaAdvinhar = Number(num[0].dataset.teste) //pega numero gerado

    //                 input.type(`${numeroParaAdvinhar - 1}`) // digita um valor menor
    //                 enviar.click()

    //                 mensagem.then((value)=>{
    //                     //deve exibir 'É maior' com mensagem
    //                     expect(value[0].innerText).to.be.eq('É maior')  
    //                 } )

    //                 input.type(`${numeroParaAdvinhar + 1}`) // digita um valor maior
    //                 enviar.click()

    //                 mensagem.then((value)=>{
    //                     //deve exibir 'É menor' com mensagem
    //                     expect(value[0].innerText).to.be.eq('É menor')   
    //                 } )

    //                 input.type(`${numeroParaAdvinhar}`) // digita o numero certo
    //                 enviar.click()

    //                 mensagem.then((value)=>{
    //                     //deve exibir 'É menor' com mensagem
    //                     expect(value[0].innerText).to.be.eq('Você acertou!!!')
    //                 } )
    //             })
                
    //         }
    //     })
    // })
    // it('vreifica se o botão "enviar" e o input estão desabilitados quando há erro ou quando o numero é acertado',()=>{
    //     const numero = cy.get('#numero')
    //     const input = cy.get('#input')
    //     const enviar = cy.get('button[id*="enviar"]')

    //     input.then( inp =>{
    //         if(inp[0].disabled){
    //             enviar.should('be.disabled')
    //             input.should('be.disabled')
    //         }
    //         else{
    //             numero.then( num =>{
    //                 const numeroParaAdvinhar = Number(num[0].dataset.teste) //pega numero gerado
                    
    //                 input.should('not.be.disabled')
    //                 enviar.should('not.be.disabled')

    //                 input.type(`${numeroParaAdvinhar}`)
    //                 enviar.click()

    //                 input.should('be.disabled')
    //                 enviar.should('be.disabled')

    //             })
    //         }
    //     })
        
    // })
  })

