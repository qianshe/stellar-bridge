import { api } from '@/lib/api';
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserProfile,
} from '@/types/api';

/**
 * 认证服务API
 * 处理用户认证、注册、个人资料等相关请求
 */
export class AuthService {
  // ============ 认证相关 ============

  /**
   * 用户登录
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials, { skipAuth: true });
    
    // 登录成功后保存token
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('user_info', JSON.stringify(response.user));
    }
    
    return response;
  }

  /**
   * 用户注册
   */
  static async register(userData: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register', userData, { skipAuth: true });
    
    // 注册成功后自动登录
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('user_info', JSON.stringify(response.user));
    }
    
    return response;
  }

  /**
   * 用户登出
   */
  static async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // 无论API调用是否成功，都清除本地存储
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_info');
    }
  }

  /**
   * 刷新访问令牌
   */
  static async refreshToken(): Promise<{ token: string; expiresIn: number }> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<{ token: string; expiresIn: number }>('/auth/refresh', {
      refreshToken,
    }, { skipAuth: true });

    // 更新token
    localStorage.setItem('auth_token', response.token);
    
    return response;
  }

  /**
   * 验证当前token是否有效
   */
  static async validateToken(): Promise<{ valid: boolean; user?: User }> {
    try {
      const response = await api.get<{ user: User }>('/auth/validate');
      return { valid: true, user: response.user };
    } catch (error) {
      return { valid: false };
    }
  }

  // ============ 密码相关 ============

  /**
   * 发送密码重置邮件
   */
  static async sendPasswordResetEmail(email: string): Promise<{ message: string }> {
    return api.post('/auth/password/reset-request', { email }, { skipAuth: true });
  }

  /**
   * 重置密码
   */
  static async resetPassword(data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<{ message: string }> {
    return api.post('/auth/password/reset', data, { skipAuth: true });
  }

  /**
   * 修改密码
   */
  static async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<{ message: string }> {
    return api.post('/auth/password/change', data);
  }

  // ============ 用户信息相关 ============

  /**
   * 获取当前用户信息
   */
  static async getCurrentUser(): Promise<User> {
    return api.get('/auth/me');
  }

  /**
   * 更新用户基本信息
   */
  static async updateUserInfo(data: Partial<Pick<User, 'username' | 'email'>>): Promise<User> {
    const response = await api.put<User>('/auth/me', data);
    
    // 更新本地存储的用户信息
    localStorage.setItem('user_info', JSON.stringify(response));
    
    return response;
  }

  /**
   * 更新用户个人资料
   */
  static async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    return api.put('/auth/me/profile', profile);
  }

  /**
   * 上传用户头像
   */
  static async uploadAvatar(file: File, onProgress?: (progress: number) => void): Promise<{ avatarUrl: string }> {
    return api.upload('/auth/me/avatar', file, onProgress);
  }

  // ============ 账户安全相关 ============

  /**
   * 发送邮箱验证码
   */
  static async sendEmailVerification(): Promise<{ message: string }> {
    return api.post('/auth/email/send-verification');
  }

  /**
   * 验证邮箱
   */
  static async verifyEmail(token: string): Promise<{ message: string }> {
    return api.post('/auth/email/verify', { token }, { skipAuth: true });
  }

  /**
   * 发送手机验证码
   */
  static async sendPhoneVerification(phone: string): Promise<{ message: string }> {
    return api.post('/auth/phone/send-verification', { phone });
  }

  /**
   * 验证手机号
   */
  static async verifyPhone(data: {
    phone: string;
    code: string;
  }): Promise<{ message: string }> {
    return api.post('/auth/phone/verify', data);
  }

  /**
   * 启用/禁用双因素认证
   */
  static async toggleTwoFactorAuth(enabled: boolean): Promise<{
    enabled: boolean;
    qrCode?: string;
    backupCodes?: string[];
  }> {
    return api.post('/auth/2fa/toggle', { enabled });
  }

  /**
   * 验证双因素认证码
   */
  static async verifyTwoFactorCode(code: string): Promise<{ valid: boolean }> {
    return api.post('/auth/2fa/verify', { code });
  }

  // ============ 会话管理 ============

  /**
   * 获取活跃会话列表
   */
  static async getActiveSessions(): Promise<{
    id: string;
    device: string;
    location: string;
    ip: string;
    current: boolean;
    lastActive: string;
  }[]> {
    return api.get('/auth/sessions');
  }

  /**
   * 终止指定会话
   */
  static async terminateSession(sessionId: string): Promise<{ message: string }> {
    return api.delete(`/auth/sessions/${sessionId}`);
  }

  /**
   * 终止所有其他会话
   */
  static async terminateAllOtherSessions(): Promise<{ message: string; terminatedCount: number }> {
    return api.post('/auth/sessions/terminate-others');
  }

  // ============ 工具方法 ============

  /**
   * 检查用户是否已登录
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const userInfo = localStorage.getItem('user_info');
    return !!(token && userInfo);
  }

  /**
   * 获取本地存储的用户信息
   */
  static getLocalUserInfo(): User | null {
    try {
      const userInfo = localStorage.getItem('user_info');
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('Failed to parse user info from localStorage:', error);
      return null;
    }
  }

  /**
   * 获取当前访问令牌
   */
  static getAccessToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * 清除所有认证相关的本地存储
   */
  static clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
  }
}

// 导出默认实例
export const authService = AuthService;
