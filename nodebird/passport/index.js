const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () =>{
    passport.serializeUser((user, done) => {
        done(null, user.id);    // 세션에 유저의 id만 저장
    });

    // { id : 3 , 'connect.sid: 12512312151213 } 세션쿠키

    passport.deserializeUser((id, done) => {
        User.findOne({ where : { id }})
            .then(user => done(null, user.id))
            .catch(err => done(err));
    });

    local();
    kakao();
};