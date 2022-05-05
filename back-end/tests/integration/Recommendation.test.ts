import app from "../../src/app.js";
import supertest from "supertest";
import { prisma } from "../../src/database.js";
import recommendationBodyFactory from "../factories/recommendationBodyFactory.js";

describe("Recommendations tests", () => {
  beforeEach(eraseRecommendationTable);

  describe("Insert new one - POST /recommendation", () => {
    it("should return status 201, given a valid body", async () => {
      const body = recommendationBodyFactory();

      const result = await supertest(app).post("/recommendations").send(body);

      const newRecommendation = await prisma.recommendation.findUnique({
        where: {
          name: body.name,
        },
      });

      expect(result.status).toEqual(201);
      expect(newRecommendation).not.toBeNull();
    });
  });

  describe("Updating the votes for a song", () => {
    it("should return status")
  })
});

function eraseRecommendationTable(): jest.ProvidesHookCallback {
  return async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  };
}
