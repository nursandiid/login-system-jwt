import supertest from 'supertest'
import bcrypt from 'bcrypt'
import web from '../../src/applications/web.js'
import { createTestUser, removeTestUser } from '../utils.js'
import mongoose from '../../src/applications/database.js'

afterAll(async () => {
  await mongoose.disconnect()
})

describe('POST /api/register', () => {
  afterEach(async () => {
    await removeTestUser()
  })

  it('should can register a new user', async () => {
    const result = await supertest(web).post('/api/register').send({
      name: 'Nursandi',
      email: 'nursandi@example.com',
      password: 'rahasia',
    })

    const { name, email, password } = result.body.data

    expect(name).toBe('Nursandi')
    expect(email).toBe('nursandi@example.com')
    expect(await bcrypt.compare('rahasia', password)).toBe(true)
  })

  it('should reject register a new user with empty fields', async () => {
    const result = await supertest(web).post('/api/register').send({
      name: '',
      email: '',
      password: 'rahasia',
    })

    expect(result.body.errors).toBeDefined()
    expect(result.body.message).toBe('Unprocessable Entities')
  })
})

describe('POST /api/login', () => {
  beforeEach(async () => {
    await createTestUser()
  })

  afterEach(async () => {
    await removeTestUser()
  })

  it('should can login with right identities', async () => {
    const result = await supertest(web).post('/api/login').send({
      email: 'nursandi@example.com',
      password: 'rahasia',
    })

    expect(result.body.data.access_token).toBeDefined()
    expect(result.body.data.name).toBe('Nursandi')
  })

  it('should reject login with invalid identities', async () => {
    const result = await supertest(web).post('/api/login').send({
      email: 'nursandi@example.com',
      password: 'rahasia1232',
    })

    expect(result.body.data?.access_token).toBeUndefined()
    expect(result.body.message).toBe('Email or password is wrong')
  })
})
