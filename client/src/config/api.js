// API配置文件
const API_CONFIG = {
  // 开发环境
  development: {
    baseURL: 'http://localhost:8080',
    timeout: 300000
  },
  // 生产环境
  production: {
    baseURL: 'https://ai-imagegenerate.onrender.com',
    timeout: 300000
  }
}

// 获取当前环境
const getCurrentEnv = () => {
  // 检查是否在开发环境
  if (import.meta.env.DEV) {
    return 'development'
  }
  // 检查环境变量
  return import.meta.env.VITE_ENV || 'production'
}

// 获取当前配置
const getApiConfig = () => {
  const env = getCurrentEnv()
  return API_CONFIG[env] || API_CONFIG.production
}

// 创建axios实例
import axios from 'axios'

const apiClient = axios.create({
  baseURL: getApiConfig().baseURL,
  timeout: getApiConfig().timeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API请求: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ 请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API响应: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ 响应错误:', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

export default apiClient 