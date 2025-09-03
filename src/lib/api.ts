import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API响应基础类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// API错误类型
export interface ApiError {
  code: number;
  message: string;
  details?: any;
}

// 请求配置扩展
export interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorHandler?: boolean;
}

class ApiClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor() {
    // 根据环境设置baseURL
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
    
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        // 添加认证token
        const token = localStorage.getItem('auth_token');
        if (token && !config.skipAuth) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求ID用于追踪
        config.headers['X-Request-ID'] = this.generateRequestId();

        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });

        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data,
        });

        // 统一处理业务错误
        if (response.data && !response.data.success) {
          const error: ApiError = {
            code: response.data.code,
            message: response.data.message,
            details: response.data,
          };
          return Promise.reject(error);
        }

        return response;
      },
      (error) => {
        console.error('❌ Response Error:', error);

        // 处理网络错误
        if (!error.response) {
          const networkError: ApiError = {
            code: -1,
            message: '网络连接失败，请检查网络设置',
          };
          return Promise.reject(networkError);
        }

        // 处理HTTP状态码错误
        const { status, data } = error.response;
        let apiError: ApiError;

        switch (status) {
          case 401:
            // 未授权，清除token并跳转登录
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
            apiError = {
              code: 401,
              message: '登录已过期，请重新登录',
            };
            break;
          case 403:
            apiError = {
              code: 403,
              message: '权限不足，无法访问该资源',
            };
            break;
          case 404:
            apiError = {
              code: 404,
              message: '请求的资源不存在',
            };
            break;
          case 500:
            apiError = {
              code: 500,
              message: '服务器内部错误，请稍后重试',
            };
            break;
          default:
            apiError = {
              code: status,
              message: data?.message || '请求失败，请稍后重试',
              details: data,
            };
        }

        return Promise.reject(apiError);
      }
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // GET请求
  async get<T = any>(url: string, config?: ApiRequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  // POST请求
  async post<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  // PUT请求
  async put<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  // DELETE请求
  async delete<T = any>(url: string, config?: ApiRequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  // PATCH请求
  async patch<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  // 上传文件
  async upload<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.instance.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data.data;
  }

  // 获取原始axios实例（用于特殊需求）
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// 创建全局API客户端实例
export const api = new ApiClient();

// 导出类型
export type { ApiRequestConfig, ApiResponse, ApiError };
