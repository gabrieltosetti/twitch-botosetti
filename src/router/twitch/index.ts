import { Router } from "express";
import listenController from "./listen";

import "./_chat";

const twitchRouter = Router();

twitchRouter.get("/listen", listenController);

export default twitchRouter;
