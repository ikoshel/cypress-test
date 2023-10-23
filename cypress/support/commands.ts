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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
require('cypress-xpath');

Cypress.Commands.add('login', function (email, password, rememberMe) {
  cy.visit('auth/login');

  cy.get('form input#input-email').type(email, {delay: 50});
  cy.get('form input#input-password').type(password, {delay: 50});

  if (rememberMe) {
    cy.get('form .custom-checkbox').click();
  }

  cy.get('form button[status="primary"]').click();
  cy.url().should('contain', '/pages');
});

// Cypress.Commands.add("inputUser", function(user) {
//   cy.get('input-editor > input[placeholder="ID"]').clear().type(user.id);
//   cy.get('input-editor > input[placeholder="First Name"]').clear().type(user.firstName);
//   cy.get('input-editor > input[placeholder="Last Name"]').clear().type(user.lastName);
//   cy.get('input-editor > input[placeholder="Username"]').clear().type(user.username);
//   cy.get('input-editor > input[placeholder="E-mail"]').clear().type(user.email);
//   cy.get('input-editor > input[placeholder="Age"]').clear().type(user.age);
//   cy.get('a > i.nb-checkmark').click();
// });
//
// Cypress.Commands.add("verifyUser", function(user) {
//   cy.get('tbody > :nth-child(1) > :nth-child(2)').should('have.text', user.id);
//   cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', user.firstName);
//   cy.get('tbody > :nth-child(1) > :nth-child(4)').should('have.text', user.lastName);
//   cy.get('tbody > :nth-child(1) > :nth-child(5)').should('have.text', user.username);
//   cy.get('tbody > :nth-child(1) > :nth-child(6)').should('have.text', user.email);
//   cy.get('tbody > :nth-child(1) > :nth-child(7)').should('have.text', user.age);
// });

Cypress.Commands.add("inputUser", (user) => {
  const placeholders = ["ID", "First Name", "Last Name", "Username", "E-mail", "Age"];
  const userEntries = Object.values(user);

  userEntries.forEach((value, index) => {
    cy.get(`input-editor > input[placeholder="${placeholders[index]}"]`).clear().type(value);
  });

  cy.get('a > i.nb-checkmark').click();
});

Cypress.Commands.add("verifyUser", (user) => {
  const userEntries = Object.values(user);

  userEntries.forEach((value, index) => {
    cy.get(`tbody > :nth-child(1) > :nth-child(${index + 2})`).should('have.text', value.toString());
  });
});
