/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Posting new song and voting up/down", () => {
  it("should correctly post a new song", () => {
    cy.visit("http://localhost:3000/");

    const name = faker.lorem.words(2);

    cy.get("input[name=name]").type(name);
    cy.get("input[name=link]").type(
      "https://www.youtube.com/watch?v=q2QXg0zoZf8"
    );

    cy.intercept("POST", "/recommendations").as("postRecommendation");

    cy.get("button[type=button]").click();

    cy.wait("@postRecommendation");

    cy.contains(name).should("be.visible");
  });
});
