import { ObjectId } from 'mongoose'

export interface IUser {
  _id: ObjectId
  name: string
  username: string
  password: string
}
