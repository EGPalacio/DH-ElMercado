var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
var app = express();
/* CORS */
var cors = require('cors')

const Swal = require('sweetalert2');
var whitelist = ['http://localhost:3000', 'http://localhost:3030']



var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
/* CORS */




var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var apiRouter = require('./routes/api');


var productsRouter = require('./routes/products');
var session = require("express-session");
var cookieRecordameMiddleware = require("./middlewares/cookieLoginMiddleware");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
    secret: "Es un secreto",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieRecordameMiddleware);

app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/api', apiRouter);





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