import MYRequest from './request'
import localCache from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './request/config'

export default new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 同一个实例的所有请求
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache('token')
      if (token) {
        config.headers = {
          ['Authorization']: `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})
export const storyRequest = new MYRequest({
  baseURL: '/storyApi',
  timeout: TIME_OUT,
  // 同一个实例的所有请求
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache('token')
      if (token) {
        config.headers = {
          ['Authorization']: `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})
