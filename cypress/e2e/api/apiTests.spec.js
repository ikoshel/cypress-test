const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

describe('API Testing with Cypress', () => {
  beforeEach(() => {
    cy.fixture('apiTestData.json').as('postData')
  })

  it('Get post by ID', () => {
    cy.request({
      method: 'GET',
      url: `${API_ENDPOINT}/1`
    }).then((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.all.keys('id', 'title', 'body', 'userId');
    });
  });

  it('Get post by non-existent ID', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${API_ENDPOINT}/999999`
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('Get posts list', () => {
    cy.request({
      method: 'GET',
      url: API_ENDPOINT
    }).then((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.not.be.empty;
      expect(response.body).to.be.an('array');
      response.body.forEach(post => {
        expect(post).to.have.all.keys('id', 'title', 'body', 'userId');
      });
    });
  });

  it('Get posts list from non-existing URL', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${API_ENDPOINT}/non-existent`
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('Create new post', function () {
    cy.request({
      method: 'POST',
      url: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: this.postData.post
    }).then((response) => {
      expect(response).to.have.property('status', 201)
      expect(response.body).to.have.property('title', this.postData.post.title);
    });
  });

  it('Fail to create new post with wrong data', function () {
    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: this.postData.postWithoutTitle
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('Update post by ID', function () {
    cy.request({
      method: 'PUT',
      url: `${API_ENDPOINT}/1`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: this.postData.updatedPost
    }).then((response) => {
      expect(response).to.have.property('status', 200)
      expect(response.body).to.have.property('title', this.postData.updatedPost.title);
    });
  });

  it('Fail to update post by non-existent ID', function () {
    cy.request({
      method: 'PUT',
      failOnStatusCode: false,
      url: `${API_ENDPOINT}/999999`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: this.postData.updatedPost
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  });

  it('Fail to update post with wrong data', function () {
    cy.request({
      method: 'PUT',
      failOnStatusCode: false,
      url: `${API_ENDPOINT}/1`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: this.postData.postWithoutTitle
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Delete post by ID', () => {
    cy.request({
      method: 'DELETE',
      url: `${API_ENDPOINT}/1`
    }).then((response) => {
      expect(response).to.have.property('status', 200)
      expect(response.body).to.be.an('object').that.is.empty;
    });
  });
});
