import dotenv from 'dotenv'
import mongoose from 'mongoose'

beforeEach(() => {
  dotenv.config()
})

it('should can connect to mongodb database', async () => {
  const db = await mongoose.connect(process.env.MONGO_CONNECTION)
  expect(db.connection.readyState).toBe(1)

  await db.connection.close()
})
