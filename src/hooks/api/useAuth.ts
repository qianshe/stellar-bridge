import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  UserProfile,
} from '@/types/api';

// ============ 查询Keys ============
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  sessions: () => [...authKeys.all, 'sessions'] as const,
  validate: () => [...authKeys.all, 'validate'] as const,
};

// ============ 查询Hooks ============

/**
 * 获取当前用户信息
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getCurrentUser(),
    enabled: authService.isAuthenticated(),
    staleTime: 10 * 60 * 1000, // 10分钟
    retry: (failureCount, error: any) => {
      // 如果是401错误，不重试
      if (error?.code === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * 验证当前token
 */
export function useValidateToken() {
  return useQuery({
    queryKey: authKeys.validate(),
    queryFn: () => authService.validateToken(),
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5分钟
    retry: false,
  });
}

/**
 * 获取活跃会话列表
 */
export function useActiveSessions() {
  return useQuery({
    queryKey: authKeys.sessions(),
    queryFn: () => authService.getActiveSessions(),
    enabled: authService.isAuthenticated(),
    staleTime: 2 * 60 * 1000, // 2分钟
  });
}

// ============ 变更Hooks ============

/**
 * 用户登录
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (response) => {
      // 设置用户数据到缓存
      queryClient.setQueryData(authKeys.user(), response.user);
      
      // 使所有认证相关查询失效
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      
      toast.success('登录成功！');
      
      // 跳转到首页或之前的页面
      const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/';
      navigate(redirectTo);
    },
    onError: (error: any) => {
      toast.error(error.message || '登录失败，请检查用户名和密码');
    },
  });
}

/**
 * 用户注册
 */
export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (response) => {
      // 设置用户数据到缓存
      queryClient.setQueryData(authKeys.user(), response.user);
      
      // 使所有认证相关查询失效
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      
      toast.success('注册成功！欢迎加入星空平台！');
      
      // 跳转到首页
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(error.message || '注册失败，请重试');
    },
  });
}

/**
 * 用户登出
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // 清除所有缓存
      queryClient.clear();
      
      toast.success('已安全退出');
      
      // 跳转到登录页
      navigate('/login');
    },
    onError: (error: any) => {
      // 即使API调用失败，也要清除本地数据
      authService.clearAuthData();
      queryClient.clear();
      
      toast.error(error.message || '退出时发生错误');
      navigate('/login');
    },
  });
}

/**
 * 更新用户基本信息
 */
export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Pick<User, 'username' | 'email'>>) => 
      authService.updateUserInfo(data),
    onSuccess: (updatedUser) => {
      // 更新用户缓存
      queryClient.setQueryData(authKeys.user(), updatedUser);
      
      toast.success('个人信息更新成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '更新失败，请重试');
    },
  });
}

/**
 * 更新用户个人资料
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: Partial<UserProfile>) => 
      authService.updateUserProfile(profile),
    onSuccess: (updatedProfile) => {
      // 更新用户缓存中的profile部分
      queryClient.setQueryData(authKeys.user(), (oldData: User | undefined) => {
        if (oldData) {
          return { ...oldData, profile: { ...oldData.profile, ...updatedProfile } };
        }
        return oldData;
      });
      
      toast.success('个人资料更新成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '更新失败，请重试');
    },
  });
}

/**
 * 上传用户头像
 */
export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (progress: number) => void }) =>
      authService.uploadAvatar(file, onProgress),
    onSuccess: (result) => {
      // 更新用户缓存中的头像
      queryClient.setQueryData(authKeys.user(), (oldData: User | undefined) => {
        if (oldData) {
          return { ...oldData, avatar: result.avatarUrl };
        }
        return oldData;
      });
      
      toast.success('头像上传成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '头像上传失败，请重试');
    },
  });
}

/**
 * 修改密码
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => authService.changePassword(data),
    onSuccess: () => {
      toast.success('密码修改成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '密码修改失败，请重试');
    },
  });
}

/**
 * 发送密码重置邮件
 */
export function useSendPasswordResetEmail() {
  return useMutation({
    mutationFn: (email: string) => authService.sendPasswordResetEmail(email),
    onSuccess: () => {
      toast.success('密码重置邮件已发送，请查收邮箱');
    },
    onError: (error: any) => {
      toast.error(error.message || '发送失败，请重试');
    },
  });
}

/**
 * 重置密码
 */
export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: {
      token: string;
      newPassword: string;
      confirmPassword: string;
    }) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success('密码重置成功，请使用新密码登录');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error.message || '密码重置失败，请重试');
    },
  });
}

/**
 * 发送邮箱验证
 */
export function useSendEmailVerification() {
  return useMutation({
    mutationFn: () => authService.sendEmailVerification(),
    onSuccess: () => {
      toast.success('验证邮件已发送，请查收邮箱');
    },
    onError: (error: any) => {
      toast.error(error.message || '发送失败，请重试');
    },
  });
}

/**
 * 验证邮箱
 */
export function useVerifyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: () => {
      // 使用户信息失效，重新获取
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      
      toast.success('邮箱验证成功！');
    },
    onError: (error: any) => {
      toast.error(error.message || '邮箱验证失败');
    },
  });
}

/**
 * 终止会话
 */
export function useTerminateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => authService.terminateSession(sessionId),
    onSuccess: () => {
      // 刷新会话列表
      queryClient.invalidateQueries({ queryKey: authKeys.sessions() });
      
      toast.success('会话已终止');
    },
    onError: (error: any) => {
      toast.error(error.message || '操作失败，请重试');
    },
  });
}

/**
 * 终止所有其他会话
 */
export function useTerminateAllOtherSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.terminateAllOtherSessions(),
    onSuccess: (result) => {
      // 刷新会话列表
      queryClient.invalidateQueries({ queryKey: authKeys.sessions() });
      
      toast.success(`已终止 ${result.terminatedCount} 个会话`);
    },
    onError: (error: any) => {
      toast.error(error.message || '操作失败，请重试');
    },
  });
}

// ============ 工具Hooks ============

/**
 * 检查用户是否已认证
 */
export function useIsAuthenticated() {
  const { data: user, isLoading } = useCurrentUser();
  return {
    isAuthenticated: !!user && authService.isAuthenticated(),
    isLoading,
    user,
  };
}
