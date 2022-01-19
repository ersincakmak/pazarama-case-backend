import { FilterQuery } from 'mongoose'
import userModel from '../model/User'
import { IUser } from '../types/User'
import BaseService from './BaseService'

class UserService extends BaseService<IUser> {
  constructor() {
    super(userModel)
  }

  findOne(options: FilterQuery<IUser>) {
    return this.Model.findOne(options).select('-password')
  }
}

export default new UserService()
