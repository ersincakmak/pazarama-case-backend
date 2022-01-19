import express from 'express'
import adminRouter from './Admin'
import formRouter from './Form'

const routes = express.Router()

routes.use('/', formRouter)
routes.use('/admin', adminRouter)

export default routes
