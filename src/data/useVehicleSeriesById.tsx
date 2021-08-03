import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { BASE_API_URL } from 'constant'
import { AxiosError } from 'axios'
import { UseVehicleSeriesData } from 'data/useVehicleSeries'

type UseVehicleSeriesResult = UseVehicleSeriesData

type TQueryFnData = UseVehicleSeriesResult
type TError = AxiosError

function useVehicleSeriesById(
  id: any,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey(['/vehicle-series-by-id', id]),
    () =>
      ApiCall.api.get(
        urlQuery.transformUrl(`${BASE_API_URL}/vehicle-series/${id}`),
      ),
    {
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      select: (res: any) => res?.data?.data,
      enabled: Boolean(id),
      ...options,
    },
  )

  return {
    ...query,
    helper: urlQuery,
  }
}

export default useVehicleSeriesById
