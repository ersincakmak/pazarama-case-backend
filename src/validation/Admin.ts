import * as yup from 'yup'

const registerSchema = yup.object().shape({
  name: yup.string().min(3).required().label('Name'),
  username: yup.string().min(3).required().label('Username'),
  password: yup.string().min(3).required().label('Password'),
})

export default registerSchema
