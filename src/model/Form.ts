import mongoose from 'mongoose'
import { IForm } from '../types/Form'

const formSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    tcNo: {
      type: String,
      required: true,
    },
    applicationReason: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    files: {
      type: [String],
      required: false,
    },
    // when i create user model i will remove these comment lines
    // answers: {
    //   type: [
    //     {
    //       message: {
    //         type: String,
    //         required: true,
    //       },
    //       author: {
    //         type: mongoose.Types.ObjectId,
    //         required: true,
    //         ref: 'user',
    //       },
    //     },
    //   ],
    //   required: false,
    // },
    status: {
      type: String,
      default: 'waiting',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default mongoose.model<IForm>('form', formSchema)
