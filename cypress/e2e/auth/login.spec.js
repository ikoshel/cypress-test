describe("Log in", () => {
  it('should login as User with valid credentials', () => {
    cy.fixture('credentials.json').then((data) => {
      cy.login(data.userCredentials.email, data.userCredentials.password, true)
    })
  });

  it('should login as Admin with valid credentials', () => {
    cy.fixture('credentials.json').then((data) => {
      cy.login(data.adminCredentials.email, data.adminCredentials.password, true)
    })
  });
})
