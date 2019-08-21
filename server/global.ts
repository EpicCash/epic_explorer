import * as redis from 'redis';
var REDIS_URL = process.env.REDIS_URL;
export namespace Global {
    export var network: string = 'Floonet';
    // connect to Redis
    export var client = redis.createClient(REDIS_URL);
}