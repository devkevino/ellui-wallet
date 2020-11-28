const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var session = require('express-session');

const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');
const walletRouter = require('./routes/wallet');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res, next) => {
  if(req.session.user) {
    res.redirect('/index');
  } else {
    //res.render(path.join('wallet', 'history'), { pageName: 'history'});
    //res.render(path.join('wallet', 'send'), { pageName: 'send'});
    // res.render(path.join('main', 'index'), { pageName: 'index'});

    res.redirect('/user/login');
  }
});

// login, logout, register
app.use('/user', userRouter);

// 세션 체크
app.get(/^\/.*$/, (req, res, next) => {

  if(req.session.user) {
    next();
  } else {
    res.redirect('/');
  }

});

app.use('/index', indexRouter);

app.use('/wallet', walletRouter);

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
