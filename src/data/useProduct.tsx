import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { BASE_API_URL } from 'constant'
import { UseVehicleBrandData } from 'data/useVehicleBrand'
import { UseVehicleSeriesData } from 'data/useVehicleSeries'
import { UseVehicleModelData } from 'data/useVehicleModel'
import { UseProductCategoryData } from 'data/useProductCategory'

export interface UseProductData {
  id: string
  name: string
  description: string
  price: number
  picturePath?: string | null
  dealerDiscount?: number | null
  sharaiDiscount?: number | null
  customerDiscount?: number | null
  VehicleBrandId: string
  VehicleBrand: UseVehicleBrandData
  VehicleSeriesId: string
  VehicleSeries: UseVehicleSeriesData
  VehicleModelId: string
  VehicleModel: UseVehicleModelData
  ProductCategoryId: string
  ProductCategories: UseProductCategoryData
  benefit: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type UseProductResult = {
  data: UseProductData[]
  total: number
}

type TQueryFnData = UseProductResult
type TError = AxiosError

function useProduct(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/product'),
    () =>
      ApiCall.api
        .get(urlQuery.transformUrl(`${BASE_API_URL}/product?`))
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

export default useProduct
