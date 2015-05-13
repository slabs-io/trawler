var trawlerProcess = require('../process/app.js');

exports.get = function(req, res){
    
};


// set up trawler to index pages
exports.post = function(req, res){
    var slabConfigId = req.body.slabConfigId;
    var networkId = req.body.networkId;
    var url = req.body.url;
    
    trawlerProcess.start({
        slabConfigId: slabConfigId,
        networkId: networkId,
        url: url
    });
};