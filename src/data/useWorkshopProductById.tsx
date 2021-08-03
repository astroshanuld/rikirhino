import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { BASE_API_URL } from 'constant'
import { AxiosError } from 'axios'
import { UseWorkshopProductData } from 'data/useWorkshopProduct'

type UseWorkshopProductResult = UseWorkshopProductData

type TQueryFnData = UseWorkshopProductResult
type TError = AxiosError

function useWorkshopProductById(
  id: any,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey(['/workshop-product-by-id', id]),
    () =>
      ApiCall.api.get(
        urlQuery.transformUrl(`${BASE_API_URL}/workshop-product/${id}`),
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

export default useWorkshopProductById
