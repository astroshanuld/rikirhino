import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { BASE_API_URL } from 'constant'
import { AxiosError } from 'axios'
import { UseGarageData } from 'data/useGarage'

type UseGarageResult = UseGarageData

type TQueryFnData = UseGarageResult
type TError = AxiosError

function useGarageById(
  id: any,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey(['/garage-by-id', id]),
    () =>
      ApiCall.api.get(urlQuery.transformUrl(`${BASE_API_URL}/garage/${id}`)),
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

export default useGarageById
