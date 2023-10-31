import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import validate from '../validations/validation.js'
import {
  loginValidation,
  registerValidation,
} from '../validations/auth.validation.js'
import successResponse from '../responses/success.response.js'
import ErrorResponse from '../responses/error.response.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = validate(registerValidation, req.body)
    const emailIsExists = await User.findOne({ email })

    if (emailIsExists) {
      throw new ErrorResponse(400, 'Email already exists')
    }

    // hassing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.insertMany({
      name,
      email,
      password: hashedPassword,
    })

    return successResponse(res, user[0])
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = validate(loginValidation, req.body)

    const user = await User.findOne({ email })
    const validPassword = await bcrypt.compare(password, user?.password || '')

    if (!user || !validPassword) {
      throw new ErrorResponse(400, 'Email or password is wrong')
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    return successResponse(res, {
      ...user.toObject(),
      access_token: accessToken,
    })
  } catch (error) {
    next(error)
  }
}

export default { register, login }
