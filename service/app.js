var req = require('./req.js');
var Q = require('q');

function getURLs(settings){
    var deferred = Q.defer();
    
    req(settings.url, settings.domain).then(function(results){
        
        var newJobs = results
                .map(function(url){
                   return {
                       msg: 'job',
                       jobId: url,
                       settings:{
                           url: url,
                           domain: settings.domain
                       }
                   };
                });
        
        newJobs.unshift({
            msg: 'save',
            data: settings.url
        });
        
        deferred.resolve(newJobs);
    }).catch(function(err){
        deferred.reject(err);
    });
    
    return deferred.promise;
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


exports.start =  function(settings){
//   var domain = getDomain(settings.url);
  return getURLs({
      url: settings.url,
      domain: settings.domain
  });
};

exports.execute = getURLs;