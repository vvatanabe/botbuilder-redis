import redis = require("redis");
import botbuilder = require("botbuilder");
declare class RedisStorage implements botbuilder.IStorage {
    private client;
    constructor(client: redis.RedisClient, prefix?: string);
    get(id: string, callback: (err: Error, data: any) => void): void;
    save(id: string, data: any, callback?: (err: Error) => void): void;
    delete(id: string, callback?: (err: Error) => void): void;
}
export = RedisStorage;
