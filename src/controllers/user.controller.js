import express from 'express'
import successResponse from '../responses/success.response.js'
import User from '../models/User.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    return successResponse(res, users)
  } catch (error) {
    next(error)
  }
}

export default { getAllUsers }
