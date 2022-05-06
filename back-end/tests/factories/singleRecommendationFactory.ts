import { prisma } from "../../src/database.js";
import recommendationBodyFactory from "./recommendationBodyFactory.js";

export default async function singleRecommendationFactory() {
  await prisma.recommendation.create({
    data: recommendationBodyFactory(),
  });
}
