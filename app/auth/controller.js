const passport = require('passport');
const User = require('../user/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { getToken } = require('../../utils');

const register = async(req, res, next) => {
    try {

        const payload = req.body;
        let user = new User(payload);
        await user.save();
        return res.json({
            status:'success',
            data:user
        })
    } catch(err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error:true,
                message:err.message,
                fields: err.errors
            });
        }
        next()
    }
}

const localStrategy = async (email, password, done) => {
    try {
        let user = await User.findOne({email})
        .select('-__v -createdAt -updateAt -cart_items -token');

        if(!user) return done();
        if(bcrypt.compareSync(password, user.password)){
            ({password, ...userWithoutPassword} = user.toJSON());
            return done(null, userWithoutPassword)
        }
    } catch(err){
        done(err, null)
    }

    done();
}

const login = async(req, res, next) => {
    passport.authenticate('local', async function(err, user){
        if(err) return next(err);

        if(!user) return res.json({
            error:1, message:'Email or password Incorrect'
        })

        let signed = jwt.sign(user, config.secretKey);

        await User.findByIdAndUpdate(user._id, {$push:{token: signed}})

        return res.json({
            message:'Login Succesfully',
            user,
            token:signed
        })
    })(req, res, next)
}

const logout = async(req, res, next) => {
    let token = getToken(req);

    let user = await User.findOneAndUpdate({  token : {$in:[token]}}, {$pull : {token: token}},{useFindAndModify: false})

    if(!token || !user){
      return  res.json({
            error:1,
            message:'User not Found!!'
        })
    }

    return res.json({
        error:0,
        message:'Logout Success'
    })

}

const me = (req, res, next) => {
    if(!req.user){
       return res.json({
            err:1,
            message:'You are not login or token expired'
        });

    }
    res.json(req.user);
}
module.exports =  {
    register,
    login,
    localStrategy,
    logout,
    me
};