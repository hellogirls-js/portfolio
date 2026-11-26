import values from "../fixtures/chatbox.json";
import { ChatboxError } from "../../src/types/enums";

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

  it("does not place the chatbox under the taskbar when window height is decreased", () => {
    cy.get("#taskbar-container").then(($taskbar) => {
      const taskbarTop = $taskbar[0].getBoundingClientRect().top;

      cy.get("#chatbox-ref").should(($chatbox) => {
        expect($chatbox[0].getBoundingClientRect().bottom).to.be.at.most(
          taskbarTop,
        );
      });
    });

    cy.viewport(1000, 300).then(() => {
      cy.get("#taskbar-container").then(($taskbar) => {
        const taskbarTop = $taskbar[0].getBoundingClientRect().top;

        cy.get("#chatbox-ref").should(($chatbox) => {
          expect($chatbox[0].getBoundingClientRect().bottom).to.be.at.most(
            taskbarTop,
          );
        });
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

  context("chatbox form validation", () => {
    const nameField = () => cy.get("#chatbox-name-field");
    const msgField = () => cy.get("#chatbox-message-field");

    const nameError = () => cy.get("[data-cy='name-error-tooltip']");
    const msgError = () => cy.get("[data-cy='msg-error-tooltip']");

    beforeEach(() => {
      nameField().clear();
      msgField().clear();
      cy.fixture("chatbox").as("values");
    });

    it("types into the nickname field", () => {
      nameField()
        .focus()
        .should("not.be.disabled")
        .type(values.nickname)
        .blur();
    });

    it("types into the message field", () => {
      msgField().focus().should("not.be.disabled").type(values.message).blur();
    });

    it("increments the character counter while typing", () => {
      msgField()
        .type(values.message)
        .then(($msg) => {
          const msgText = String($msg.val());
          cy.get("#cbm-count").should("have.text", `${msgText.length}`);
        });
    });

    it("displays an error on blur when a nickname is too short", () => {
      nameField().type(values.short_nickname).blur();
      nameError().should("exist");
      nameError().contains(ChatboxError.NicknameTooShort).should("exist");

      // should not show msgError
      msgError().should("not.exist");
    });

    it("displays an error on blur when a message is too short", () => {
      msgField().type(values.short_nickname).blur();
      msgError().should("exist");
      msgError().contains(ChatboxError.MessageTooShort).should("exist");

      // should not show msgError
      nameError().should("not.exist");
    });

    it("cuts off message when it's too long", () => {
      msgField()
        .type(values.long_message)
        .then(($msg) => {
          const msgText = String($msg.val());
          // make sure the msg.val itself is 256 chars
          expect(msgText).to.have.length(256);
          expect(msgText).to.equal(values.long_message.slice(0, 256));
          cy.get("#cbm-count").should("have.text", 256);
        });
    });

    it("removes the error when addressed", () => {
      nameField().type(values.short_nickname).blur();
      nameError().should("exist");
      nameError().contains(ChatboxError.NicknameTooShort).should("exist");

      nameField().type(values.nickname).blur();
      nameError().should("not.");
    });
  });
});
