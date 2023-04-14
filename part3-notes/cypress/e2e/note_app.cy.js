/* eslint-disable prefer-arrow-callback, func-names */

describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  // the test cases have been defined with the it method.
  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
    // get() searches elements by CSS selectors
    cy.get("#username").type("test");
    cy.get("#password").type("123");
    cy.get("#login-button").click();

    cy.contains("test user logged in");
  });
});
