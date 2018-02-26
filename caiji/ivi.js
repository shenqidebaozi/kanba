var cheerio = require('cheerio');
var request = require('request');
var mysql= require('mysql');
var url = 'http://ivi.bupt.edu.cn/';
var ts=[];
request.get({
    url: url
}, function (err, response, body) {
    var $ = cheerio.load(body);
    var list = $('div.row')
    list.find('div.-2u').each(function (item) {
        var ivi=$(this);
        var p = ivi.find('p').text();

        ivi.find('a').each(function(item){
            var eve=$(this);
            ts[item] =eve.attr('href');
           
            
        });
        console.log(p,'http://ivi.bupt.edu.cn/'+ts[1]);
    });

});