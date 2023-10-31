import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from '../routes/auth.js'
import errorMiddleware from '../middleware/error.middleware.js'
import dashboardRouter from '../routes/dashboard.js'
import userRouter from '../routes/user.js'

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()

app.get('/', (req, res) => {
  res.send(`Hi, it's working`)
})
app.use('/api', authRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/users', userRouter)

app.use(errorMiddleware)

export default app
