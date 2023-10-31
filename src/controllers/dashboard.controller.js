import express from 'express'
import successResponse from '../responses/success.response.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const dashboard = async (req, res) => {
  return successResponse(res, [], 'Welcome to dashboard page.')
}

export default { dashboard }
