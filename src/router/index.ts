import { Router } from "express";
import twitchRouter from "./twitch";

const router = Router();

router.use("/twitch", twitchRouter);

export default router;
