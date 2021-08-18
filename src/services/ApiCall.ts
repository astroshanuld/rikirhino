import Fetcher from 'services/Fetcher'
import { AxiosInstance } from 'axios'
import { BASE_API_URL } from 'constant'
import { IWorkshopProductPost } from 'views/Admin/Product/Workshop/Form'
import { IProviderPost } from 'views/Admin/Settings/Account/Provider/Form'
import { IGaragePost } from 'views/Admin/Settings/Account/Garage/Form'

interface IMultipleIds {
  ids: string | string[]
}

class BaseApiCall {
  public api: AxiosInstance

  constructor() {
    this.api = Fetcher.createAuthAxios(BASE_API_URL, 'token_trasmi')
  }

  logout(data: any) {
    return this.api.post(`/logout`, data)
  }

  User = {
    create: (data: any) => {
      return this.api.post(`/user`, data)
    },
    update: (id: string, data: any) => {
      return this.api.put(`/user/${id}`, data)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/user/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/user/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/user/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/user/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/user/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/user/multiple/restore`, data)
    },
  }

  Role = {
    create: (data: any) => {
      return this.api.post(`/role`, data)
    },
    update: (id: string, data: any) => {
      return this.api.put(`/role/${id}`, data)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/role/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/role/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/role/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/role/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/role/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/role/multiple/restore`, data)
    },
  }

  WorkshopProduct = {
    create: (data: IWorkshopProductPost) => {
      const formData = new FormData()
      Object.entries(data).forEach((items) => {
        const [key, value] = items

        // file multiple upload
        if (key === 'workshopProductImage') {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i += 1) {
              const item = value[i]

              formData.append(`workshopProductImage`, item)
            }
          } else {
            formData.append(key, value)
          }
        } else {
          formData.append(key, value)
        }
      })

      return this.api.post(`/workshop-product`, formData)
    },
    update: (id: string, data: IWorkshopProductPost) => {
      const formData = new FormData()
      Object.entries(data).forEach((items) => {
        const [key, value] = items

        // file multiple upload
        if (key === 'workshopProductImage') {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i += 1) {
              const item = value[i]

              formData.append(`workshopProductImage`, item)
            }
          } else {
            formData.append(key, value)
          }
        } else {
          formData.append(key, value)
        }
      })

      return this.api.put(`/workshop-product/${id}`, formData)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/workshop-product/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/workshop-product/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/workshop-product/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/workshop-product/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/workshop-product/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/workshop-product/multiple/restore`, data)
    },
  }

  InsuranceProduct = {
    create: (data: IWorkshopProductPost) => {
      const formData = new FormData()
      Object.entries(data).forEach((items) => {
        const [key, value] = items

        // file multiple upload
        if (key === 'insuranceProductImage') {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i += 1) {
              const item = value[i]

              formData.append(`insuranceProductImage`, item)
            }
          } else {
            formData.append(key, value)
          }
        } else {
          formData.append(key, value)
        }
      })

      return this.api.post(`/insurance-product`, formData)
    },
    update: (id: string, data: IWorkshopProductPost) => {
      const formData = new FormData()
      Object.entries(data).forEach((items) => {
        const [key, value] = items

        // file multiple upload
        if (key === 'insuranceProductImage') {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i += 1) {
              const item = value[i]

              formData.append(`insuranceProductImage`, item)
            }
          } else {
            formData.append(key, value)
          }
        } else {
          formData.append(key, value)
        }
      })

      return this.api.put(`/insurance-product/${id}`, formData)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/insurance-product/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/insurance-product/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/insurance-product/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/insurance-product/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/insurance-product/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/insurance-product/multiple/restore`, data)
    },
  }

  Provider = {
    create: (data: IProviderPost) => {
      const formData = new FormData()
      Object.entries(data).forEach((items) => {
        const [key, value] = items

        // file multiple upload
        if (key === 'providerImage') {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i += 1) {
              const item = value[i]

              formData.append(`providerImage`, item)
            }
          } else {
            formData.append(key, value)
          }
        } else {
          formData.append(key, value)
        }
      })

      return this.api.post(`/provider`, formData)
    },
    update: (id: string, data: IProviderPost) => {
      const formData = new FormData()
      Object.entries(data).forEach((items) => {
        const [key, value] = items

        // file multiple upload
        if (key === 'providerImage') {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i += 1) {
              const item = value[i]

              formData.append(`providerImage`, item)
            }
          } else {
            formData.append(key, value)
          }
        } else {
          formData.append(key, value)
        }
      })

      return this.api.put(`/provider/${id}`, formData)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/provider/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/provider/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/provider/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/provider/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/provider/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/provider/multiple/restore`, data)
    },
  }

  Garage = {
    create: (data: IGaragePost) => {
      const formData = new FormData()
      Object.entries(data).forEach((items) => {
        const [key, value] = items

        // file multiple upload
        if (key === 'garageImage') {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i += 1) {
              const item = value[i]

              formData.append(`garageImage`, item)
            }
          } else {
            formData.append(key, value)
          }
        } else {
          formData.append(key, value)
        }
      })

      return this.api.post(`/garage`, formData)
    },
    update: (id: string, data: IGaragePost) => {
      const formData = new FormData()
      Object.entries(data).forEach((items) => {
        const [key, value] = items

        // file multiple upload
        if (key === 'garageImage') {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i += 1) {
              const item = value[i]

              formData.append(`garageImage`, item)
            }
          } else {
            formData.append(key, value)
          }
        } else {
          formData.append(key, value)
        }
      })

      return this.api.put(`/garage/${id}`, formData)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/garage/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/garage/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/garage/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/garage/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/garage/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/garage/multiple/restore`, data)
    },
  }

  // Master Data
  ProductCategory = {
    create: (data: any) => {
      return this.api.post(`/product-category`, data)
    },
    update: (id: string, data: any) => {
      return this.api.put(`/product-category/${id}`, data)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/product-category/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/product-category/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/product-category/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/product-category/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/product-category/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/product-category/multiple/restore`, data)
    },
  }

  VehicleBrand = {
    create: (data: any) => {
      return this.api.post(`/vehicle-brand`, data)
    },
    update: (id: string, data: any) => {
      return this.api.put(`/vehicle-brand/${id}`, data)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/vehicle-brand/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/vehicle-brand/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/vehicle-brand/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-brand/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-brand/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-brand/multiple/restore`, data)
    },
  }

  VehicleSeries = {
    create: (data: any) => {
      return this.api.post(`/vehicle-series`, data)
    },
    update: (id: string, data: any) => {
      return this.api.put(`/vehicle-series/${id}`, data)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/vehicle-series/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/vehicle-series/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/vehicle-series/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-series/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-series/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-series/multiple/restore`, data)
    },
  }

  VehicleModel = {
    create: (data: any) => {
      return this.api.post(`/vehicle-model`, data)
    },
    update: (id: string, data: any) => {
      return this.api.put(`/vehicle-model/${id}`, data)
    },
    softDelete: (id: string) => {
      return this.api.delete(`/vehicle-model/soft-delete/${id}`)
    },
    forceDelete: (id: string) => {
      return this.api.delete(`/vehicle-model/force-delete/${id}`)
    },
    restore: (id: string) => {
      return this.api.put(`/vehicle-model/restore/${id}`)
    },
    multipleSoftDelete: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-model/multiple/soft-delete`, data)
    },
    multipleForceDelete: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-model/multiple/force-delete`, data)
    },
    multipleRestore: (data: IMultipleIds) => {
      return this.api.post(`/vehicle-model/multiple/restore`, data)
    },
  }

  VehicleRate = {
    create: (data: any) => {
      return this.api.post(`/vehicle-rate`, data)
    },
  }
}

const ApiCall = new BaseApiCall()

export default ApiCall
