"use strict";
var RedisStorage = (function () {
    function RedisStorage(client, prefix) {
        this.client = client;
        this.prefix = prefix;
    }
    RedisStorage.prototype.createKey = function (id) {
        return this.prefix ? this.prefix + ":" + id : id;
    };
    RedisStorage.prototype.get = function (id, callback) {
        this.client.get(this.createKey(id), function (err, data) {
            if (data) {
                callback(null, JSON.parse(data));
            }
            else {
                callback(null, null);
            }
        });
    };
    RedisStorage.prototype.save = function (id, data, callback) {
        this.client.set(this.createKey(id), JSON.stringify(data || {}));
        if (callback) {
            callback(null);
        }
    };
    RedisStorage.prototype.delete = function (id, callback) {
        var _this = this;
        var key = this.createKey(id);
        this.client.get(key, function (err, data) {
            if (data) {
                _this.client.del(key);
            }
            if (callback) {
                callback(null);
            }
        });
    };
    return RedisStorage;
}());
module.exports = RedisStorage;
