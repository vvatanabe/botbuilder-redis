declare module 'botbuilder-redis' {
  import * as redis from 'redis';
  import * as botbuilder from 'botbuilder';
  export default class RedisStorage implements botbuilder.IStorage {
    private client: redis.RedisClient;
    constructor(client: redis.RedisClient, prefix?: string);
    get(id: string, callback: (err: Error, data: any) => void): void;
    save(id: string, data: any, callback?: (err: Error) => void): void;
    delete(id: string, callback?: (err: Error) => void): void;
  }
}
