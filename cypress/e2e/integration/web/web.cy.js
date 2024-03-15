/// <reference types="Cypress" />

describe('Desafio de automação', () => {
    it('Automatizar interface web', () => {
      cy.visit('https://the-internet.herokuapp.com/challenging_dom')
  
      // Clique em todos os 3 botões apresentados em tela
      cy.get('.button').each(($botao) => {
        const urlAntesDoClique = cy.url();
        $botao.click();
        cy.url().should('not.eq', urlAntesDoClique); // Verifica se a URL foi alterada após o clique
      })
  
      // Clique em todos os botões "edit" e "delete" da grid apresentada
      cy.get('td a').each(($link) => {
        const urlAntesDoClique = cy.url();
        const linha = $link.closest('tr'); // Obter a linha que contém o link
        $link.click();
        cy.url().should('not.eq', urlAntesDoClique); // Verificar se a URL foi alterada após o clique
        cy.wrap(linha).should('exist'); // Verificar se a linha ainda existe na página
      });
    });
  });