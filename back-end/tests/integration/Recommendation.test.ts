import app from "../../src/app.js";
import supertest from "supertest";
import { prisma } from "../../src/database.js";
import recommendationBodyFactory from "../factories/recommendationBodyFactory.js";
import createManyRecommendationsFactory from "../factories/manyRecommendationsFactory.js";
import singleRecommendationFactory from "../factories/singleRecommendationFactory.js";
import { Recommendation } from "@prisma/client";
import { faker } from "@faker-js/faker";

describe("Recommendations tests", () => {
  afterAll(() => {
    return eraseRecommendationTable(), prismaDisconnect();
  });

  describe("Insert new one - POST /recommendations", () => {
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

  describe("Updating the song' score - POST /recommendations/:id/upvote & /recommendations/:id/downvote", () => {
    it("should return status 200 and increment the song score, given a valid ID", async () => {
      const id = 1;

      const result = await supertest(app).post(`/recommendations/${id}/upvote`);

      const recommendation = await prisma.recommendation.findUnique({
        where: {
          id: id,
        },
      });

      expect(result.status).toEqual(200);
      expect(recommendation.score).toEqual(1);
    });

    it("should return status 200 and decrement the song score, given a valid ID", async () => {
      const result = await supertest(app).post("/recommendations/1/downvote");

      const recommendation = await prisma.recommendation.findUnique({
        where: {
          id: 1,
        },
      });

      expect(result.status).toEqual(200);
      expect(recommendation.score).toEqual(0);
    });
  });

  describe("Update timeline - GET /recommendations", () => {
    beforeEach(() => {
      return eraseRecommendationTable();
    });

    it("should return the newest 10 recommendations", async () => {
      await createManyRecommendationsFactory();

      const result = await supertest(app).get("/recommendations");

      expect(result.body).toHaveLength(10);
      expect(result.body[0].id).toEqual(15);
    });
  });

  describe("Get single recommendation - GET /recommendations/:id", () => {
    beforeEach(() => {
      return eraseRecommendationTable();
    });

    it("should return the correct object", async () => {
      await singleRecommendationFactory();

      const id = 1;

      const result = await supertest(app).get(`/recommendations/${id}`);

      expect(typeof result.body).toBe("object");
      expect(result.body).toBeInstanceOf(Object);
      expect(result.body.id).toEqual(id);
    });
  });
});

async function eraseRecommendationTable() {
  return await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
}

async function prismaDisconnect() {
  return await prisma.$disconnect();
}
