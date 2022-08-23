# Qual é o número?

![image](https://user-images.githubusercontent.com/65303066/186275113-af22f724-0a62-4604-94c0-da9efa471239.png)

![image](https://user-images.githubusercontent.com/65303066/186275214-c9db0a84-251d-4f86-a4a4-8643b1f82b83.png)    ![image](https://user-images.githubusercontent.com/65303066/186275336-3f071038-8591-4e78-bed7-ea64b766b17a.png)

## Tecnologias 

* JavaScript
* HTML
* CSS
* Cypress (testes)

## Funcionamento do Jogo

* Ao carregar a página o jogo é carregado e a requisição é feita, em caso de erro a mensagem de erro é exibida e o número de status code é desenhado, ambos número denhado e a mensagem de erro aparecem na cor vermelha,  caso contrário o jogo se inicia
* Somente números de 1 a 300 são aceitos 
* Ao enviar um número ele é desenhado na tela, caso seja o correto aparecerá a mensagem "Você acertou!!!" e o número será desenhado na cor verde, caso não seja o número correto a mensagem exibida pode ser "É maior" ( se o número enviado for menor ) ou "É menor" ( se o número enviado for maior )
* Em caso de erro ou caso o usuário acerte o número, a partida poderá ser reiniciada clicando no botão "nova partida"

## Arquivos de lógica

### script.js

As funções relacionadas ao "script" do jogo

### elements-functions.js

As funções que mudam os elementos da página

### verifications.js

Funções de validação

### helpers.js

Variáveis para simplicar algumas funções 

## Como funciona o display?

Basicamente quando um número é validado e enviado, os digitos anteriores são apagados e é criado uma <div> para cada dígito do número enviado posteriormente é adicionada a cada uma ela a class 'digito' ( estilo que está do arquivo display.css ). Para cada dígito são criados 7 LEDs ( divs ) e então para cada led é feita uma verificação baseada na lista numerosDigitais ( helper.js ), onde cada número tem o id dos LEDs que devem ser "acesos". Caso o id do led esteja na lista ele é aceso com a cor ( backgorund-color ) correspondente ao resultado ( error, acertou, errou ). 

## Rodando testes

* Antes de mais nada será nescessário rodar * :
``` npm i ```
para instalar o *** cypress *** ( framework usado para testar )

depois de instalar as dependências, será nescessário rodar o servidor ( pode ser com qualquer lib ou extensão, recomendo o uso do live-server extensão do vs code )

![abrindo live server](https://user-images.githubusercontent.com/65303066/186278898-2df141f7-73f3-4570-b0f3-3c087a742528.png)

*** obs: caso opte por não usar o liver-server deve colocar o caminho do servidor no arquivo cypress.config.js na parte de baseUrl para o cypress encontrar ***

```
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'coloque o novo caminho aqui', 
    pageLoadTimeout: 150000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

```

agora deve rodar o comando ``` npm test ``` e esperar até que o cypress abra

![image](https://user-images.githubusercontent.com/65303066/186277116-a39511d2-d597-4fa6-8758-2c9c257473cf.png)

clicque em 'E2E Testing' e escolha o navegador de sua preferência ( onde o cypress irá realizar os testes ) e clique em 'Start E2E Testing' 

![image](https://user-images.githubusercontent.com/65303066/186277291-2919cf5b-7450-4438-aad2-aebd28544ea8.png)

agora devem aparecer os arquivos de testes basta clicar em um deles para rodar

![image](https://user-images.githubusercontent.com/65303066/186277486-59ad557b-ecbf-458a-94c3-92cf41f7598f.png)

eles foram separados em dois casos,  o de 'good request' e o caso de 'bad request' que são as possíveis respostas do endpoint

Após rodar um dos testes, para visualizar novamente a tela de testes basta clicar em 'specs' do lado esquerdo da tela

![cypress](https://user-images.githubusercontent.com/65303066/186278376-a05509f2-6303-4297-856f-1bed969925c7.png)
