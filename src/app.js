const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//init
const app = express();
require('./database');
require('./helpers/local-auth');

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({ //configuramos antes de usar passport
    secret: 'nightcode',
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize()); //inicio passport
app.use(passport.session()); //aca guardo los datos por sessiones
app.use((req, res, next) =>{ //esto me permite crear mensajes en las vistas
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user; //obtendre los datos del usuario en todo el sitio
    next();//esto es para que ya termine y continue con las rutas
})

//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname, './public')));

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
})