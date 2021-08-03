import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { BASE_API_URL } from 'constant'
import { AxiosError } from 'axios'
import { UseVehicleRateData } from 'data/useVehicleRate'

type UseVehicleRateResult = UseVehicleRateData

type TQueryFnData = UseVehicleRateResult
type TError = AxiosError

function useVehicleRateById(
  id: any,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey(['/vehicle-rate-by-id', id]),
    () =>
      ApiCall.api.get(
        urlQuery.transformUrl(`${BASE_API_URL}/vehicle-rate/${id}`),
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

export default useVehicleRateById
