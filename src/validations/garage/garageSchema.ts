import * as yup from 'yup'

const create = yup.object().shape({
  fullName: yup.string().required('full name is required'),
  email: yup.string().required('email is required'),
  phone: yup.string().required('phone is required'),
  address: yup.string().nullable(),
  name: yup.string().required('name is required'),
  legalEntity: yup.string().required('legal entity is required'),
  garageImage: yup.string().required('garage image is required'),
})

const update = yup.object().shape({
  fullName: yup.string().required('full name is required'),
  email: yup.string().required('email is required'),
  phone: yup.string().required('phone is required'),
  address: yup.string().nullable(),
  name: yup.string().required('name is required'),
  legalEntity: yup.string().required('legal entity is required'),
  garageImage: yup.string().nullable(),
})

const garageSchema = { create, update }

export default garageSchema
