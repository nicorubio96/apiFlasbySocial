const {  getPosts, getPost, deletePost, putPost, createPost } = require('../controller/post')
const upload = require('../middlewares/multer')
const models = require('../database/models/')
const authenticateToken = require('../middlewares/jwtVerify')
const express = require('express').Router()
const router= express


router.post('/create',[authenticateToken, upload.single('avatar'),createPost])
router.get('/all',[authenticateToken,getPosts])
router.get('/:id',[authenticateToken,getPost])
router.delete('/:id',[authenticateToken,deletePost])
router.put('/:id',[authenticateToken,putPost])
module.exports=router