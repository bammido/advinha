const numeroParaAdvinhar = 502

const cores = {
    inicial: 'rgb(0, 0, 0)',
    ledApagado: 'rgb(204, 51, 0)',
    error: 'rgb(204, 51, 0)'
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

describe('testando jogo em caso de erro de requisição',()=>{
  beforeEach(() => {
      cy.visit('/') // entra no site antes de cada teste

      cy.wait(1000)//espera a requisição para não quebrar

      // seta valorParaAdvinhar (502)
      cy.get('#input-teste').type(`${numeroParaAdvinhar}`, {force: true})
      cy.get("#botao-teste").click({force: true})
      
  })

  it('ao carregar a página com erro 502 o número 502 é exibido',()=>{
    const digito5 = cy.get('div[name=digito5]')
    const digito0 = cy.get('div[name=digito0]')
    const digito2 = cy.get('div[name=digito2]')

    digito5.should('not.be.empty')
    digito0.should('not.be.empty')
    digito2.should('not.be.empty')
  })

  it('ao carregar a página com erro 502 o input e o botão "enviar" estão desabilitados',()=>{
    const enviar = cy.get('#enviar')
    const input = cy.get('#input')

    enviar.should('be.disabled')
    input.should('be.disabled')
  })

  it('ao carregar a página com erro 502 o botão "nova-partida-botao" está visível',()=>{
    const novaPartida = cy.get('#nova-partida-botao')

    novaPartida.should('be.visible')
  })

  it('ao carregar a página com erro 502 a mensagem "Erro" é exibida',()=>{
    const mensagem = cy.get('#mensagem-span')

    mensagem.invoke('text').then( val => expect(val).to.be.eq('Erro'))
  })

  it('ao carregar a página com erro 502 a mensagem "Erro" é exibida na cor vermelha ',()=>{
    const { error } = cores
    
    cy.get('#mensagem-span').should('includes.css', 'color', error)
  })

  it('ao carregar a página com erro 502 os led acesos estão sendo exibidos na cor vermelha e os apagados na cor lightblue',()=>{
    const { error, ledApagado } = cores
    
    cy.get('.digito').each( digito =>{

      const leds = cy.wrap(digito).children()

      cy.wrap(digito).invoke('attr', 'name').then( val =>{
        const num = Number(val.split('digito')[1])
        const {ids} = numerosDigitais.find(({numero}) => numero === num )

        leds.then( led =>{
          cy.wrap(led).invoke('attr','id').then( ledId => {
            ids.includes(ledId)? 
            cy.wrap(led).should('includes.css', 'background-color', error) :
            cy.wrap(led).should('includes.css', 'background-color', ledApagado)
          })
        })
      })
    })
  })

  it('verifica se ao clicar no botão "nova-partida-botao" o jogo é reiniciado',()=>{
    const novaPartida = cy.get('#nova-partida-botao')
    novaPartida.click()

    novaPartida.should('not.be.visible')

    const enviar = cy.get('#enviar')
    const input = cy.get('#input')

    enviar.should('not.be.disabled')
    input.should('not.be.disabled')

    const digitos = cy.get('.digito')

    digitos.should('have.length', 1)

    digitos.invoke('attr', 'name').then( val =>{
      expect(val).to.includes('digito0')
    })
  })
})