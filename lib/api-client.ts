/**
 * Base API client configuration using Axios
 */

import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = getAuthToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      throw new ApiError(
        (error.response.data as any)?.message || error.message,
        error.response.status,
        error.response.data
      )
    }
    throw new ApiError(error.message, 0)
  }
)

export const apiClient = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint, config)
    return response.data
  },

  post: async <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(endpoint, data, config)
    return response.data
  },

  put: async <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.put<T>(endpoint, data, config)
    return response.data
  },

  delete: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(endpoint, config)
    return response.data
  },
}

export default axiosInstance
