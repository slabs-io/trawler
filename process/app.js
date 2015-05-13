var trawler = require('./trawler.js');
var Q = require('q');
var mongoose = require('mongoose');
var SlabConfigSetting = mongoose.model('SlabConfigSetting');


// start process
exports.start = function(config){
    var deferred = Q.defer();
    
    // clear db
    
    trawler.beginTrawl({
        url: config.url
    }).progress(function(item){
        
        // var saveObject = {
        //     network_id:config.networkId,
        //     slab_guid:config.slabConfigId,
        //     setting:{
        //          data : [ ] 
        //          running: true
        //      }
        // };
        
        // new SlabConfigSetting(saveObject).save();
    }).then(function(){
       // running false 
    });
    
    return deferred.promise;
};

// stop process
exports.stop = function(config){
    
};


// get status of process
exports.getData = function(){
    
};