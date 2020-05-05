const { Router } = require('express');
const router = Router();
const passport = require('passport');


router.get('/', (req, res) =>{
    res.render('index');
})

router.get('/signup', (req, res, next) =>{
    res.render('signup');
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallBack: true
}))

router.get('/signin', (req, res, next) =>{
    res.render('signin');
})

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallBack: true
}))

router.get('/logout', (req, res, next) =>{
    req.logout();
    res.redirect('/');
})

router.get('/profile', isAuthenticated, (req, res, next) =>{
    res.render('profile');
})

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }else{
        res.redirect('/signin');
    }
}

module.exports = router;