import { api } from '@/lib/api';
import type {
  ResourceChannel,
  ResourceCategory,
  ResourceProvider,
  ResourceChannelListParams,
  CreateResourceChannelRequest,
  PaginationResponse,
} from '@/types/api';

/**
 * 资源服务API
 * 处理所有与资源相关的API请求
 */
export class ResourceService {
  // ============ 资源通道相关 ============

  /**
   * 获取资源通道列表
   */
  static async getResourceChannels(params?: ResourceChannelListParams): Promise<PaginationResponse<ResourceChannel>> {
    return api.get('/resources/channels', { params });
  }

  /**
   * 获取资源通道详情
   */
  static async getResourceChannel(id: string): Promise<ResourceChannel> {
    return api.get(`/resources/channels/${id}`);
  }

  /**
   * 创建资源通道
   */
  static async createResourceChannel(data: CreateResourceChannelRequest): Promise<ResourceChannel> {
    return api.post('/resources/channels', data);
  }

  /**
   * 更新资源通道
   */
  static async updateResourceChannel(id: string, data: Partial<CreateResourceChannelRequest>): Promise<ResourceChannel> {
    return api.put(`/resources/channels/${id}`, data);
  }

  /**
   * 删除资源通道
   */
  static async deleteResourceChannel(id: string): Promise<void> {
    return api.delete(`/resources/channels/${id}`);
  }

  /**
   * 获取推荐资源通道
   */
  static async getRecommendedChannels(limit: number = 10): Promise<ResourceChannel[]> {
    return api.get('/resources/channels/recommended', { params: { limit } });
  }

  /**
   * 搜索资源通道
   */
  static async searchResourceChannels(query: string, filters?: Partial<ResourceChannelListParams>): Promise<PaginationResponse<ResourceChannel>> {
    return api.get('/resources/channels/search', { 
      params: { 
        q: query,
        ...filters 
      } 
    });
  }

  // ============ 资源分类相关 ============

  /**
   * 获取资源分类列表
   */
  static async getResourceCategories(): Promise<ResourceCategory[]> {
    return api.get('/resources/categories');
  }

  /**
   * 获取资源分类详情
   */
  static async getResourceCategory(id: string): Promise<ResourceCategory> {
    return api.get(`/resources/categories/${id}`);
  }

  /**
   * 获取分类下的资源统计
   */
  static async getCategoryStats(id: string): Promise<{
    totalResources: number;
    totalProviders: number;
    averagePrice: number;
    popularTags: string[];
  }> {
    return api.get(`/resources/categories/${id}/stats`);
  }

  // ============ 资源提供商相关 ============

  /**
   * 获取资源提供商列表
   */
  static async getResourceProviders(params?: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    verified?: boolean;
    sortBy?: 'rating' | 'resources' | 'joinedAt';
  }): Promise<PaginationResponse<ResourceProvider>> {
    return api.get('/resources/providers', { params });
  }

  /**
   * 获取资源提供商详情
   */
  static async getResourceProvider(id: string): Promise<ResourceProvider> {
    return api.get(`/resources/providers/${id}`);
  }

  /**
   * 获取提供商的资源列表
   */
  static async getProviderResources(providerId: string, params?: ResourceChannelListParams): Promise<PaginationResponse<ResourceChannel>> {
    return api.get(`/resources/providers/${providerId}/channels`, { params });
  }

  /**
   * 关注/取消关注提供商
   */
  static async toggleProviderFollow(providerId: string): Promise<{ following: boolean }> {
    return api.post(`/resources/providers/${providerId}/follow`);
  }

  // ============ 资源收藏和评价 ============

  /**
   * 收藏/取消收藏资源
   */
  static async toggleResourceFavorite(resourceId: string): Promise<{ favorited: boolean }> {
    return api.post(`/resources/channels/${resourceId}/favorite`);
  }

  /**
   * 获取用户收藏的资源
   */
  static async getFavoriteResources(params?: {
    page?: number;
    pageSize?: number;
  }): Promise<PaginationResponse<ResourceChannel>> {
    return api.get('/resources/favorites', { params });
  }

  /**
   * 评价资源
   */
  static async rateResource(resourceId: string, data: {
    rating: number;
    comment?: string;
    tags?: string[];
  }): Promise<void> {
    return api.post(`/resources/channels/${resourceId}/reviews`, data);
  }

  /**
   * 获取资源评价列表
   */
  static async getResourceReviews(resourceId: string, params?: {
    page?: number;
    pageSize?: number;
    sortBy?: 'latest' | 'rating' | 'helpful';
  }): Promise<PaginationResponse<{
    id: string;
    user: {
      id: string;
      username: string;
      avatar?: string;
    };
    rating: number;
    comment: string;
    tags: string[];
    helpful: number;
    createdAt: string;
  }>> {
    return api.get(`/resources/channels/${resourceId}/reviews`, { params });
  }

  // ============ 资源统计和分析 ============

  /**
   * 获取资源浏览统计
   */
  static async getResourceViewStats(resourceId: string): Promise<{
    totalViews: number;
    uniqueViews: number;
    viewsToday: number;
    viewsTrend: { date: string; views: number }[];
  }> {
    return api.get(`/resources/channels/${resourceId}/stats/views`);
  }

  /**
   * 记录资源浏览
   */
  static async recordResourceView(resourceId: string): Promise<void> {
    return api.post(`/resources/channels/${resourceId}/view`, {}, { skipAuth: true });
  }

  /**
   * 获取热门资源
   */
  static async getTrendingResources(params?: {
    period?: 'day' | 'week' | 'month';
    categoryId?: string;
    limit?: number;
  }): Promise<ResourceChannel[]> {
    return api.get('/resources/trending', { params });
  }

  /**
   * 获取相似资源推荐
   */
  static async getSimilarResources(resourceId: string, limit: number = 5): Promise<ResourceChannel[]> {
    return api.get(`/resources/channels/${resourceId}/similar`, { params: { limit } });
  }

  // ============ 资源图片上传 ============

  /**
   * 上传资源图片
   */
  static async uploadResourceImage(file: File, onProgress?: (progress: number) => void): Promise<{
    url: string;
    filename: string;
    size: number;
  }> {
    return api.upload('/resources/upload/image', file, onProgress);
  }

  /**
   * 批量上传资源图片
   */
  static async uploadResourceImages(files: File[], onProgress?: (progress: number) => void): Promise<{
    urls: string[];
    failed: string[];
  }> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    return api.post('/resources/upload/images', formData, {
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
  }
}

// 导出默认实例
export const resourceService = ResourceService;
