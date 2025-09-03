// ============ 基础类型定义 ============

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterParams {
  keyword?: string;
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// ============ 用户相关类型 ============

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'provider';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  realName?: string;
  phone?: string;
  company?: string;
  position?: string;
  bio?: string;
  location?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

// ============ 资源相关类型 ============

export interface ResourceChannel {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  provider: ResourceProvider;
  status: 'active' | 'inactive' | 'pending';
  tags: string[];
  images: string[];
  specifications: Record<string, any>;
  pricing: ResourcePricing;
  availability: ResourceAvailability;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  parentId?: string;
  children?: ResourceCategory[];
}

export interface ResourceProvider {
  id: string;
  name: string;
  company: string;
  avatar?: string;
  verified: boolean;
  rating: number;
  totalResources: number;
  joinedAt: string;
  contact: {
    email: string;
    phone?: string;
    website?: string;
  };
}

export interface ResourcePricing {
  type: 'fixed' | 'negotiable' | 'auction';
  basePrice?: number;
  currency: string;
  unit?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  discounts?: {
    quantity: number;
    discount: number;
  }[];
}

export interface ResourceAvailability {
  inStock: boolean;
  quantity?: number;
  location: string;
  deliveryTime?: string;
  deliveryMethods: string[];
}

// ============ 需求相关类型 ============

export interface Demand {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  requester: User;
  status: 'draft' | 'published' | 'matched' | 'completed' | 'cancelled';
  requirements: DemandRequirement[];
  budget: DemandBudget;
  timeline: DemandTimeline;
  location: string;
  tags: string[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface DemandRequirement {
  id: string;
  name: string;
  description: string;
  type: 'required' | 'preferred' | 'optional';
  specifications: Record<string, any>;
}

export interface DemandBudget {
  type: 'fixed' | 'range' | 'negotiable';
  amount?: number;
  range?: {
    min: number;
    max: number;
  };
  currency: string;
  paymentTerms?: string;
}

export interface DemandTimeline {
  startDate?: string;
  endDate?: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  milestones?: {
    name: string;
    date: string;
    description?: string;
  }[];
}

// ============ 连接/匹配相关类型 ============

export interface ResourceConnection {
  id: string;
  demand: Demand;
  resource: ResourceChannel;
  status: 'pending' | 'accepted' | 'rejected' | 'in_progress' | 'completed' | 'cancelled';
  proposedTerms: ConnectionTerms;
  negotiationHistory: NegotiationMessage[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface ConnectionTerms {
  price: number;
  currency: string;
  quantity: number;
  deliveryDate: string;
  deliveryLocation: string;
  paymentTerms: string;
  additionalTerms?: string;
}

export interface NegotiationMessage {
  id: string;
  sender: User;
  message: string;
  proposedChanges?: Partial<ConnectionTerms>;
  createdAt: string;
}

// ============ 统计数据类型 ============

export interface PlatformStats {
  totalUsers: number;
  totalProviders: number;
  totalResources: number;
  totalDemands: number;
  totalConnections: number;
  successfulMatches: number;
  totalTransactionValue: number;
  growthRate: {
    users: number;
    resources: number;
    transactions: number;
  };
}

export interface UserStats {
  publishedDemands: number;
  completedConnections: number;
  totalSpent: number;
  averageRating: number;
  joinedDays: number;
}

export interface ProviderStats {
  totalResources: number;
  totalConnections: number;
  totalRevenue: number;
  averageRating: number;
  responseTime: number;
}

// ============ 请求参数类型 ============

export interface ResourceChannelListParams extends PaginationParams, FilterParams {
  categoryId?: string;
  providerId?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  location?: string;
  inStockOnly?: boolean;
}

export interface DemandListParams extends PaginationParams, FilterParams {
  categoryId?: string;
  requesterId?: string;
  budgetRange?: {
    min: number;
    max: number;
  };
  urgency?: string;
  location?: string;
}

export interface CreateResourceChannelRequest {
  name: string;
  description: string;
  categoryId: string;
  tags: string[];
  images: string[];
  specifications: Record<string, any>;
  pricing: ResourcePricing;
  availability: ResourceAvailability;
}

export interface CreateDemandRequest {
  title: string;
  description: string;
  categoryId: string;
  requirements: Omit<DemandRequirement, 'id'>[];
  budget: DemandBudget;
  timeline: DemandTimeline;
  location: string;
  tags: string[];
  attachments: string[];
}

export interface CreateConnectionRequest {
  demandId: string;
  resourceId: string;
  proposedTerms: ConnectionTerms;
  message?: string;
}
