import supertest from 'supertest'
import web from '../../src/applications/web.js'
import mongoose from '../../src/applications/database.js'
import {
  createTestUser,
  generateJwtToken,
  removeTestUser,
} from '../utils.js'

afterAll(async () => {
  await mongoose.disconnect()
})

describe('/GET /api/dashboard', () => {
  beforeEach(async () => {
    await createTestUser()
  })

  afterEach(async () => {
    await removeTestUser()
  })

  it('should can see response from dashboard page', async () => {
    const accessToken = await generateJwtToken()
    const result = await supertest(web)
      .get('/api/dashboard')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(result.body.message).toBe('Welcome to dashboard page.')
  })

  it('should reject to access dashboard page with invalid token', async () => {
    const accessToken = await generateJwtToken('2s')

    await new Promise((resolve) => {
      console.info('hold request until 3 seconds')
      setTimeout(resolve, 3000)
    })

    const result = await supertest(web)
      .get('/api/dashboard')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(result.status).toBe(401)
    expect(result.body.message).toBe('Unauthorized')
  })
})
