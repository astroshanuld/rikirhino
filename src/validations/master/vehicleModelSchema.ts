import * as yup from 'yup'

const create = yup.object().shape({
  name: yup.string().required('name is required'),
  VehicleSeriesId: yup.string().required('vehicle series is required'),
})

const update = yup.object().shape({
  name: yup.string().required('name is required'),
  VehicleSeriesId: yup.string().required('vehicle series is required'),
})

const vehicleModelSchema = { create, update }

export default vehicleModelSchema
