var request = require('request')
  , parser = require('xml2json');

module.exports = function(app) {

  app.get('/', function(req, res){
    res.sendfile('./public/index.html');
  });

  //listing stations
  app.get('/api/stations', function(req, res){
    request('http://vlille.fr/stations/xml-stations.aspx', function (error, response, body) {
      var json = parser.toJson(body);
      res.json(json);
    });
  });

  //get station by id
  app.get('/api/stations/:id', function(req, res){
    request('http://vlille.fr/stations/xml-station.aspx?borne='+req.params.id, function (error, response, body) {
      var json = parser.toJson(body);
      res.json(json);
    });
  });
}
