import express from 'express'
import FormController from '../controller/Form'

const formRouter = express.Router()

formRouter.route('/create-application').post(FormController.create)

export default formRouter
