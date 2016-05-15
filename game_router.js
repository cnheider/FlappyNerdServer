var express = require('express');
var router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp(process.env.DATABASE_URL);

router.use(function timeLog(req, res, next) {
  console.log('Game call at time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('Game home page');
});

router.post('/flap/:game_id', function (req, res) {
  var tag = "/flap call "
  var flap = {
    nerd_id: parseInt(req.body.nerd_id),
    air_time: parseInt(req.body.air_time),
    game_id: parseInt(req.params.game_id)
  };

  db.result("INSERT INTO flap(nerd_id,air_time,game_id) VALUES (${nerd_id},${air_time},${game_id})", flap)
    .then(function (result) {
      console.log(tag + "RESULT: ", result)
      res.send("SUCCESS")
    })
    .catch(function (error) {
      console.log(tag + "ERROR: ", error)
      res.send("ERROR")
    })
})

router.get('/live/:game_id', function (req, res) {
  var tag = "/live call "
  db.many("SELECT nerd.nerd_id,name,avatar_url,sum(air_time) FROM nerd INNER JOIN flap ON flap.nerd_id = nerd.nerd_id AND flap.game_id = 1 GROUP BY nerd.nerd_id ORDER BY nerd_id ASC", parseInt(req.params.game_id))
    .then(function (data) {
      console.log(tag + "DATA:", data.value)
      res.json(data)
    })
    .catch(function (error) {
      console.log(tag + "ERROR:", error)
      res.json(error)
    });
});

router.post('/start/:game_id', function (req, res){
  var tag = "/start call "
  console.log('game started')
  res.send("started")
});

router.post('/stop/:game_id', function (req, res){
  var tag = "/stop call "
  console.log('game stopped')
  res.send("stopped")
});

router.post('/gamemode/:game_id', function (req, res){
  var tag = "/gamemode call "
  console.log('gamemode changed')
  res.send("changed")
});

module.exports = router;
