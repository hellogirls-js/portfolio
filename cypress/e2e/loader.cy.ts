describe("initial loading screen", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the loading screen when opening the website", () => {
    cy.get("#desktop-loader-container").should("be.visible");
  });

  it("should disappear after five seconds", () => {
    cy.get("#desktop-loader-contaienr", { timeout: 5000 }).should("not.exist");
  });
});
