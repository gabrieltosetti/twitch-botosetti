import "@std/dotenv/load";
// import 'reflect-metadata';
import { container } from 'tsyringe';
import StartTwichServices from './Infrastructure/twitch/StartTwitchServices.ts';
import Utils from './Application/Helpers/Utils.ts';
import ObsClient from './Infrastructure/obs/ObsClient.ts';
import { Router, Application } from '@oak/oak';

/** CLIENTS */
container.registerSingleton<ObsClient>('ObsClientInterface', ObsClient);

const viewsPath = Deno.cwd() + '/Application/views/';
const PORT = parseInt(Deno.env.get("PORT") || "80", 10);

// const app = express();
// const router = express.Router();

// /*
// ================================
// MIDDLEWARES
// ================================
// */

// app.use(express.json());
// app.use(express.static(viewsPath));
// app.use("/", router);

// router.use(function (req, res, next) {
//     console.log("/" + req.method);
//     next();
// });

// /*
// ================================
// ROTAS
// ================================
// */

// router.get("/", function (req, res) {
//     console.log(viewsPath + "index/index.html");
//     res.sendFile(viewsPath + "index/index.html");
// });

// router.get("/stream", function (req, res) {
//     console.log("stream");
//     res.setHeader('Content-Type', 'text/event-stream');

//     Utils.activeResponse = res;
// });

// app.listen(PORT, function () {
//     console.log(`Example app listening on port ${PORT}!`)
// })

const router = new Router();
router
  .get("/", (context) => {
        console.log(viewsPath + "index/index.html");
        context.send({
            root: viewsPath,
            index: "index/index",
        });
  })
  .get("/stream", (context) => {
        if (!context.isUpgradable) context.throw(400, "Request must be upgradable");

        const ws = context.upgrade();
        ws.onopen = () => console.log('Connection established');
        ws.onclose = () => console.log('Connection closed');

        Utils.activeResponse = ws;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: PORT });

container.resolve<ObsClient>("ObsClientInterface").connect();
container.resolve(StartTwichServices).execute();

console.log(`Server running on port ${PORT}`);