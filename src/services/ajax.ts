import { message } from 'antd'
import axios from 'axios'
import { getToken } from '@/utils/user-token'

const instance = axios.create({
  timeout: 10000,
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    //添加token
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` //JWT的固定格式
    }
    return config
  },
  error => Promise.reject(error),
)

// response 拦截：统一处理errno 和 msg
instance.interceptors.response.use(res => {
  const reqData = (res.data || {}) as ResType
  const { errno, data, msg } = reqData

  if (errno !== 0) {
    //错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }

  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: any
  msg?: string
}

export type ResDataType = {
  [key: string]: any
  //对象中的key是字符串类型，值是任意类型
}
