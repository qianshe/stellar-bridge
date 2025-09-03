import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { resourceService } from '@/services/resourceService';
import type {
  ResourceChannel,
  ResourceChannelListParams,
  CreateResourceChannelRequest,
  PaginationResponse,
} from '@/types/api';

// ============ 查询Keys ============
export const resourceChannelKeys = {
  all: ['resourceChannels'] as const,
  lists: () => [...resourceChannelKeys.all, 'list'] as const,
  list: (params: ResourceChannelListParams) => [...resourceChannelKeys.lists(), params] as const,
  details: () => [...resourceChannelKeys.all, 'detail'] as const,
  detail: (id: string) => [...resourceChannelKeys.details(), id] as const,
  recommended: () => [...resourceChannelKeys.all, 'recommended'] as const,
  trending: (params?: any) => [...resourceChannelKeys.all, 'trending', params] as const,
  search: (query: string, filters?: any) => [...resourceChannelKeys.all, 'search', query, filters] as const,
  similar: (id: string) => [...resourceChannelKeys.all, 'similar', id] as const,
  favorites: () => [...resourceChannelKeys.all, 'favorites'] as const,
  reviews: (id: string, params?: any) => [...resourceChannelKeys.all, 'reviews', id, params] as const,
};

// ============ 查询Hooks ============

/**
 * 获取资源通道列表
 */
export function useResourceChannels(params?: ResourceChannelListParams) {
  return useQuery({
    queryKey: resourceChannelKeys.list(params || {}),
    queryFn: () => resourceService.getResourceChannels(params),
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5分钟
  });
}

/**
 * 获取资源通道详情
 */
export function useResourceChannel(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: resourceChannelKeys.detail(id),
    queryFn: () => resourceService.getResourceChannel(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10分钟
  });
}

/**
 * 获取推荐资源通道
 */
export function useRecommendedChannels(limit: number = 10) {
  return useQuery({
    queryKey: resourceChannelKeys.recommended(),
    queryFn: () => resourceService.getRecommendedChannels(limit),
    staleTime: 15 * 60 * 1000, // 15分钟
  });
}

/**
 * 搜索资源通道
 */
export function useSearchResourceChannels(
  query: string,
  filters?: Partial<ResourceChannelListParams>,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: resourceChannelKeys.search(query, filters),
    queryFn: () => resourceService.searchResourceChannels(query, filters),
    enabled: enabled && !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2分钟
  });
}

/**
 * 获取热门资源
 */
export function useTrendingResources(params?: {
  period?: 'day' | 'week' | 'month';
  categoryId?: string;
  limit?: number;
}) {
  return useQuery({
    queryKey: resourceChannelKeys.trending(params),
    queryFn: () => resourceService.getTrendingResources(params),
    staleTime: 30 * 60 * 1000, // 30分钟
  });
}

/**
 * 获取相似资源推荐
 */
export function useSimilarResources(resourceId: string, limit: number = 5) {
  return useQuery({
    queryKey: resourceChannelKeys.similar(resourceId),
    queryFn: () => resourceService.getSimilarResources(resourceId, limit),
    enabled: !!resourceId,
    staleTime: 20 * 60 * 1000, // 20分钟
  });
}

/**
 * 获取用户收藏的资源
 */
export function useFavoriteResources(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: resourceChannelKeys.favorites(),
    queryFn: () => resourceService.getFavoriteResources(params),
    staleTime: 5 * 60 * 1000, // 5分钟
  });
}

/**
 * 获取资源评价列表
 */
export function useResourceReviews(
  resourceId: string,
  params?: {
    page?: number;
    pageSize?: number;
    sortBy?: 'latest' | 'rating' | 'helpful';
  }
) {
  return useQuery({
    queryKey: resourceChannelKeys.reviews(resourceId, params),
    queryFn: () => resourceService.getResourceReviews(resourceId, params),
    enabled: !!resourceId,
    staleTime: 10 * 60 * 1000, // 10分钟
  });
}

// ============ 变更Hooks ============

/**
 * 创建资源通道
 */
export function useCreateResourceChannel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResourceChannelRequest) => resourceService.createResourceChannel(data),
    onSuccess: (newResource) => {
      // 使相关查询失效
      queryClient.invalidateQueries({ queryKey: resourceChannelKeys.lists() });
      queryClient.invalidateQueries({ queryKey: resourceChannelKeys.recommended() });
      
      toast.success('资源通道创建成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '创建资源通道失败，请重试');
    },
  });
}

/**
 * 更新资源通道
 */
export function useUpdateResourceChannel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateResourceChannelRequest> }) =>
      resourceService.updateResourceChannel(id, data),
    onSuccess: (updatedResource, { id }) => {
      // 更新缓存中的详情数据
      queryClient.setQueryData(resourceChannelKeys.detail(id), updatedResource);
      
      // 使相关查询失效
      queryClient.invalidateQueries({ queryKey: resourceChannelKeys.lists() });
      
      toast.success('资源通道更新成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '更新资源通道失败，请重试');
    },
  });
}

/**
 * 删除资源通道
 */
export function useDeleteResourceChannel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resourceService.deleteResourceChannel(id),
    onSuccess: (_, id) => {
      // 移除详情缓存
      queryClient.removeQueries({ queryKey: resourceChannelKeys.detail(id) });
      
      // 使相关查询失效
      queryClient.invalidateQueries({ queryKey: resourceChannelKeys.lists() });
      
      toast.success('资源通道删除成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '删除资源通道失败，请重试');
    },
  });
}

/**
 * 收藏/取消收藏资源
 */
export function useToggleResourceFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resourceId: string) => resourceService.toggleResourceFavorite(resourceId),
    onSuccess: (result, resourceId) => {
      // 更新详情页面的收藏状态
      queryClient.setQueryData(
        resourceChannelKeys.detail(resourceId),
        (oldData: ResourceChannel | undefined) => {
          if (oldData) {
            return { ...oldData, favorited: result.favorited };
          }
          return oldData;
        }
      );

      // 使收藏列表失效
      queryClient.invalidateQueries({ queryKey: resourceChannelKeys.favorites() });

      toast.success(result.favorited ? '已添加到收藏' : '已取消收藏');
    },
    onError: (error: any) => {
      toast.error(error.message || '操作失败，请重试');
    },
  });
}

/**
 * 评价资源
 */
export function useRateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ resourceId, data }: {
      resourceId: string;
      data: { rating: number; comment?: string; tags?: string[] };
    }) => resourceService.rateResource(resourceId, data),
    onSuccess: (_, { resourceId }) => {
      // 使评价列表失效
      queryClient.invalidateQueries({ queryKey: resourceChannelKeys.reviews(resourceId) });
      
      // 使资源详情失效（更新评分）
      queryClient.invalidateQueries({ queryKey: resourceChannelKeys.detail(resourceId) });
      
      toast.success('评价提交成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '评价提交失败，请重试');
    },
  });
}

/**
 * 记录资源浏览
 */
export function useRecordResourceView() {
  return useMutation({
    mutationFn: (resourceId: string) => resourceService.recordResourceView(resourceId),
    // 静默执行，不显示错误提示
    onError: () => {
      // 浏览记录失败不影响用户体验，静默处理
    },
  });
}
