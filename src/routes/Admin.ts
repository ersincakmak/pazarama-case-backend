import express from 'express'
import AdminController from '../controller/Admin'
import authenticate from '../middleware/authenticate'
import validate from '../middleware/validate'
import { loginSchema, registerSchema } from '../validation/Admin'
import { createAnserSchema, updateStatusSchema } from '../validation/From'

const adminRouter = express.Router()

adminRouter
  .route('/register')
  .post(validate(registerSchema), AdminController.register)

adminRouter.route('/login').post(validate(loginSchema), AdminController.login)

adminRouter
  .route('/applications')
  .get(authenticate, AdminController.getApplications)

adminRouter
  .route('/application/create-answer/:id')
  .post(authenticate, validate(createAnserSchema), AdminController.createAnswer)

adminRouter
  .route('/application/update-status/:id')
  .patch(
    authenticate,
    validate(updateStatusSchema),
    AdminController.updateStatus
  )

export default adminRouter
