var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const spawn = require("child_process").spawn;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersRouter = require('./routes/submit-form');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/submit-form', usersRouter);

//input
app.use(express.urlencoded())

//get the form input
app.post('/submit-form', (req, res) => {
  const target = req.body.url
  const extract = "-x";
  const format = "--audio-format";
  const mp3 = "mp3";
  const out = "-o";
  const dir = "output/%(title)s-%(id)s.%(ext)s";
  const pythonProcess = spawn('python',["/usr/local/bin/youtube-dl", extract, format, mp3, out, dir, target]);
  //console.log(pythonProcess);
  console.log(target);
  console.log("================= mp3 successfully created ===============     " + target);
  res.redirect('/');
  res.end()
})

module.exports = app

console.log("App running: http://localhost:7171"); ;
