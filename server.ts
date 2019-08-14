import "zone.js/dist/zone-node";
import "reflect-metadata";
const fs = require("fs");
const path = require("path");
const template = fs
  .readFileSync(path.join(__dirname, ".", "browser", "index.html"))
  .toString();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(template);
global["window"] = window;
Object.defineProperty(window.document.body.style, "transform", {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
global["document"] = window.document;

import { enableProdMode } from "@angular/core";
import { Global } from "./server/global";

// Express Engine
import { ngExpressEngine } from "@nguniversal/express-engine";
// Import module map for lazy loading
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

import express from "express";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
//import { logger } from "./server/utils";
import swaggerJSDoc from "swagger-jsdoc";
import { errorMiddleware } from "./server/middlewares";
import {
  getRepository,
  In,
  getConnection,
  getConnectionManager,
  createConnections
} from "typeorm";
import { resolve } from "path";
import {
  BlockchainBlockController,
  BlockchainInputController,
  BlockchainKernelController,
  BlockchainOutputController
} from "./server/controllers";
import {
BlockchainBlock,
BlockchainInput,
BlockchainKernel,
BlockchainOutput
} from "./server/entities";
import { universalGetLatestBlockDetails } from "./server/socket";
import { dbConfig } from "./server/ormconfig";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

// const connectionManager = getConnectionManager();
// const connection = connectionManager.create(dbConfig);

import { join } from "path";

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), "live");

const controllers = [
  new BlockchainBlockController(),
  new BlockchainInputController(),
  new BlockchainKernelController(),
  new BlockchainOutputController()
];

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Authtoken,cookie_id');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
     return res.status(200).end();
  }
  else {
    next();
  }
}
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  "/api-docs/**",
  express.static(path.join(__dirname, "./server/swagger"))
);
app.get("/swagger.json", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(
    swaggerJSDoc({
      swaggerDefinition: require("./swagger/swagger.json"),
      apis: ["**/*.ts"]
    })
  );
});

controllers.forEach(controller => {
  app.use("/epic_explorer/v1", controller.router);
});
// Example Express Rest API endpoints
app.get("/epic_explorer/v1/**", (req, res) => {
  res.send({ msg: "Api works." });
});
app.use(errorMiddleware);

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require("./server/main");

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set("views", join(DIST_FOLDER, "browser"));
app.set("view engine", "html");
// Server static files from /browser
app.get(
  "*.*",
  express.static(join(DIST_FOLDER, "browser"), {
    maxAge: "1y"
  })
);

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.sendFile(join(DIST_FOLDER, "browser") + "/index.html", { req });
});

// Start up the Node server
console.log(__dirname);
// connection
//   .connect()
//   .then(() => {
  createConnections([ {
    name: 'Floonet',
    type: 'postgres',
    host: process.env.FLOONET_DB_HOST,
    port: Number(process.env.FLOONET_DB_PORT),
    username: process.env.FLOONET_DB_USERNAME,
    password: process.env.FLOONET_DB_PASSWORD,
    database: process.env.FLOONET_DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [BlockchainBlock,
      BlockchainInput,
      BlockchainKernel,
      BlockchainOutput],
  }, {
    name: 'Testnet',
    type: 'postgres',
    host: process.env.TESTNET_DB_HOST,
    port: Number(process.env.TESTNET_DB_PORT),
    username: process.env.TESTNET_DB_USERNAME,
    password: process.env.TESTNET_DB_PASSWORD,
    database: process.env.TESTNET_DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [BlockchainBlock,
      BlockchainInput,
      BlockchainKernel,
      BlockchainOutput],
  }]).then(async () => {

    const server = app.listen(PORT, () => {
      console.log(`Node Express server listening on http://localhost:${PORT}`);
    });
    const io = require("socket.io").listen(server);
    io.sockets.on("connection", socket => {
    //   setInterval(function() {
    //   universalGetLatestBlockDetails(socket);
    // },1000);
    });
  })
  .catch(error => {
    console.log("connection failed..", error);
  });
