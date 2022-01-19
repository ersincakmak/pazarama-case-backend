import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().min(3).required().label('Name'),
  username: yup.string().min(3).required().label('Username'),
  password: yup.string().min(3).required().label('Password'),
})

export const loginSchema = yup.object().shape({
  username: yup.string().required().label('Username'),
  password: yup.string().required().label('Password'),
})
