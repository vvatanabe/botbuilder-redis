"use strict";
var RedisStorage = (function () {
    function RedisStorage(client) {
        this.client = client;
    }
    RedisStorage.prototype.get = function (id, callback) {
        this.client.get(id, function (err, data) {
            if (data) {
                callback(null, JSON.parse(data));
            }
            else {
                callback(null, null);
            }
        });
    };
    RedisStorage.prototype.save = function (id, data, callback) {
        this.client.set(id, JSON.stringify(data || {}));
        if (callback) {
            callback(null);
        }
    };
    RedisStorage.prototype.delete = function (id, callback) {
        var _this = this;
        this.client.get(id, function (err, data) {
            if (data) {
                _this.client.del(id);
            }
            if (callback) {
                callback(null);
            }
        });
    };
    return RedisStorage;
}());
module.exports = RedisStorage;