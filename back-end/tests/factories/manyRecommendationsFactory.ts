import { prisma } from "../../src/database.js";
import recommendationBodyFactory from "./recommendationBodyFactory.js";

export default async function createManyRecommendationsFactory() {
  await prisma.recommendation.createMany({
    data: [
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
      recommendationBodyFactory(),
    ],
  });
}
