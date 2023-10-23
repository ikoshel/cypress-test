describe("Smart form page", () => {
  beforeEach(() => {
    cy.visit('pages/tables/smart-table')
  })
  it('should display valid users', () => {
    const expectedUsers = [
      {
        "id": "1",
        "firstName": "Mark"
      },
      {
        "id": "2",
        "firstName": "Jacob"
      },
      {
        "id": "3",
        "firstName": "Larry"
      },
      {
        "id": "4",
        "firstName": "John"
      },
      {
        "id": "5",
        "firstName": "Jack"
      },
      {
        "id": "6",
        "firstName": "Ann"
      },
      {
        "id": "7",
        "firstName": "Barbara"
      },
      {
        "id": "8",
        "firstName": "Sevan"
      },
      {
        "id": "9",
        "firstName": "Ruben"
      },
      {
        "id": "10",
        "firstName": "Karen"
      }
    ]
    const users = []
    cy.get("table tbody tr.ng-star-inserted").each(($el) => {
      cy.wrap($el).find('td').then(($cells) => {
        const user = {
          id: $cells.eq(1).text(),
          firstName: $cells.eq(2).text(),
        }

        users.push(user)
      })
    }).then(() => {
      cy.log(users)
      cy.wrap(users).should('deep.equal', expectedUsers)
    })
  });

  it('find by id', () => {
    cy.get("table tbody tr.ng-star-inserted").find("td").filter(':contains("5")').last().parent().find("a.ng2-smart-action-edit-edit").click()
  })

  it('should add, modify, and verify a user successfully', () => {
    cy.fixture('newUserInfo.json').then((users) => {
      // click to add button
      cy.get('a i.nb-plus').click();
      // add info about new user John
      cy.inputUser(users.userJohn);
      // verify info about user John
      cy.verifyUser(users.userJohn);

      // click edit button for last added user John
      cy.get(':nth-child(1) > .ng2-smart-actions > ng2-st-tbody-edit-delete > .ng2-smart-action-edit-edit').click();
      // edit info about John to Bob
      cy.inputUser(users.userBob);
      // verify info about user Bob
      cy.verifyUser(users.userBob);
    });
  });
})
