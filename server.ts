import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import * as path from 'path';
import { logger } from './server/app/utils';
import expressStaticGzip from 'express-static-gzip';
import swaggerJSDoc from 'swagger-jsdoc';
import { errorMiddleware } from './server/app/middlewares';
import { getRepository, In, getConnection, getConnectionManager } from 'typeorm';
var moment = require('moment');
import { resolve } from 'path';
import { dbConfig } from './server/app/ormconfig';
import { config } from 'dotenv';
// import {
//   BlockchainBlockController,
//   BlockchainInputController,
//   BlockchainKernelController,
//   BlockchainOutputController,
// } from './server/app/controllers';

import { BlockchainBlockController } from './server/app/controllers/BlockchainBlock';

import {join} from 'path';

// var controllers =
//   [
//     new BlockchainBlockController(),
//     new BlockchainInputController(),
//     new BlockchainKernelController(),
//     new BlockchainOutputController(),
//   ];
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create(dbConfig);

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
let controllerblockchain = new BlockchainBlockController();
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', express.static(path.join(__dirname, 'swagger')));
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(
    swaggerJSDoc({
      swaggerDefinition: require('./server/app/swagger/swagger.json'),
      apis: ['**/*.ts'],
    }),
  );
});
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
 app.get('/api/test/ok', (req, res) => {
 res.status(200).json({
     status: 200,
     message: 'perifsdfsfod of blocks generation per second fetched Successfully',
   });
 });

//  controllers.forEach(controller => {
//    app.use('/epic_explorer/v1', controller.router);
//  });


// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
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
  console.log('connection failed..', error);
});
