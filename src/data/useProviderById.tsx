import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { BASE_API_URL } from 'constant'
import { AxiosError } from 'axios'
import { UseProviderData } from 'data/useProvider'

type UseProviderResult = UseProviderData

type TQueryFnData = UseProviderResult
type TError = AxiosError

function useProviderById(
  id: any,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey(['/provider-by-id', id]),
    () =>
      ApiCall.api.get(urlQuery.transformUrl(`${BASE_API_URL}/provider/${id}`)),
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

export default useProviderById
