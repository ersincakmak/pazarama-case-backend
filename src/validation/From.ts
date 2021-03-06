import * as yup from 'yup'

export const createFormSchema = yup.object().shape({
  firstName: yup.string().required().label('Name'),
  lastName: yup.string().required().label('Last Name'),
  age: yup.number().required().label('Age'),
  applicationReason: yup.string().required().label('Application Reason'),
  tcNo: yup
    .string()
    .required()
    .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, 'Invalid Tc No')
    .label('Tc No'),
  address: yup.string().required().label('Address'),
})

export const createAnserSchema = yup.object().shape({
  message: yup.string().min(5).required().label('Message'),
})

export const updateStatusSchema = yup.object().shape({
  status: yup
    .string()
    .required()
    .oneOf(['waiting', 'rejected', 'solved'])
    .label('Status'),
})
