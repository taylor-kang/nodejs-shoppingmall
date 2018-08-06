var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

//node 가져오기
var express = require('express');

//MongoDB 접속
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('mongodb connect');
});

var connect = mongoose.connect('mongodb://127.0.0.1:27017/fastcampus',{ useMongoClient: true });
autoIncrement.initialize(connect);

//route 연결
var admin = require('./routes/admin');

//port설정
var app = express();
var port = 4000;

// 확장자가 ejs 로 끈나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req,res) {
    res.send('first app');
});

app.use('/admin',admin);

app.listen(port, function () {
    console.log('Express listening on port', port);
});