import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from 'services/ApiCall'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@nexys/hooks/useUrlQuery/useUrlQuery'
import { AxiosError } from 'axios'
import { BASE_API_URL } from 'constant'
import { UseProductCategoryData } from 'data/useProductCategory'
import { UseWorkshopProductData } from 'data/useWorkshopProduct'

export interface UseInsuranceProductData {
  id: string
  name: string
  description: string
  picturePath?: string | null
  ProductCategoryId: string
  ProductCategory: UseProductCategoryData
  WorkshopProductId: string
  WorkshopProduct: UseWorkshopProductData
  benefit: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

type UseInsuranceProductResult = {
  data: UseInsuranceProductData[]
  total: number
}

type TQueryFnData = UseInsuranceProductResult
type TError = AxiosError

function useInsuranceProduct(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/insurance-product'),
    () =>
      ApiCall.api
        .get(urlQuery.transformUrl(`${BASE_API_URL}/insurance-product?`))
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

export default useInsuranceProduct
