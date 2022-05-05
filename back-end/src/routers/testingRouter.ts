import { Router } from "express";
import testingController from "../controllers/testingController";

const testingRouter = Router();

testingRouter.post("/resetDB", testingController.resetAll);

export default testingRouter;
