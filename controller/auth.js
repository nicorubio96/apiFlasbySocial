const models = require('../database/models')
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
require('dotenv').config()
require('../middlewares/passport')

const register =async(req,res,next)=>{
//validations fields === password min 8 character and minim un uppercase , email is email, 

    try{
        let {username,firstName,lastName,email,password}= req.body

    let userVerified = await models.User.findOne({ where: {username:username, email: email } })
 

    if(userVerified){
        return res.status(202).json({msg:'ok user is created'})
    }

    const pass = validationResult(req.body.password);

    if(pass.isEmpty()){
        console.log(pass)

    }

    let hashPassword = bcrypt.hashSync(password, 10);


    let userCreated =await models.User.create({  username: username,firstName:firstName,lastName:lastName,email:email, password:hashPassword})



    res.status(202).json({
        user:userCreated,
        msg:'created user ',

    })

    }catch(err){

        console.log(err) 

    }

    

}


const login = async(req,res)=>{
    let {email,password} = req.body
    
    
    let userVerified = await models.User.findOne({where:{email:email}})

    if(!userVerified){
        return res.status(404).json({msg:'user not found'})
    }

    let comparePassword = bcrypt.compareSync(password,userVerified.password);

    if(!comparePassword){
        return res.status(400).json({msg:'password incorrect'})
    }
    
    var token = jwt.sign({ user:userVerified.id }, process.env.PRIVATE_KEY, { algorithm: 'HS256' });

    res.status(200).json({
        msg:'user correct',
        userVerified,
        token

    })


}

const google =()=>{
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] })
}

const googleCallback =()=>{
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
}




module.exports ={
    register,
    login,
    google,
    googleCallback
}