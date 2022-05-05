import { Router } from "express";
import testingController from "../controllers/testingController.js";

const testingRouter = Router();

testingRouter.post("/resetDatabase", testingController.resetAll);

export default testingRouter;
