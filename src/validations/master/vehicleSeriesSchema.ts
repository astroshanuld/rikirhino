import * as yup from 'yup'

const create = yup.object().shape({
  name: yup.string().required('name is required'),
  VehicleBrandId: yup.string().required('vehicle brand is required'),
})

const update = yup.object().shape({
  name: yup.string().required('name is required'),
  VehicleBrandId: yup.string().required('vehicle brand is required'),
})

const vehicleSeriesSchema = { create, update }

export default vehicleSeriesSchema
