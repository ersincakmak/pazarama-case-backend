import { Document, ObjectId } from 'mongoose'

export interface IForm extends Document {
  _id: ObjectId
  status: 'waiting' | 'solved' | 'rejected'
  name: string
  lastName: string
  age: number
  tcNo: number
  applicationReason: string
  address: string
  files: string[]
}
