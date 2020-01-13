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
import { errorMiddleware, redisMiddleware } from "./server/middlewares";
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
import {latestBlockDetails, Details, GetBlocktime, averageblockdifficulty, network_hashrate} from './server/utils';
config({ path: resolve(__dirname, "../.env") });

// const connectionManager = getConnectionManager();
// const connection = connectionManager.create(dbConfig);

import { join } from "path";
var cron = require('node-cron');

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
import request from 'request-promise';

app.get("/api", redisMiddleware('60'), async (req, res) =>  {
try {
    let option = req.query.q;
    let blockDetails = await latestBlockDetails();
    if(option)
    {
        let result; //500
        if(option == "circulating")
              result= blockDetails.coin_existence - blockDetails.totalFoundationReward;
        else if(option == "reward")
              result= blockDetails.currentReward;
        else if(option == "getblockcount")
              result= blockDetails.block_height;
        else if(option == "getdifficulty-randomx")
              result = Number(blockDetails.TotalDifficultyRandomx);
        else if(option == "getdifficulty-cuckoo")
              result = Number(blockDetails.TotalCuckoo);
        else if(option == "getdifficulty-progpow")
              result = Number(blockDetails.TotalDifficultyProgpow);
        else if(option == "totalcoins")
              result = blockDetails.coin_existence;
        else if(option == "maxcoins")
              result = 21000000;
        else if(option == "average-blocktime")
        {
              let data = await averageblockdifficulty();
              result = Number(data);              
        }
        else if(option == "network-hashrate-cuckoo")
        {
          let data = await network_hashrate(blockDetails.block_height,31,blockDetails.targetdifficultycuckatoo,"Cuckoo");
          result = data;
        }
        else if(option == "network-hashrate-progpow")
        {
          let data = await network_hashrate(blockDetails.block_height,16,blockDetails.targetdifficultyprogpow,"ProgPow");
          result = data;
        }
        else if(option == "network-hashrate-randomx")
        {
          let data = await network_hashrate(blockDetails.block_height,16,blockDetails.targetdifficultyrandomx,"RandomX");
          result = data;
        }
        else if(option == "getblockhash")
        {
              let height = req.query.height;
              if(height) {
                let heighthash = await Details(height);
                if(heighthash[0].hash)
                    result = heighthash[0].hash;
                else
                     result = 'Invalid height';
              } else if(height <0) {
                 result = '"height" parameter missing or invalid';
              } else {
                 result = '"height" parameter missing or invalid';
              }
              
        }
        else if(option == "getblockheight")
        {
              let hash = req.query.hash;
              if(hash) {
                let heighthash = await Details(hash);
                if(heighthash[0].height)
                    result = heighthash[0].height;
                else
                    result = 'Invalid hash';
              } else {
                 result = '"hash" parameter missing or invalid';
              }
              
        }

        else if(option == "getblocktime"){
          let height = req.query.height;
          if(height) {
            let blockTime = await GetBlocktime(height);
            if(blockTime[0].alter)
                result = blockTime[0].alter;
            else
                 result = 'Invalid height';
          } else if(height < 0) {
             result = '"height" parameter missing or invalid';
          } else {
             result = '"height" parameter missing or invalid';
          }
        }
        else if(option == "info")
        {
          result = { 
          "Name": "Epic Cash",
          "Symbol": "EPIC", 
          "TotalSupply": 21000000, 
          "CurrentSupply": blockDetails.coin_existence,
          "MinerCurrentBlockReward": blockDetails.userReward,
          "Algorithms": "Cuckoo, RandomX, ProgPow",
          "Target_Difficulty": {
            "Cuckoo": blockDetails.targetdifficultycuckaroo + blockDetails.targetdifficultycuckatoo, 
            "RandomX": blockDetails.targetdifficultyrandomx, 
            "ProgPow": blockDetails.targetdifficultyprogpow 
          },
          "Total_Difficulty": { 
            "Cuckoo": blockDetails.TotalCuckoo,
            "RandomX": blockDetails.TotalDifficultyRandomx, 
            "ProgPow": blockDetails.TotalDifficultyProgpow 
          },
          "BlockHeight": blockDetails.block_height,
          "Blockchain": "MimbleWimble",
          "Homepage": "https://epic.tech",
          "Explorer": "https://explorer.epic.tech",
          "API": "https://explorer.epic.tech/api",
          "Logo": "https://explorer.epic.tech/assets/img/logo.png",
          "ICO": "NO",
          "Premine": "NO",
          "Mainnet": "YES",
          "Genesis": "09-03-2019, 02:09:00 UTC",
          "BlockInterval": 60,
          "GIT": "https://gitlab.com/epiccash",
          "Whitepaper":"https://epic.tech/whitepaper",
          "Colors": { "off-white": "#f3f4f2", "off-black": "#222223", "gold" :"#bf9b30" }
          };
        }
          else
              result= "Invalid Option";

          var type = typeof result;
          
          if (type == "object") {
            res.status(200).json({...result});
          }
          else {
            res.status(200).json(result);
          }
     }
     else
     {
           //let result= 5;
           res.redirect('/api-index');
     }

}
catch(err){
    res.status(500).send("Internal Server Error");
}

  });



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

   // cron.schedule('*/30 * * * * *', () => {
     // universalGetLatestBlockDetails('Testnet');
    // });
    var interval;
    const io = require("socket.io").listen(server);
    io.sockets.on("connection", socket => {
      // if (interval) {
      //   clearInterval(interval);
      // }
      //console.log(socket.handshake.query.network);
      //var network = "Testnet";
    let key =  process.env.REDIS_KEY + socket.handshake.query.network + 'Latest_Block_details'
    interval = setInterval(function() {
      Global.client.get(key, function(err, reply){
      //  socket.emit("latestblockdetail", JSON.parse(reply) ); 
      });    
    },10000);
    //socket.on("disconnect", () => console.log("Client disconnected"));
    });
  })
  .catch(error => {
    console.log("connection failed..", error);
  });
