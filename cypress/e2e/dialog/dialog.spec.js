describe("Dialog page", () => {
  beforeEach(() => {
    cy.visit('pages/modal-overlays/dialog')
  })

  it('Modal window should be visible and has items: title, input, Submit btn and Cancel btn', () => {
    cy.get('nb-card-body.result-from-dialog button').as("enterNameBtn")
    cy.get("@enterNameBtn").should('be.visible').click()

    cy.get('ngx-dialog-name-prompt.ng-star-inserted').as("modalWindow")
    cy.get('ngx-dialog-name-prompt.ng-star-inserted nb-card-header').as("titleModalWindow")
    cy.get('ngx-dialog-name-prompt.ng-star-inserted input').as("inputNameModalWindow")
    cy.get('ngx-dialog-name-prompt.ng-star-inserted button.cancel').as("cancelBtnModalWindow")
    cy.get('ngx-dialog-name-prompt.ng-star-inserted button[status="success"]').as("submitBtnModalWindow")

    cy.get("@modalWindow").should('be.visible')
    cy.get("@titleModalWindow").should('have.text', "Enter your name")
    cy.get("@inputNameModalWindow").should('be.visible')
    cy.get("@cancelBtnModalWindow").should('be.visible')
    cy.get("@submitBtnModalWindow").should('be.visible')
  });
})
