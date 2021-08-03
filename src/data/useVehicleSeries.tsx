import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { BASE_API_URL } from 'constant'
import { UseVehicleBrandData } from 'data/useVehicleBrand'

export interface UseVehicleSeriesData {
  id: string
  name: string
  VehicleBrandId: string
  VehicleBrand: UseVehicleBrandData
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type UseVehicleSeriesResult = {
  data: UseVehicleSeriesData[]
  total: number
}

type TQueryFnData = UseVehicleSeriesResult
type TError = AxiosError

function useVehicleSeries(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/vehicle-series'),
    () =>
      ApiCall.api
        .get(urlQuery.transformUrl(`${BASE_API_URL}/vehicle-series?`))
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

export default useVehicleSeries
