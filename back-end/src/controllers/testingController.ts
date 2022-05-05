import { Response, Request } from "express";
import testingService from "../services/testingService.js";

async function resetAll(req: Request, res: Response) {
  await testingService.resetAll();

  res.sendStatus(200);
}

export default {
  resetAll,
};
