describe("initial loading screen", () => {
	beforeEach(() => {
		cy.on("window:before:load", (win) => {
			win.skipDesktopLoader = false;
		});
		cy.visit("/");
	});

	it("shows the loading screen when opening the website", () => {
		cy.get("#desktop-loader-container").should("be.visible");
	});

	it("should disappear after five seconds", () => {
		cy.get("#desktop-loader-container", { timeout: 8000 }).should("not.exist");
	});
});
