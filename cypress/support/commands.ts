/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add(
  "handleNickname",
  (value: string, outcome: (msg: JQuery<HTMLElement>) => void) => {
    const nameField = () => cy.get("#chatbox-name-field");

    nameField()
      .type(value)
      .then(($msg) => {
        outcome($msg);
      });
  },
);

Cypress.Commands.add(
  "handleMessage",
  (value: string, outcome: (msg: JQuery<HTMLElement>) => void) => {
    const msgField = () => cy.get("#chatbox-message-field");

    msgField()
      .type(value)
      .then(($msg) => {
        outcome($msg);
      });
  },
);

declare global {
  namespace Cypress {
    interface Chainable {
      handleNickname(
        value: string,
        outcome: (msg: JQuery<HTMLElement>) => void,
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
