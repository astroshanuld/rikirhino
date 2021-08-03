import * as yup from 'yup'

const create = yup.object().shape({
  fullName: yup.string().required('full name is required'),
  email: yup.string().required('email is required'),
  phone: yup.string().required('phone is required'),
  address: yup.string().nullable(),
  name: yup.string().required('name is required'),
  legalEntity: yup.string().required('legal entity is required'),
  providerImage: yup.string().required('provider image is required'),
})

const update = yup.object().shape({
  fullName: yup.string().required('full name is required'),
  email: yup.string().required('email is required'),
  phone: yup.string().required('phone is required'),
  address: yup.string().nullable(),
  name: yup.string().required('name is required'),
  legalEntity: yup.string().required('legal entity is required'),
  providerImage: yup.string().nullable(),
})

const providerSchema = { create, update }

export default providerSchema
