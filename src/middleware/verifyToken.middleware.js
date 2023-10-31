import jwt from 'jsonwebtoken'
import express from 'express'
import User from '../models/User.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
      throw new Error('Unauthorized')
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({
            message: 'Unauthorized',
          })
          .end()
      }

      req.user = await User.findOne({ _id: decoded._id })
      next()
    })
  } catch (error) {
    return res
      .status(401)
      .json({
        message: error.message,
      })
      .end()
  }
}

export default verifyToken
