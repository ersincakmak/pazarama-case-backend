import FormModel from '../model/Form'
import { IForm } from '../types/Form'
import BaseService from './BaseService'

class FormService extends BaseService<IForm> {
  constructor() {
    super(FormModel)
  }
}

export default new FormService()
