import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

describe("Recommendation service unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("Update the song' score - POST /recommendations/:id/upvote & /recommendations/:id/downvote", () => {
    it("should return status 404 while incrementing a song' score, given an invalid ID", async () => {
      jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

      try {
        await recommendationService.upvote(1);
      } catch (error) {
        expect(error.type).toEqual("not_found");
      }
    });

    it("should return status 404 while decreasing a song' score, given an invalid ID", async () => {
      jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

      try {
        await recommendationService.downvote(1);
      } catch (error) {
        expect(error.type).toEqual("not_found");
      }
    });

    it("should remove the recommendation when score is below -5", async () => {
      const recommendation = {
        id: 1,
        youtubeLink: "https://www.youtube.com/watch?v=11yn67BBiV8&t=4s",
        score: -10,
        name: faker.lorem.words(2),
      };

      const recommendationFind = jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValue(recommendation);

      const recommendationUpdate = jest
        .spyOn(recommendationRepository, "updateScore")
        .mockImplementation(() => null);

      const recommendationRemoval = jest
        .spyOn(recommendationRepository, "remove")
        .mockImplementation(() => null);

      await recommendationService.downvote(1);

      expect(recommendationFind).toHaveBeenCalledTimes(1);
      expect(recommendationUpdate).toHaveBeenCalledTimes(1);
      expect(recommendationRemoval).toHaveBeenCalledTimes(1);
    });
  });

  describe("Get random recommendation - GET /recommendations/random", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it("should return status 404 when there is no recommendations at all", async () => {
      jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

      try {
        await recommendationService.getRandom();
      } catch (error) {
        expect(error.type).toEqual("not_found");
      }
    });

    it("should return a recommendation with score between -5 and 10", async () => {
      const recommendation = {
        id: 1,
        youtubeLink: "https://www.youtube.com/watch?v=11yn67BBiV8&t=4s",
        score: -10,
        name: faker.lorem.words(2),
      };

      jest.spyOn(Math, "random").mockReturnValueOnce(0.9);

      const recommendationFind = jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValue([recommendation]);

      await recommendationService.getRandom();

      expect(recommendationFind).toHaveBeenCalledTimes(1);
    });
  });
});
