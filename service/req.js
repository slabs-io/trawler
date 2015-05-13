var request = require('request');
var Q = require('q');
var cheerio = require('cheerio');

// returns a list of scraped urls
module.exports = function(url, domain){
    var deferred = Q.defer();
    request.get({url:url, timeout:500}, function (error, response, body) {
        
        var urls = [];
        if (!error && response.statusCode == 200 && response.headers['content-type'].indexOf('text/html') > -1) {
            var $ = cheerio.load(body);
            
            $('a').each(function(el){
                var href = $(this).attr('href');
                if(href && href.indexOf(domain) > -1 && !/^mailto/.test(href)){
                    href = href.split('#');
                    urls.push(href[0]);
                }
                
            });
            
            deferred.resolve(urls);
            
        }else{
            deferred.reject('invalid url');
        }
        
    });
    
    return deferred.promise;
};
