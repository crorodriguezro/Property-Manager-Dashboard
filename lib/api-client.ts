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
  async (config) => {
    // Add auth token if available
    const { authService } = await import('@/services/auth-service')
    const token = authService.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (error.response) {
      // Handle 401 Unauthorized - try to refresh token
      if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const { authService } = await import('@/services/auth-service')
          const refreshToken = authService.getRefreshToken()

          if (refreshToken) {
            const newTokens = await authService.refreshToken(refreshToken)
            authService.storeTokens(newTokens)

            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`
            return axiosInstance(originalRequest)
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          // If refresh fails, redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login'
          }
        }
      }

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
