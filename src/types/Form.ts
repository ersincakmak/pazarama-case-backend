import { ObjectId } from 'mongoose'

export interface IForm {
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
