import { CreateRecommendationData } from "../../src/services/recommendationsService.js";
import { faker } from "@faker-js/faker";

export default function recommendationBodyFactory() {
  const body: CreateRecommendationData = {
    name: faker.lorem.words(2),
    youtubeLink: "https://www.youtube.com/watch?v=q2QXg0zoZf8",
  };

  return body;
}
