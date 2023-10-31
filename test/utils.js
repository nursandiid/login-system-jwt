import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../src/models/User'

dotenv.config()

const removeTestUser = async () => {
  await User.deleteOne({ email: 'nursandi@example.com' })
}

const createTestUser = async () => {
  await User.insertMany({
    name: 'Nursandi',
    email: 'nursandi@example.com',
    password: await bcrypt.hash('rahasia', 10),
  })
}

const getTestUser = async () => {
  return await User.findOne({ email: 'nursandi@example.com' })
}

const generateJwtToken = async (expiresIn) => {
  const user = await getTestUser()
  const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn || '1d',
  })

  return accessToken
}

const createTestDummyUsers = async () => {
  const users = []
  for (let i = 0; i < 10; i++) {
    users.push({
      name: `Nursandi ${i}`,
      email: `nursandi${i}@example.com`,
      password: await bcrypt.hash('rahasia', 10),
    })
  }

  await User.insertMany(users)
}

const removeTestAllUsers = async () => {
  await User.deleteMany()
}

export { removeTestUser, createTestUser, getTestUser, generateJwtToken, createTestDummyUsers, removeTestAllUsers }
