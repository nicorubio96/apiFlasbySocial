const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const session =require ('express-session')
const models = require('./database/models/')




require('dotenv').config()
const port = process.env.PORT
require('./middlewares/passport')

const user = require('./routes/user')
const auth = require('./routes/auth')
const post = require('./routes/post')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))
app.use( passport.initialize());
app.use( passport.session());



app.use('/user',user)
app.use('/auth',auth)
app.use('/post',post)




const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


app.get('/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);


app.get("/failed", (req, res) => {
    console.log('User is not authenticated');
    res.send("Failed")
})

app.get("/success", isLoggedIn, async (req, res) => {
    console.log('You are logged in');
  
    const { givenName, familyName } = req.user.name;
    const { email, displayName } = req.user;
    let username = displayName.replace(/\s+/g, '');
  
    try {
      const userVerified = await models.User.findOne({ where: { email: email } });
  
      if (userVerified) {
        res.json({ msg: 'User already exists', user: userVerified });
      } else {
        const userCreated = await models.User.create({
          username: username,
          firstName: givenName,
          lastName: familyName,
          email: email,
          password: '' // Remember to handle passwords securely!
        });
  
        res.json({ msg: 'User created', user: userCreated });
      }
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error while destroying session:', err);
        } else {
            req.logout(() => {
                console.log('You are logged out');
                res.redirect('/home');
            });
        }
    });
});

 

app.listen(port,()=>{
    console.log("connect to the port: " , port )

})