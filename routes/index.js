var Database = require('./database')
var express = require('express');
var router = express.Router();
var db=new Database();
router.get('/addNote', function(req, res, next) {
  var code=global.database.addNote(req.query.id,req.query.name,req.query.content);
  req.query['code']=code;
  db.addNote(req,res);
});
router.get('/updateNote', function(req, res, next) {
  req.query['code']=global.database.updateNote(req.query.id,req.query.name,req.query.content);
  db.updateNote(req,res);

});
router.get('/getNote', function(req, res, next) {
  res.send({content:global.database.getNote(req.query.id,req.query.name)})
});
router.get('/status', function(req, res, next) {

  //res.render('index', { title: global.database.echo("lining") });
  var result = global.database.queryTransactionStatus(req.query.hash);
  if(result == null)
  {
    res.send({info:2});
  }
  else if(result == 1){

    res.send({info:1});
  }
  else
  {
    res.send({info:0});
  }

});
router.get('/getList', function(req, res, next) {
  db.getNoteList(req,res);
});
router.get('/transfer', function(req, res, next) {

  //res.render('index', { title: global.database.echo("lining") });
  var result = global.tokens.transfer(req.query.from,req.query.to,req.query.value);
  res.render('index', { title:result});

});
router.get('/allowance', function(req,res,next){
  res.render('index', { title:global.tokens.allowance(req.query.from,req.query.to)});
})
module.exports = router;
