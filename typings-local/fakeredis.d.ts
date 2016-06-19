declare module 'fakeredis' {
  var redis: redis.RedisStatic;

  namespace redis {
    interface ClientOpts {
      parser?: string;
      return_buffers?: boolean;
      detect_buffers?: boolean;
      socket_nodelay?: boolean;
      socket_keepalive?: boolean;
      no_ready_check?: boolean;
      enable_offline_queue?: boolean;
      retry_max_delay?: number;
      connect_timeout?: number;
      max_attempts?: number;
      auth_pass?: string;
      password?: string;
      family?: string;
      command_queue_high_water?: number;
      command_queue_low_water?: number;
    }

    interface ResCallbackT<R> {
      (err: Error, res: R): void;
    }

    interface ServerInfo {
      redis_version: string;
      versions: number[];
    }

    interface CommandT<R> { //This is a placeholder to be used eventually, to not have to define each command twice, or four times if all caps versions are to be implemented.
      (args: any[], callback?: redis.ResCallbackT<R>): void;
      (...args: any[]): void;
    }

    interface MessageHandler<M> {
      (channel: string, message: M): void;
    }

    interface RedisClient extends NodeJS.EventEmitter {
      // event: connect
      // event: error
      // event: message
      // event: pmessage
      // event: subscribe
      // event: psubscribe
      // event: unsubscribe
      // event: punsubscribe

      connected: boolean;
      retry_delay: number;
      retry_backoff: number;
      command_queue: any[];
      offline_queue: any[];
      server_info: redis.ServerInfo;

      end(): void;
      unref(): void;

      // Low level command execution
      send_command(command: string, ...args: any[]): boolean;

      // Connection (http://redis.io/commands#connection)
      auth(password: string, callback?: redis.ResCallbackT<any>): boolean;
      ping(callback?: redis.ResCallbackT<number>): boolean;

      // Strings (http://redis.io/commands#strings)
      append(key: string, value: string, callback?: redis.ResCallbackT<number>): boolean;
      bitcount(key: string, callback?: redis.ResCallbackT<number>): boolean;
      bitcount(key: string, start: number, end: number, callback?: redis.ResCallbackT<number>): boolean;
      set(key: string, value: string, callback?: redis.ResCallbackT<string>): boolean;
      get(key: string, callback?: redis.ResCallbackT<string>): boolean;
      exists(key: string, value: string, callback?: redis.ResCallbackT<number>): boolean;

      publish(channel: string, value: any): boolean;
      subscribe(channel: string): boolean;

      /*
      commands = set_union([
      "get", "set", "setnx", "setex", "append", "strlen", "del", "exists", "setbit", "getbit", "setrange", "getrange", "substr",
      "incr", "decr", "mget", "rpush", "lpush", "rpushx", "lpushx", "linsert", "rpop", "lpop", "brpop", "brpoplpush", "blpop", "llen", "lindex",
      "lset", "lrange", "ltrim", "lrem", "rpoplpush", "sadd", "srem", "smove", "sismember", "scard", "spop", "srandmember", "sinter", "sinterstore",
      "sunion", "sunionstore", "sdiff", "sdiffstore", "smembers", "zadd", "zincrby", "zrem", "zremrangebyscore", "zremrangebyrank", "zunionstore",
      "zinterstore", "zrange", "zrangebyscore", "zrevrangebyscore", "zcount", "zrevrange", "zcard", "zscore", "zrank", "zrevrank", "hset", "hsetnx",
      "hget", "hmset", "hmget", "hincrby", "hdel", "hlen", "hkeys", "hvals", "hgetall", "hexists", "incrby", "decrby", "getset", "mset", "msetnx",
      "randomkey", "select", "move", "rename", "renamenx", "expire", "expireat", "keys", "dbsize", "auth", "ping", "echo", "save", "bgsave",
      "bgrewriteaof", "shutdown", "lastsave", "type", "multi", "exec", "discard", "sync", "flushdb", "flushall", "sort", "info", "monitor", "ttl",
      "persist", "slaveof", "debug", "config", "subscribe", "unsubscribe", "psubscribe", "punsubscribe", "publish", "watch", "unwatch", "cluster",
      "restore", "migrate", "dump", "object", "client", "eval", "evalsha"], require("./lib/commands"));
      */

      get(args: any[], callback?: redis.ResCallbackT<string>): boolean;
      get(...args: any[]): boolean;
      set(args: any[], callback?: redis.ResCallbackT<string>): boolean;
      set(...args: any[]): boolean;
      setnx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      setnx(...args: any[]): boolean;
      setex(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      setex(...args: any[]): boolean;
      append(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      append(...args: any[]): boolean;
      strlen(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      strlen(...args: any[]): boolean;
      del(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      del(...args: any[]): boolean;
      exists(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      exists(...args: any[]): boolean;
      setbit(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      setbit(...args: any[]): boolean;
      getbit(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      getbit(...args: any[]): boolean;
      setrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      setrange(...args: any[]): boolean;
      getrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      getrange(...args: any[]): boolean;
      substr(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      substr(...args: any[]): boolean;
      incr(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      incr(...args: any[]): boolean;
      decr(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      decr(...args: any[]): boolean;
      mget(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      mget(...args: any[]): boolean;
      rpush(...args: any[]): boolean;
      lpush(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      lpush(...args: any[]): boolean;
      rpushx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      rpushx(...args: any[]): boolean;
      lpushx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      lpushx(...args: any[]): boolean;
      linsert(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      linsert(...args: any[]): boolean;
      rpop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      rpop(...args: any[]): boolean;
      lpop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      lpop(...args: any[]): boolean;
      brpop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      brpop(...args: any[]): boolean;
      brpoplpush(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      brpoplpush(...args: any[]): boolean;
      blpop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      blpop(...args: any[]): boolean;
      llen(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      llen(...args: any[]): boolean;
      lindex(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      lindex(...args: any[]): boolean;
      lset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      lset(...args: any[]): boolean;
      lrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      lrange(...args: any[]): boolean;
      ltrim(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      ltrim(...args: any[]): boolean;
      lrem(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      lrem(...args: any[]): boolean;
      rpoplpush(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      rpoplpush(...args: any[]): boolean;
      sadd(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sadd(...args: any[]): boolean;
      srem(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      srem(...args: any[]): boolean;
      smove(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      smove(...args: any[]): boolean;
      sismember(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sismember(...args: any[]): boolean;
      scard(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      scard(...args: any[]): boolean;
      spop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      spop(...args: any[]): boolean;
      srandmember(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      srandmember(...args: any[]): boolean;
      sinter(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sinter(...args: any[]): boolean;
      sinterstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sinterstore(...args: any[]): boolean;
      sunion(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sunion(...args: any[]): boolean;
      sunionstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sunionstore(...args: any[]): boolean;
      sdiff(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sdiff(...args: any[]): boolean;
      sdiffstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sdiffstore(...args: any[]): boolean;
      smembers(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      smembers(...args: any[]): boolean;
      zadd(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zadd(...args: any[]): boolean;
      zincrby(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zincrby(...args: any[]): boolean;
      zrem(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zrem(...args: any[]): boolean;
      zremrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zremrangebyscore(...args: any[]): boolean;
      zremrangebyrank(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zremrangebyrank(...args: any[]): boolean;
      zunionstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zunionstore(...args: any[]): boolean;
      zinterstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zinterstore(...args: any[]): boolean;
      zrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zrange(...args: any[]): boolean;
      zrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zrangebyscore(...args: any[]): boolean;
      zrevrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zrevrangebyscore(...args: any[]): boolean;
      zcount(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zcount(...args: any[]): boolean;
      zrevrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zrevrange(...args: any[]): boolean;
      zcard(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zcard(...args: any[]): boolean;
      zscore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zscore(...args: any[]): boolean;
      zrank(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zrank(...args: any[]): boolean;
      zrevrank(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zrevrank(...args: any[]): boolean;
      hset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hset(...args: any[]): boolean;
      hsetnx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hsetnx(...args: any[]): boolean;
      hget(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hget(...args: any[]): boolean;
      hmset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hmset(key: string, hash: any, callback?: redis.ResCallbackT<any>): boolean;
      hmset(...args: any[]): boolean;
      hmget(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hmget(...args: any[]): boolean;
      hincrby(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hincrby(...args: any[]): boolean;
      hdel(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hdel(...args: any[]): boolean;
      hlen(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hlen(...args: any[]): boolean;
      hkeys(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hkeys(...args: any[]): boolean;
      hvals(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hvals(...args: any[]): boolean;
      hgetall(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hgetall(...args: any[]): boolean;
      hgetall(key: string, callback?: redis.ResCallbackT<any>): boolean;
      hexists(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hexists(...args: any[]): boolean;
      incrby(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      incrby(...args: any[]): boolean;
      decrby(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      decrby(...args: any[]): boolean;
      getset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      getset(...args: any[]): boolean;
      mset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      mset(...args: any[]): boolean;
      msetnx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      msetnx(...args: any[]): boolean;
      randomkey(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      randomkey(...args: any[]): boolean;
      select(args: any[], callback?: redis.ResCallbackT<any>): void;
      select(...args: any[]): void;
      move(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      move(...args: any[]): boolean;
      rename(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      rename(...args: any[]): boolean;
      renamenx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      renamenx(...args: any[]): boolean;
      expire(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      expire(...args: any[]): boolean;
      expireat(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      expireat(...args: any[]): boolean;
      keys(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      keys(...args: any[]): boolean;
      dbsize(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      dbsize(...args: any[]): boolean;
      auth(args: any[], callback?: redis.ResCallbackT<any>): void;
      auth(...args: any[]): void;
      ping(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      ping(...args: any[]): boolean;
      echo(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      echo(...args: any[]): boolean;
      save(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      save(...args: any[]): boolean;
      bgsave(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      bgsave(...args: any[]): boolean;
      bgrewriteaof(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      bgrewriteaof(...args: any[]): boolean;
      shutdown(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      shutdown(...args: any[]): boolean;
      lastsave(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      lastsave(...args: any[]): boolean;
      type(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      type(...args: any[]): boolean;
      multi(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      multi(...args: any[]): Multi;
      exec(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      exec(...args: any[]): boolean;
      discard(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      discard(...args: any[]): boolean;
      sync(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sync(...args: any[]): boolean;
      flushdb(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      flushdb(...args: any[]): boolean;
      flushall(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      flushall(...args: any[]): boolean;
      sort(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      sort(...args: any[]): boolean;
      info(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      info(...args: any[]): boolean;
      monitor(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      monitor(...args: any[]): boolean;
      ttl(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      ttl(...args: any[]): boolean;
      persist(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      persist(...args: any[]): boolean;
      slaveof(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      slaveof(...args: any[]): boolean;
      debug(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      debug(...args: any[]): boolean;
      config(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      config(...args: any[]): boolean;
      subscribe(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      subscribe(...args: any[]): boolean;
      unsubscribe(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      unsubscribe(...args: any[]): boolean;
      psubscribe(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      psubscribe(...args: any[]): boolean;
      punsubscribe(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      punsubscribe(...args: any[]): boolean;
      publish(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      publish(...args: any[]): boolean;
      watch(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      watch(...args: any[]): boolean;
      unwatch(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      unwatch(...args: any[]): boolean;
      cluster(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      cluster(...args: any[]): boolean;
      restore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      restore(...args: any[]): boolean;
      migrate(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      migrate(...args: any[]): boolean;
      dump(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      dump(...args: any[]): boolean;
      object(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      object(...args: any[]): boolean;
      client(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      client(...args: any[]): boolean;
      eval(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      eval(...args: any[]): boolean;
      evalsha(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      evalsha(...args: any[]): boolean;
      script(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      script(...args: any[]): boolean;
      script(key: string, callback?: redis.ResCallbackT<any>): boolean;
      quit(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      quit(...args: any[]): boolean;
      scan(...args: any[]): boolean;
      scan(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      hscan(...args: any[]): boolean;
      hscan(args: any[], callback?: redis.ResCallbackT<any>): boolean;
      zscan(...args: any[]): boolean;
      zscan(args: any[], callback?: redis.ResCallbackT<any>): boolean;
    }






    interface Multi {
      exec(callback?: redis.ResCallbackT<any[]>): boolean;

      get(args: any[], callback?: redis.ResCallbackT<string>): Multi;
      get(...args: any[]): Multi;
      set(args: any[], callback?: redis.ResCallbackT<string>): Multi;
      set(...args: any[]): Multi;
      setnx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      setnx(...args: any[]): Multi;
      setex(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      setex(...args: any[]): Multi;
      append(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      append(...args: any[]): Multi;
      strlen(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      strlen(...args: any[]): Multi;
      del(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      del(...args: any[]): Multi;
      exists(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      exists(...args: any[]): Multi;
      setbit(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      setbit(...args: any[]): Multi;
      getbit(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      getbit(...args: any[]): Multi;
      setrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      setrange(...args: any[]): Multi;
      getrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      getrange(...args: any[]): Multi;
      substr(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      substr(...args: any[]): Multi;
      incr(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      incr(...args: any[]): Multi;
      decr(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      decr(...args: any[]): Multi;
      mget(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      mget(...args: any[]): Multi;
      rpush(...args: any[]): Multi;
      lpush(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      lpush(...args: any[]): Multi;
      rpushx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      rpushx(...args: any[]): Multi;
      lpushx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      lpushx(...args: any[]): Multi;
      linsert(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      linsert(...args: any[]): Multi;
      rpop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      rpop(...args: any[]): Multi;
      lpop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      lpop(...args: any[]): Multi;
      brpop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      brpop(...args: any[]): Multi;
      brpoplpush(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      brpoplpush(...args: any[]): Multi;
      blpop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      blpop(...args: any[]): Multi;
      llen(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      llen(...args: any[]): Multi;
      lindex(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      lindex(...args: any[]): Multi;
      lset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      lset(...args: any[]): Multi;
      lrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      lrange(...args: any[]): Multi;
      ltrim(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      ltrim(...args: any[]): Multi;
      lrem(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      lrem(...args: any[]): Multi;
      rpoplpush(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      rpoplpush(...args: any[]): Multi;
      sadd(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sadd(...args: any[]): Multi;
      srem(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      srem(...args: any[]): Multi;
      smove(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      smove(...args: any[]): Multi;
      sismember(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sismember(...args: any[]): Multi;
      scard(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      scard(...args: any[]): Multi;
      spop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      spop(...args: any[]): Multi;
      srandmember(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      srandmember(...args: any[]): Multi;
      sinter(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sinter(...args: any[]): Multi;
      sinterstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sinterstore(...args: any[]): Multi;
      sunion(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sunion(...args: any[]): Multi;
      sunionstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sunionstore(...args: any[]): Multi;
      sdiff(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sdiff(...args: any[]): Multi;
      sdiffstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sdiffstore(...args: any[]): Multi;
      smembers(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      smembers(...args: any[]): Multi;
      zadd(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zadd(...args: any[]): Multi;
      zincrby(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zincrby(...args: any[]): Multi;
      zrem(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zrem(...args: any[]): Multi;
      zremrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zremrangebyscore(...args: any[]): Multi;
      zremrangebyrank(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zremrangebyrank(...args: any[]): Multi;
      zunionstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zunionstore(...args: any[]): Multi;
      zinterstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zinterstore(...args: any[]): Multi;
      zrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zrange(...args: any[]): Multi;
      zrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zrangebyscore(...args: any[]): Multi;
      zrevrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zrevrangebyscore(...args: any[]): Multi;
      zcount(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zcount(...args: any[]): Multi;
      zrevrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zrevrange(...args: any[]): Multi;
      zcard(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zcard(...args: any[]): Multi;
      zscore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zscore(...args: any[]): Multi;
      zrank(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zrank(...args: any[]): Multi;
      zrevrank(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zrevrank(...args: any[]): Multi;
      hset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hset(...args: any[]): Multi;
      hsetnx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hsetnx(...args: any[]): Multi;
      hget(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hget(...args: any[]): Multi;
      hmset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hmset(key: string, hash: any, callback?: redis.ResCallbackT<any>): Multi;
      hmset(...args: any[]): Multi;
      hmget(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hmget(...args: any[]): Multi;
      hincrby(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hincrby(...args: any[]): Multi;
      hdel(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hdel(...args: any[]): Multi;
      hlen(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hlen(...args: any[]): Multi;
      hkeys(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hkeys(...args: any[]): Multi;
      hvals(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hvals(...args: any[]): Multi;
      hgetall(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hgetall(...args: any[]): Multi;
      hgetall(key: string, callback?: redis.ResCallbackT<any>): Multi;
      hexists(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hexists(...args: any[]): Multi;
      incrby(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      incrby(...args: any[]): Multi;
      decrby(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      decrby(...args: any[]): Multi;
      getset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      getset(...args: any[]): Multi;
      mset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      mset(...args: any[]): Multi;
      msetnx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      msetnx(...args: any[]): Multi;
      randomkey(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      randomkey(...args: any[]): Multi;
      select(args: any[], callback?: redis.ResCallbackT<any>): void;
      select(...args: any[]): Multi;
      move(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      move(...args: any[]): Multi;
      rename(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      rename(...args: any[]): Multi;
      renamenx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      renamenx(...args: any[]): Multi;
      expire(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      expire(...args: any[]): Multi;
      expireat(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      expireat(...args: any[]): Multi;
      keys(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      keys(...args: any[]): Multi;
      dbsize(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      dbsize(...args: any[]): Multi;
      auth(args: any[], callback?: redis.ResCallbackT<any>): void;
      auth(...args: any[]): void;
      ping(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      ping(...args: any[]): Multi;
      echo(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      echo(...args: any[]): Multi;
      save(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      save(...args: any[]): Multi;
      bgsave(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      bgsave(...args: any[]): Multi;
      bgrewriteaof(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      bgrewriteaof(...args: any[]): Multi;
      shutdown(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      shutdown(...args: any[]): Multi;
      lastsave(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      lastsave(...args: any[]): Multi;
      type(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      type(...args: any[]): Multi;
      multi(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      multi(...args: any[]): Multi;
      exec(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      exec(...args: any[]): Multi;
      discard(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      discard(...args: any[]): Multi;
      sync(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sync(...args: any[]): Multi;
      flushdb(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      flushdb(...args: any[]): Multi;
      flushall(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      flushall(...args: any[]): Multi;
      sort(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      sort(...args: any[]): Multi;
      info(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      info(...args: any[]): Multi;
      monitor(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      monitor(...args: any[]): Multi;
      ttl(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      ttl(...args: any[]): Multi;
      persist(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      persist(...args: any[]): Multi;
      slaveof(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      slaveof(...args: any[]): Multi;
      debug(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      debug(...args: any[]): Multi;
      config(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      config(...args: any[]): Multi;
      subscribe(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      subscribe(...args: any[]): Multi;
      unsubscribe(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      unsubscribe(...args: any[]): Multi;
      psubscribe(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      psubscribe(...args: any[]): Multi;
      punsubscribe(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      punsubscribe(...args: any[]): Multi;
      publish(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      publish(...args: any[]): Multi;
      watch(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      watch(...args: any[]): Multi;
      unwatch(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      unwatch(...args: any[]): Multi;
      cluster(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      cluster(...args: any[]): Multi;
      restore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      restore(...args: any[]): Multi;
      migrate(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      migrate(...args: any[]): Multi;
      dump(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      dump(...args: any[]): Multi;
      object(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      object(...args: any[]): Multi;
      client(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      client(...args: any[]): Multi;
      eval(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      eval(...args: any[]): Multi;
      evalsha(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      evalsha(...args: any[]): Multi;
      quit(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      quit(...args: any[]): Multi;
      scan(...args: any[]): Multi;
      scan(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      hscan(...args: any[]): Multi;
      hscan(args: any[], callback?: redis.ResCallbackT<any>): Multi;
      zscan(...args: any[]): Multi;
      zscan(args: any[], callback?: redis.ResCallbackT<any>): Multi;
    }

    interface RedisStatic {
      debug_mode: boolean;

      createClient(port_arg: number, host_arg?: string, options?: redis.ClientOpts): RedisClient;
      createClient(unix_socket: string, options?: redis.ClientOpts): RedisClient;
      createClient(options?: redis.ClientOpts): RedisClient;

      print(err: Error, reply: any): void;
    }
  }

  export = redis;
}
