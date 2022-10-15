import { AxiosRequestConfig, AxiosResponse } from 'axios'
interface MyRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (confog: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}
interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>
  showLoading?: boolean
}
export { MyRequestInterceptors, MyRequestConfig }
