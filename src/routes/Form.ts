import express from 'express'
import FormController from '../controller/Form'

const formRouter = express.Router()

formRouter.route('/create-application').post(FormController.create)
formRouter.route('/application/:id').get(FormController.getById)

export default formRouter
