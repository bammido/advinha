describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/') // entra no site
        cy.get('input[id*="input"]').type('123') //pega o input e digita '123'
        cy.get('button[id*="enviar"]').click() //clica no botão enviar 
        
        const digitos = cy.get('div[id="numero"]').children() //pega digitos
        
        digitos.should('have.length', 3)//verifica se os digitos foram adicionados
        
        const digito1 =  cy.get('div[name="digito1"]')
        const digito2 =  cy.get('div[name="digito2"]')
        const digito3 =  cy.get('div[name="digito3"]')

        expect(digito1).not.to.be.empty //verifica se digito 1 foi desenhado
        expect(digito2).not.to.be.empty //verifica se digito 2 foi desenhado
        expect(digito3).not.to.be.empty //verifica se digito 3 foi desenhado

    })
  })