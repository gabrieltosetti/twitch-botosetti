import "@std/dotenv/load";
import container from "./Application/Configs/ioc_config.ts";
import { Router, Application, send } from '@oak/oak';
import { StartTwichServices } from './Infrastructure/twitch/StartTwitchServices.ts';
import { Utils } from './Application/Helpers/Utils.ts';
import type { ObsClientInterface } from "./Domain/Contracts/ObsClientInterface.ts";
import { TYPES } from "./Application/Configs/Types.ts";
import { join } from "node:path";

const PORT = parseInt(Deno.env.get("PORT") || "80", 10);

const router = new Router();
router
  .get("/", async (context) => {
        await context.send({
            root: Utils.viewsPath(),
            index: join("", "index", "index.html"),
        });
  })
  .get("/stream", (context) => {
        const ws = context.upgrade();
        ws.onopen = () => console.log('WebSocket connection open');
        ws.onclose = () => console.log('WebSocket connection closed');

        Utils.currentWebSocket = ws;
  });

const app = new Application();
app.use(async (ctx, next) => {
    if (!ctx.request.url.pathname.endsWith(".css") && !ctx.request.url.pathname.endsWith(".js")) {
      return next();
    }

    const filePath = ctx.request.url.pathname.replace(Utils.viewsPath(), "");
    await send(ctx, filePath, {
      root: Utils.viewsPath(),
    });
  });
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port }) => {
    console.log(`Start listening on ${hostname}:${port}`);
  });

app.listen({ port: PORT });

container.get<ObsClientInterface>(TYPES.ObsClientInterface).connect();
container.get(StartTwichServices).execute();