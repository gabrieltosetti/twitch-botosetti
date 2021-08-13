import cors from "cors";
import "dotenv/config";
import express from "express";
import router from "./router";

const app = express();

const PORT = 4000;

app.use(cors());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
