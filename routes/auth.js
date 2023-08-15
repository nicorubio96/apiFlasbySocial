const passport = require('passport')
const { login, register } = require('../controller/auth')
const express = require('express').Router()
const router= express


router.post('/login',login)
router.post('/register',register)


module.exports=router
