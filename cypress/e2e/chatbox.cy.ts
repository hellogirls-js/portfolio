describe("chatbox", () => {
	beforeEach(() => {
		cy.viewport(1000, 660);
		cy.visit("/");
	});

	it("does not place the chatbox under the taskbar", () => {
		cy.get("#taskbar-container").then(($taskbar) => {
			const taskbarTop = $taskbar[0].getBoundingClientRect().top;

			cy.get("#chatbox-ref").should(($chatbox) => {
				expect($chatbox[0].getBoundingClientRect().bottom).to.be.at.most(
					taskbarTop,
				);
			});
		});
	});

	it("resizes the chatbox when viewport height < 560px", () => {
		cy.viewport(1000, 550);
		// it should not be under the taskbar
		cy.get("#taskbar-container").then(($taskbar) => {
			const taskbarTop = $taskbar[0].getBoundingClientRect().top;

			cy.get("#chatbox-ref").should(($chatbox) => {
				expect($chatbox[0].getBoundingClientRect().bottom).to.be.at.most(
					taskbarTop,
				);
			});
		});

		cy.get("#chatbox-ref").should(($chatbox) => {
			expect($chatbox[0].offsetHeight).to.be.at.most(550 - 48);
		});
	});

	it("resizes the chatbox when viewport width < 384px", () => {
		cy.viewport(380, 660);

		cy.get("#chatbox-ref").should(($chatbox) => {
			expect($chatbox[0].offsetWidth).to.be.at.most(380);
		});

		cy.viewport(120, 660);
		cy.get("#chatbox-ref").should(($chatbox) => {
			expect($chatbox[0].offsetWidth).to.be.at.most(120);
		});
	});

	// more things to test:
	// form functionality and error handling

	it("types into the nickname field", () => {
		cy.get("#chatbox-name-field").type("yo mama").blur();
	});

	it("types into the message field", () => {
		cy.get("#chatbox-message-field").type("is so ugly").blur();
	});

	it("increments the character counter while typing", () => {
		cy.get("#chatbox-message-field")
			.type("yo mama is so ugly")
			.then(($msg) => {
				const msgText = String($msg.val());
				cy.get("#cbm-count").should("have.text", `${msgText.length}`);
			});
	});
});
