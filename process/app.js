var Q = require('q');
var req = require('./req.js');
var moment = require('moment');

exports.getData = function(settings){
    var count = 0;
    var deferred = Q.defer();
    
    var checkedUrls = {};
    var queue = {};
    var domain = getDomain(settings.url);
    
    var start = Date.now();
    
    addToQueue([settings.url]);
    consumeNext();
    
    
    function addToQueue(results){
        results.forEach(function(result){
            queue[result] = true;
        });
    }
    
    function consumeNext(){
        var next = null;
        for(var i in queue){
            if(checkedUrls[i]){
                delete queue[i];
                continue;
            }
            next = i;
            break;
        }
        
        console.log('queue length : ' + Object.keys(queue).length);
        
        if(next !== null){
            delete queue[next];
            scrape(next);
        }else{
            complete();
        }
    }
    
    function scrape(url){
        console.log('scraping url: ' + url);
        console.log(count++);
        req(url, domain).then(function(results){
            checkedUrls[url] = true;
            addToQueue(results);
            consumeNext();
        }).catch(function(err){
            console.log(err);
            consumeNext();
        });
    }
    
    function getDomain(url){
        var dom = /\/\/(?:\w+\.)*((?:\w+\.)(?:\w+))/;
        var domain = '';
        var match = url.match(dom);
        
        if(match && match[1]){
            domain = match[1];    
        }
        
        return domain;
    }
    
    function complete(){
        var end = Date.now() - start;
        var secs = end / 1000;
        console.log('done in ' + secs + ' seconds');
        deferred.resolve(Object.keys(checkedUrls));
    }
    
    
    return deferred.promise;
    
};

