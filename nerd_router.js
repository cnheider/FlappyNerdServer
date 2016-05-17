var express = require('express');
var router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp(process.env.DATABASE_URL);

router.use(function timeLog(req, res, next) {
  console.log('Nerd call at time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('Nerd home page, here you can: /create, /delete, /avatar');
});

router.post('/signin/:nerd_id', function (req, res) {
  var tag = "/signin call ";
  db.result("INSERT INTO nerd(nerd_id, name) VALUES ($1,$2)", [parseInt(req.params.nerd_id), req.body.name])
    .then(function (result) {
      console.log(tag + "RESULT: ", result )
      res.send("SUCCESS")
    })
    .catch(function (error) {
      console.log(tag + "ERROR:", error)
      res.send("ERROR")
    });
});

router.delete('/delete/:nerd_id', function (req, res) {
  var tag = "/remove call "
  db.result("DELETE FROM nerd WHERE nerd_id = $1", parseInt(req.params.nerd_id))
    .then(function (result) {
      console.log(tag + "RESULT: ", result)
      res.send("SUCCESS")
    })
    .catch(function (error) {
      console.log(tag + "ERROR: ", error)
      res.send("ERROR")
    });
});

router.put('/avatar/:nerd_id',function (req, res){
  var tag = "/avatar call "
  db.result("UPDATE nerd SET avatar_url = $2 WHERE nerd_id = $1", [parseInt(req.params.nerd_id), req.body.avatar_url])
    .then(function (result) {
      console.log(tag + "RESULT: ", result)
      res.send("SUCCESS")
    })
    .catch(function (error) {
      console.log(tag + "ERROR: ", error)
      res.send("ERROR")
    })
})

router.put('/name/:nerd_id',function (req, res){
  var tag = "/name call "
  db.result("UPDATE nerd SET name = $2 WHERE nerd_id = $1", [parseInt(req.params.nerd_id), req.body.name])
    .then(function (result) {
      console.log(tag + "RESULT: ", result)
      res.send("SUCCESS")
    })
    .catch(function (error) {
      console.log(tag + "ERROR: ", error)
      res.send("ERROR")
    })
})

router.put('/play/:nerd_id',function (req, res){
  var tag = "/play call "
  db.result("UPDATE nerd SET is_playing = $2 WHERE nerd_id = $1", [parseInt(req.params.nerd_id), parseInt(req.body.game_id)])
    .then(function (result) {
      console.log(tag + "RESULT: ", result)
      res.send("SUCCESS")
    })
    .catch(function (error) {
      console.log(tag + "ERROR: ", error)
      res.send("ERROR")
    })
})

router.get('/:nerd_id', function (req, res){
  var tag = "/get call "
  db.one("SELECT name,avatar_url FROM nerd WHERE nerd_id = $1", parseInt(req.params.nerd_id))
    .then(function (data) {
      console.log(tag + "RESULT: ", data)
      res.json(data)
    })
    .catch(function (error) {
      console.log(tag + "ERROR: ", error)
      res.send("ERROR")
    })
})

module.exports = router;
