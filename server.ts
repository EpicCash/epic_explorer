import "zone.js/dist/zone-node";
import "reflect-metadata";
const domino = require("domino");
const fs = require("fs");
const path = require("path");
const template = fs
  .readFileSync(path.join(__dirname, ".", "browser", "index.html"))
  .toString();
const win = domino.createWindow(template);
// const styleFiles = files.filter(file => file.startsWith('styles'));
// const hashStyle = styleFiles[0].split('.')[1];
// const style = fs.readFileSync(path.join(__dirname, '.', 'dist-server', `styles.${hashStyle}.bundle.css`)).toString();

global["window"] = win;
Object.defineProperty(win.document.body.style, "transform", {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
global["document"] = win.document;
// global["CSS"] = win;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
// global["Prism"] = null;

import { enableProdMode } from "@angular/core";

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
  getConnectionManager
} from "typeorm";
import { resolve } from "path";
import {
  BlockchainBlockController,
  BlockchainInputController,
  BlockchainKernelController,
  BlockchainOutputController
} from "./server/controllers";
import { dbConfig } from "./server/ormconfig";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

const connectionManager = getConnectionManager();
const connection = connectionManager.create(dbConfig);

import { join } from "path";

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), "dist");

const controllers = [
  new BlockchainBlockController(),
  new BlockchainInputController(),
  new BlockchainKernelController(),
  new BlockchainOutputController()
];

app.use(errorMiddleware);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs/**", express.static(path.join(__dirname, "./server/swagger")));
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
 app.get('/epic_explorer/v1/**', (req, res) => { res.send({'msg':'Api works.'})});


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

app.set("view engine", "html");
app.set("views", join(DIST_FOLDER, "browser"));


// Server static files from /browser
app.get(
  "*.*",
  express.static(join(DIST_FOLDER, "browser"), {
    maxAge: "1y"
  })
);

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render("index", { req });
});

// Start up the Node server

connection
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Node Express server listening on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.log("connection failed..", error);
  });
