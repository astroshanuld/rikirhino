import * as yup from 'yup'

const create = yup.object().shape({
  name: yup.string().required('name is required'),
  description: yup.string().required('description is required'),
  picturePath: yup.string().nullable(),
  ProductCategoryId: yup.string().required('product category is required'),
  WorkshopProductId: yup.string().required('workshop product is required'),
  benefit: yup.string().required('benefit is required'),
  insuranceProductImage: yup.string().required('product image is required'),
})

const update = yup.object().shape({
  name: yup.string().required('name is required'),
  description: yup.string().required('description is required'),
  picturePath: yup.string().nullable(),
  ProductCategoryId: yup.string().required('product category is required'),
  WorkshopProductId: yup.string().required('workshop product is required'),
  benefit: yup.string().nullable(),
  insuranceProductImage: yup.string().nullable(),
})

const insuranceProductSchema = { create, update }

export default insuranceProductSchema
