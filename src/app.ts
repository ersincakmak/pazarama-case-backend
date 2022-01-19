import express from 'express'
import fileupload from 'express-fileupload'
import helmet from 'helmet'
import path from 'path'
import config from './config'
import connection from './connection'
import routes from './routes'
import { IUser } from './types/User'

declare module 'express' {
  export interface Request {
    user?: IUser
  }
}

const app = express()

config()
connection()

app.use(express.json())
app.use(helmet())
app.use(
  fileupload({
    createParentPath: true,
  })
)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port:${PORT}`)
  app.use('/', routes)
})
