const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


passport.use('local-signup', new LocalStrategy({ //aca le damos los datos del cliente que se va a loguear
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //esto es necesario para obtener los demas datos 
}, async (req, email, password, done) => {
  
    const user = await User.findOne({email: email});
    if (user) {//esto sirve para que no de duplique
        return done(null, false, req.flash('signupMessage', 'El correo ya existe.'));
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);

        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) =>{
    const user = await User.findOne({email: email});
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'Usuario no encontrado.'));
    }if (!user.comparePassword(password)) { //comparamos la clave que inserto
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta.'));
    }else{
        done(null, user)
    }
}));