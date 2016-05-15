var express = require('express');
var router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp(process.env.DATABASE_URL);

router.use(function timeLog(req, res, next) {
  console.log('Stat call at time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('Stats home page');
});

router.get('/mostflaps', function (req, res){
  var tag = "/mostflaps call "
  db.many("SELECT nerd.nerd_id,name,count(timestamp) from nerd inner join flap on nerd.nerd_id = flap.nerd_id GROUP BY nerd.nerd_id ORDER BY count DESC")
    .then(function (data) {
      console.log(tag + "DATA:", data.value);
      res.json(data)
    })
    .catch(function (error) {
      console.log(tag + "ERROR:", error);
      res.json(error)
    });
});

router.get('/totalairtime', function (req, res){
    var tag = "/totalairtime call "
  db.many("SELECT flap.nerd_id,sum(air_time) from nerd inner join flap on nerd.nerd_id = flap.nerd_id group by flap.nerd_id ORDER BY sum DESC")
    .then(function (data) {
      console.log(tag + "DATA:", data.value);
      res.json(data)
    })
    .catch(function (error) {
      console.log(tag + "ERROR:", error);
      res.json(error)
    });
});

router.get('/longestairtime', function (req, res){
  var tag = "/longestairtime call "
  db.many("SELECT flap.nerd_id,max(air_time) from nerd inner join flap on nerd.nerd_id = flap.nerd_id group by flap.nerd_id ORDER BY max DESC")
    .then(function (data) {
      console.log(tag + "DATA:", data.value);
      res.json(data)
    })
    .catch(function (error) {
      console.log(tag + "ERROR:", error);
      res.json(error)
    });
});

module.exports = router;
