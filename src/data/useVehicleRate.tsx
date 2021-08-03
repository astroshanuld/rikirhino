import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { BASE_API_URL } from 'constant'

export interface UseVehicleRateData {
  id: string
  platArea: string
  wilayahOJK: string
  tarif_TSFWD_Compre?: string | null
  tarif_TSFWD_TLO?: string | null
  tarif_EQ_Compre?: string | null
  tarif_EQ_TLO?: string | null
  '1C_0-125'?: string | null
  '2C_>_125-200'?: string | null
  '3C_>_200-400'?: string | null
  '4C_>_400-800'?: string | null
  '5C_>_800'?: string | null
  '1TLO_0-125'?: string | null
  '2TLO_>_125-200'?: string | null
  '3TLO_>_200-400'?: string | null
  '4TLO_>_400-800'?: string | null
  '5TLO_>_800'?: string | null
  SRCC_Com?: string | null
  SRCC_TLO?: string | null
  TS_Com?: string | null
  TS_TLO?: string | null
  R2TLO?: string | null
  keterangan: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type UseVehicleRateResult = {
  data: UseVehicleRateData[]
  total: number
}

type TQueryFnData = UseVehicleRateResult
type TError = AxiosError

function useVehicleRate(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/vehicle-rate'),
    () =>
      ApiCall.api
        .get(urlQuery.transformUrl(`${BASE_API_URL}/vehicle-rate?`))
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

export default useVehicleRate
