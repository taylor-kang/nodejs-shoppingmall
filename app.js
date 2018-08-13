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

var cookieParser = require('cookie-parser');

//flash  메시지 관련
var flash = require('connect-flash');

//passport 로그인 관련
var passport = require('passport');
var session = require('express-session');

var auth = require('./routes/auth');

//route 연결
var admin = require('./routes/admin');
var accounts = require('./routes/accounts');

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
app.use(cookieParser());

//session 관련 셋팅
app.use(session({
    secret: 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
}));

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());



app.get('/', function (req,res) {
    res.send('first app');
});

app.use('/admin',admin);
app.use('/accounts', accounts);
app.use('/uploads', express.static('uploads'));
app.use('/auth', auth);


app.listen(port, function () {
    console.log('Express listening on port', port);
});