import axios from 'axios'
import { message } from 'antd'

// 创建 axios 实例
const service = axios.create({
  timeout: 30000, // 请求超时时间
})

const err = (error: any) => {
  if (error.response) {
    message.error(error.response.data.message)
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    // @ts-ignore
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  }
  config.headers['Lang'] = localStorage.getItem('lang') || 'en_US'

  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  const { status: code, data, statusText: msg } = response
  return data
}, err)

export default service
