import supertest from 'supertest'
import web from '../../src/applications/web.js'
import mongoose from '../../src/applications/database.js'
import {
  createTestDummyUsers,
  createTestUser,
  generateJwtToken,
  removeTestAllUsers,
} from '../utils.js'

afterAll(async () => {
  await mongoose.disconnect()
})

describe('/GET /api/users', () => {
  beforeEach(async () => {
    await createTestUser()
    await createTestDummyUsers()
  })

  afterEach(async () => {
    await removeTestAllUsers()
  })

  it('should can get all users', async () => {
    const accessToken = await generateJwtToken()
    const result = await supertest(web)
      .get('/api/users')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(11)
  })
})
