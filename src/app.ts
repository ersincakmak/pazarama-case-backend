import express from 'express'
import helmet from 'helmet'
import fileupload from 'express-fileupload'
import config from './config'
import connection from './connection'
import routes from './routes'

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

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port:${PORT}`)
  app.use('/', routes)
})
