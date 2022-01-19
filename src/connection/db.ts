import mongoose from 'mongoose'

const db = mongoose.connection

db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Db connection successfull')
})

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URI as string)
}

export default dbConnect
