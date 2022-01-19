import { FilterQuery, Types } from 'mongoose'
import FormModel from '../model/Form'
import { IForm } from '../types/Form'
import BaseService from './BaseService'

class FormService extends BaseService<IForm> {
  constructor() {
    super(FormModel)
  }

  findOne(options: FilterQuery<IForm>) {
    return this.Model.findOne(options).populate({
      path: 'answers',
      populate: {
        path: 'author',
        select: '-password',
      },
    })
  }

  modify(id: Types.ObjectId, options: FilterQuery<IForm>) {
    return this.Model.findByIdAndUpdate(id, options, { new: true }).populate({
      path: 'answers',
      populate: {
        path: 'author',
        select: '-password',
      },
    })
  }
}

export default new FormService()
