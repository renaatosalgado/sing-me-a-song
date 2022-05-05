import { prisma } from "../src/database.js";
import { CreateRecommendationData } from "../src/services/recommendationsService.js";

async function createRecommendation(recommendation: CreateRecommendationData) {
  await prisma.recommendation.create({
    data: recommendation,
  });
}
