var trawler = require('../process/app.js');

var settings = {
    url: 'http://www.flashtalking.com/uk'
};

trawler.getData(settings).then(function(result){
    console.log('complete');
    console.log(result);
});