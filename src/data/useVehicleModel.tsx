import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { BASE_API_URL } from 'constant'
import { UseVehicleSeriesData } from 'data/useVehicleSeries'

export interface UseVehicleModelData {
  id: string
  name: string
  VehicleSeriesId: string
  VehicleSeries: UseVehicleSeriesData
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type UseVehicleModelResult = {
  data: UseVehicleModelData[]
  total: number
}

type TQueryFnData = UseVehicleModelResult
type TError = AxiosError

function useVehicleModel(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/vehicle-model'),
    () =>
      ApiCall.api
        .get(urlQuery.transformUrl(`${BASE_API_URL}/vehicle-model?`))
        .then((res) => {
          return res.data
        }),
    {
      ...options,
    },
  )

  return {
    ...query,
    data: query.data?.data,
    total: query.data?.total,
    helpers: urlQuery,
  }
}

export default useVehicleModel
