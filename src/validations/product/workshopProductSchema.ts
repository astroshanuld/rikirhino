import * as yup from 'yup'

const create = yup.object().shape({
  name: yup.string().required('name is required'),
  description: yup.string().required('description is required'),
  picturePath: yup.string().nullable(),
  benefit: yup.string().required('benefit is required'),
  workshopProductImage: yup.string().required('product image is required'),
})

const update = yup.object().shape({
  name: yup.string().required('name is required'),
  description: yup.string().required('description is required'),
  picturePath: yup.string().nullable(),
  benefit: yup.string().nullable(),
  workshopProductImage: yup.string().nullable(),
})

const workshopProductSchema = { create, update }

export default workshopProductSchema
