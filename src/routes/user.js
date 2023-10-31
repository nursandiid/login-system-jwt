import express from 'express'
import userController from '../controllers/user.controller.js'
import verifyToken from '../middleware/verifyToken.middleware.js'

const userRouter = express.Router()

userRouter.use(verifyToken)
userRouter.get('/', userController.getAllUsers)

export default userRouter
