import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { BASE_API_URL } from 'constant'
import { UseUserData } from 'data/useUser'

export interface UseProviderData {
  id: string
  UserId: string
  User: UseUserData
  name: string
  legalEntity: string
  picturePath: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type UseProviderResult = {
  data: UseProviderData[]
  total: number
}

type TQueryFnData = UseProviderResult
type TError = AxiosError

function useProvider(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/provider'),
    () =>
      ApiCall.api
        .get(urlQuery.transformUrl(`${BASE_API_URL}/provider?`))
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

export default useProvider
