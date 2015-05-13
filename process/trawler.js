var Q = require('q');
var req = require('./req.js');

exports.beginTrawl = function(settings){
    
    var deferred = Q.defer();
    
    var count = 0;
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
            deferred.notify(url);
            addToQueue(results);
        }).fin(function(){
            consumeNext();
        });
    }
    
    
    
    function complete(){
        var end = Date.now() - start;
        var secs = end / 1000;
        console.log('done in ' + secs + ' seconds');
        deferred.resolve(Object.keys(checkedUrls));
    }
    
    
    return deferred.promise;
    
};

