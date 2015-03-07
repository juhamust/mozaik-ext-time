var request = require('superagent');
var Promise = require('bluebird');
var cache   = require('memory-cache');
var format  = require('string-template');
require('superagent-bluebird-promise');

/**
 * @param {Mozaik} context
 */
var client = function (context) {
    context.logger.info('Create client');

    return {
        // Fetch sunset and coordinate info
        info: function (params) {
            context.logger.info('info client');
            console.log('== INFO ', params);

            var cacheKey = format('time.info.{timezone}', params);
            if (cache.get(cacheKey) !== null) {
                return new Promise(function (resolve) {
                    resolve(cache.get(cacheKey));
                });
            }

            return request.get('http://api.openweathermap.org/data/2.5/weather?q=' + params.city)
                .promise()
                .then(function (res) {
                    // Check if response seem valid
                    if (!res.body.sys) {
                        context.logger.warn('Failed to find location info');
                        return res.body
                    }
                    // Cache the response for 12h hours
                    cache.put(cacheKey, res.body, 43200000);
                    return res.body;
                });
        }
    };
};

module.exports = client;