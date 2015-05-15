var request = require('request');

// check settings match
exports.get = function(req, res){
    request({
        method: 'GET',
        url: 'http://services.slabs.io/slab/trawler/' 
            + req.query.networkId + '/' + req.query.slabConfigId
    }).pipe(res);
};


// set up trawler to index pages
exports.post = function(req, res){
    var slabConfigId = req.body.slabConfigId;
    var networkId = req.body.networkId;
    var url = req.body.url;
    var domain = getDomain(url);
    
    request({
        method: 'POST',
        url:'http://services.slabs.io/slab/trawler',
        body:{
            slabId: slabConfigId,
            networkId: networkId,
            settings: {
                url: url,
                domain: domain
            }
        },
        json:true
    }).pipe(res);
};

function getDomain(url){
    var removeProto = url.split('//')[1];
    var removePath = removeProto.split('/')[0];
    return removePath;
}