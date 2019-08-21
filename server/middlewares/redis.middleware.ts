import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/index';
import * as redis from 'redis';
import { Global } from "../global";
import { Duration } from 'moment';

// connect to Redis
// const REDIS_URL = process.env.REDIS_URL;
// const client = redis.createClient(REDIS_URL);

Global.client.on('connect', () => {
    console.log(`connected to redis`);
});
Global.client.on('error', err => {
    console.log(`Error: ${err}`);
});

export function redisMiddleware(
    duration: any,
  ) {
    return (request, response, next) => {
        //console.log(request.originalUrl);
   // Global.network = request.headers.network;
        let key =  process.env.REDIS_KEY + Global.network + request.originalUrl || request.url
        Global.client.get(key, function(err, reply){  
            if(reply && duration!=0){
                //console.log("key : ", key);
                //console.log("reply : ", reply);
                //console.log("---------------------------------------------------------------------------------------");
                //console.log(`enabled`);
                response.send(JSON.parse(reply));
            }else{
                //console.log(`raw`);
                response.sendResponse = response.send;
                response.send = (body) => {
                    Global.client.set(key, JSON.stringify(body), 'EX', duration, function(err){
                    //client.set(key, JSON.stringify(body));
                    response.sendResponse(body);
                    });
                }
                next();
            }
        });
    }
}