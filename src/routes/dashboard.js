import express from 'express'
import dashboardController from '../controllers/dashboard.controller.js'
import verifyToken from '../middleware/verifyToken.middleware.js'

const dashboardRouter = express.Router()

dashboardRouter.use(verifyToken)
dashboardRouter.get('/', dashboardController.dashboard)

export default dashboardRouter
