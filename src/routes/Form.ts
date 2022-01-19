import express from 'express'
import FormController from '../controller/Form'
import validate from '../middleware/validate'
import { createFormSchema } from '../validation/From'

const formRouter = express.Router()

formRouter
  .route('/create-application')
  .post(validate(createFormSchema), FormController.create)
formRouter.route('/application/:id').get(FormController.getById)

export default formRouter
