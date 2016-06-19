/// <reference path="../typings/index.d.ts" />

import redis = require("redis");
import botbuilder = require("botbuilder");

class RedisStorage implements botbuilder.IStorage {

  private client: redis.RedisClient;

  constructor(client: redis.RedisClient) {
    this.client = client;
  }

  public get(id: string, callback: (err: Error, data: any) => void): void {
    this.client.get(id, (err: Error, data: any): void => {
      if (data) {
        callback(null, JSON.parse(data));
      } else {
        callback(null, null);
      }
    });
  }

  public save(id: string, data: any, callback?: (err: Error) => void): void {
    this.client.set(id, JSON.stringify(data || {}));
    if (callback) {
        callback(null);
    }
  }

  public delete(id: string, callback?: (err: Error) => void): void {
    this.client.get(id, (err: Error, data: any): void => {
      if (data) {
        this.client.del(id);
      }
      if (callback) {
          callback(null);
      }
    });
  }

}

export = RedisStorage;
