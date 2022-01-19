import express from 'express'
import formRouter from './Form'

const routes = express.Router()

routes.use('/', formRouter)

export default routes
