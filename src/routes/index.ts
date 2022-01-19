import express from 'express'
import adminRouter from './Admin'
import formRouter from './Form'
import ApiError from '../model/Error'

const routes = express.Router()

routes.use('/', formRouter)
routes.use('/admin', adminRouter)
routes.use('/*', (req, res, next) => {
  next(new ApiError('Page not found.', 404))
})

export default routes
