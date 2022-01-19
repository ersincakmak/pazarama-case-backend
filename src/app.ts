import express from 'express'
import helmet from 'helmet'
import config from './config'

const app = express()

config()

app.use(express.json())
app.use(helmet())

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port:${PORT}`)
})
