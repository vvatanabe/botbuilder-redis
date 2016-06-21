/// <reference path="../typings/index.d.ts" />

import redis = require("redis");
import botbuilder = require("botbuilder");

class RedisStorage implements botbuilder.IStorage {

  private client: redis.RedisClient;
  private prefix: string;

  constructor(client: redis.RedisClient, prefix?: string) {
    this.client = client;
    this.prefix = prefix;
  }

  public createKey(id: string): string {
    return this.prefix ? `${this.prefix}:${id}` : id;
  }

  public get(id: string, callback: (err: Error, data: any) => void): void {
    this.client.get(this.createKey(id), (err: Error, data: any): void => {
      if (data) {
        callback(null, JSON.parse(data));
      } else {
        callback(null, null);
      }
    });
  }

  public save(id: string, data: any, callback?: (err: Error) => void): void {
    this.client.set(this.createKey(id), JSON.stringify(data || {}));
    if (callback) {
        callback(null);
    }
  }

  public delete(id: string, callback?: (err: Error) => void): void {
    const key = this.createKey(id);
    this.client.get(key, (err: Error, data: any): void => {
      if (data) {
        this.client.del(key);
      }
      if (callback) {
          callback(null);
      }
    });
  }

}

export = RedisStorage;
