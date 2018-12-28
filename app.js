var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Database = require('./routes/database')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

database = new Database();
//tokens = new Tokens();
global.database = database;
//global.tokens = tokens;
var nonce = database.getNonce();
//var nonce = tokens.getNonce();
console.log(nonce)
global.nonce = --nonce;  // nonce的最大值，每次取nonce，需要加1，并转化为十六进制
global.getNextNonce = function()
{
  global.nonce++;
  return '0x' + global.nonce.toString(16);
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
