describe("Login", () => {
  it("should through an alert with required text", () => {
    cy.visit("/");
    cy.get("h1");

    cy.contains("Login").click();

    cy.contains("Required");
  });
});
