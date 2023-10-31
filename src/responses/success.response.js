import express from 'express'

/**
 *
 * @param {express.Response} res
 * @param {Array} data
 * @param {String} message
 * @param {Number} status
 * @returns
 */
const successResponse = (res, data = [], message = 'Success', status = 200) => {
  return res
    .status(status)
    .json({
      data,
      message,
    })
    .end()
}

export default successResponse
