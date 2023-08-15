const { postUser, getUsers, getUser, deleteUser, putUser } = require('../controller/user')

const express = require('express')
const router= express.Router()



router.get('/all',getUsers)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.put('/:id',putUser)

module.exports = router