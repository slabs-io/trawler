var request = require('request');
var Q = require('q');


exports.getData = function(settings){
    var deferred = Q.defer();
    
    if(!settings.settingId){
        deferred.resolve([]);
        return;
    }
    
    request({
        method: 'GET',
        url: 'http://services.slabs.io/slab/trawler/' + settings.settingId
    }, function(err, response, body){
        if(err){
            deferred.reject(err);
            return;
        }
        
        deferred.resolve(body);
    });
    
    return deferred.promise;
};