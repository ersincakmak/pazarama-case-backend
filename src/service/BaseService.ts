import { FilterQuery, Model, Types } from 'mongoose'

abstract class BaseService<T> {
  Model

  constructor(model: Model<T>) {
    this.Model = model
  }

  list() {
    return this.Model.find()
  }

  findOne(options: FilterQuery<T>) {
    return this.Model.findOne(options)
  }

  create(data: T) {
    const createdValue = new this.Model(data)
    return createdValue.save()
  }

  modify(id: Types.ObjectId, options: FilterQuery<T>) {
    return this.Model.findByIdAndUpdate(id, options, { new: true })
  }
}

export default BaseService
