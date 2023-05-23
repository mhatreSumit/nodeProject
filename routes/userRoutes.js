const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userContoller')

userRouter.post('/user/register',userController.add);
userRouter.get('/user/list',userController.list);
userRouter.put('/user/update/:id',userController.update);

module.exports = userRouter