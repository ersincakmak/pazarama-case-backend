import express from 'express'
import AdminController from '../controller/Admin'
import authenticate from '../middleware/authenticate'
import validate from '../middleware/validate'
import { loginSchema, registerSchema } from '../validation/Admin'

const adminRouter = express.Router()

adminRouter
  .route('/register')
  .post(validate(registerSchema), AdminController.register)

adminRouter.route('/login').post(validate(loginSchema), AdminController.login)

adminRouter
  .route('/applications')
  .get(authenticate, AdminController.getApplications)

export default adminRouter
