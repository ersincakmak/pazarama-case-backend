import express from 'express'
import AdminController from '../controller/Admin'
import validate from '../middleware/validate'
import registerSchema from '../validation/Admin'

const adminRouter = express.Router()

adminRouter
  .route('/register')
  .post(validate(registerSchema), AdminController.register)

export default adminRouter
