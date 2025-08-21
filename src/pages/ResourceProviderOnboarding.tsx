import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock data for resource categories
const resourceCategories = [
  { id: 1, name: '绿色能源', icon: 'fa-bolt' },
  { id: 2, name: '生态农业', icon: 'fa-apple-alt' },
  { id: 3, name: '环保技术', icon: 'fa-recycle' },
  { id: 4, name: '林业资源', icon: 'fa-tree' },
  { id: 5, name: '生态旅游', icon: 'fa-mountain' },
  { id: 6, name: '绿色建材', icon: 'fa-building' },
];

// Mock data for existing resources
const myResources = [
  {
    id: 1,
    title: '高效太阳能光伏板',
    category: '绿色能源',
    status: '已审核',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    publishDate: '2025-07-10',
    views: 156,
    demands: 24,
    price: '¥1,200/块',
    stock: 500,
  },
  {
    id: 2,
    title: '有机肥料（氮磷钾复合）',
    category: '生态农业',
    status: '审核中',
    statusColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    publishDate: '2025-08-02',
    views: 87,
    demands: 12,
    price: '¥1,800/吨',
    stock: 100,
  },
  {
    id: 3,
    title: '污水处理设备（小型）',
    category: '环保技术',
    status: '已驳回',
    statusColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    publishDate: '2025=07-28',
    views: 42,
    demands: 3,
    price: '¥85,000/台',
    stock: 15,
  },
];

export default function ResourceProviderOnboarding() {
  // State for tab navigation
  const [activeTab, setActiveTab] = useState<'onboarding' | 'resources'>('onboarding');
  
  // State for onboarding form
  const [onboardingForm, setOnboardingForm] = useState({
    companyName: '',
    companyType: '',
    registrationNumber: '',
    establishmentDate: '',
    businessScope: '',
    address: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    companyProfile: '',
    qualificationFiles: [] as File[],
    agreementAccepted: false,
    
    // Business license upload
    businessLicense: null as File | null,
    
    // Resource categories interested in
    interestedCategories: [] as number[],
  });
  
  // State for resource entry form
  const [resourceForm, setResourceForm] = useState({
    title: '',
    category: '',
    model: '',
    specifications: '',
    description: '',
    price: '',
    priceUnit: 'piece', // 'piece', 'kg', 'ton', 'hour', 'set'
    stock: '',
    stockUnit: 'piece', // 'piece', 'kg', 'ton', 'set'
    productionCapacity: '',
    deliveryTime: '',
    images: [] as File[],
    certification: '',
    tags: [] as string[],
    tagInput: '',
  });
  
  // State for form validation errors
  const [onboardingErrors, setOnboardingErrors] = useState<Record<string, string>>({});
  const [resourceErrors, setResourceErrors] = useState<Record<string, string>>({});
  
  // Handle onboarding form changes
  const handleOnboardingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOnboardingForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (onboardingErrors[name]) {
      setOnboardingErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle business license upload
  const handleBusinessLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOnboardingForm(prev => ({
        ...prev,
        businessLicense: e.target.files[0],
      }));
      
      // Clear error if exists
      if (onboardingErrors.businessLicense) {
        setOnboardingErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.businessLicense;
          return newErrors;
        });
      }
    }
  };
  
  // Handle qualification files upload
  const handleQualificationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setOnboardingForm(prev => ({
        ...prev,
        qualificationFiles: [...prev.qualificationFiles, ...Array.from(e.target.files)],
      }));
    }
  };
  
  // Remove qualification file
  const removeQualificationFile = (index: number) => {
    setOnboardingForm(prev => ({
      ...prev,
      qualificationFiles: prev.qualificationFiles.filter((_, i) => i !== index),
    }));
  };
  
  // Toggle interested category
  const toggleInterestedCategory = (categoryId: number) => {
    setOnboardingForm(prev => {
      const categories = prev.interestedCategories.includes(categoryId)
        ? prev.interestedCategories.filter(id => id !== categoryId)
        : [...prev.interestedCategories, categoryId];
      
      return { ...prev, interestedCategories: categories };
    });
    
    // Clear error if exists
    if (onboardingErrors.interestedCategories && onboardingForm.interestedCategories.length > 0) {
      setOnboardingErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.interestedCategories;
        return newErrors;
      });
    }
  };
  
  // Toggle agreement acceptance
  const toggleAgreement = () => {
    setOnboardingForm(prev => ({
      ...prev,
      agreementAccepted: !prev.agreementAccepted,
    }));
    
    // Clear error if exists
    if (onboardingErrors.agreementAccepted && !onboardingForm.agreementAccepted) {
      setOnboardingErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.agreementAccepted;
        return newErrors;
      });
    }
  };
  
  // Validate onboarding form
  const validateOnboardingForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Basic company information validation
    if (!onboardingForm.companyName.trim()) errors.companyName = '请输入企业名称';
    if (!onboardingForm.companyType) errors.companyType = '请选择企业类型';
    if (!onboardingForm.registrationNumber.trim()) errors.registrationNumber = '请输入工商注册号';
    if (!onboardingForm.establishmentDate) errors.establishmentDate = '请选择成立日期';
    if (!onboardingForm.businessScope.trim()) errors.businessScope = '请输入经营范围';
    if (!onboardingForm.address.trim()) errors.address = '请输入企业地址';
    
    // Contact information validation
    if (!onboardingForm.contactPerson.trim()) errors.contactPerson = '请输入联系人姓名';
    if (!onboardingForm.contactPhone.trim()) {
      errors.contactPhone = '请输入联系电话';
    } else if (!/^1[3-9]\d{9}$/.test(onboardingForm.contactPhone)) {
      errors.contactPhone = '请输入有效的手机号码';
    }
    
    if (!onboardingForm.contactEmail.trim()) {
      errors.contactEmail = '请输入联系邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(onboardingForm.contactEmail)) {
      errors.contactEmail = '请输入有效的邮箱地址';
    }
    
    // Company profile validation
    if (!onboardingForm.companyProfile.trim()) {
      errors.companyProfile = '请输入企业简介';
    } else if (onboardingForm.companyProfile.trim().length < 100) {
      errors.companyProfile = '企业简介至少100个字';
    }
    
    // Business license validation
    if (!onboardingForm.businessLicense) {
      errors.businessLicense = '请上传营业执照';
    }
    
    // Interested categories validation
    if (onboardingForm.interestedCategories.length === 0) {
      errors.interestedCategories = '请至少选择一个感兴趣的资源类别';
    }
    
    // Agreement acceptance validation
    if (!onboardingForm.agreementAccepted) {
      errors.agreementAccepted = '请阅读并同意入驻协议';
    }
    
    setOnboardingErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle onboarding form submission
  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateOnboardingForm()) {
      // In a real application, this would submit to an API
      console.log('Onboarding form submitted:', onboardingForm);
      
      // Show success toast
      toast.success('入驻申请提交成功！', {
        description: '您的申请已成功提交，我们将在3-5个工作日内审核并与您联系。',
      });
      
      // Switch to resources tab
      setActiveTab('resources');
    }
  };
  
  // Handle resource form input changes
  const handleResourceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResourceForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (resourceErrors[name]) {
      setResourceErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle category selection for resource
  const handleResourceCategorySelect = (categoryId: number) => {
    const category = resourceCategories.find(c => c.id === categoryId);
    if (category) {
      setResourceForm(prev => ({ ...prev, category: category.name }));
      
      // Clear category error if exists
      if (resourceErrors.category) {
        setResourceErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.category;
          return newErrors;
        });
      }
    } else {
      setResourceForm(prev => ({ ...prev, category: '' }));
    }
  };
  
  // Handle price unit change
  const handlePriceUnitChange = (unit: string) => {
    setResourceForm(prev => ({ ...prev, priceUnit: unit }));
  };
  
  // Handle stock unit change
  const handleStockUnitChange = (unit: string) => {
    setResourceForm(prev => ({ ...prev, stockUnit: unit }));
  };
  
  // Handle image upload for resource
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResourceForm(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files)],
      }));
    }
  };
  
  // Remove image by index
  const removeImage = (index: number) => {
    setResourceForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResourceForm(prev => ({ ...prev, tagInput: e.target.value }));
  };
  
  // Add tag from input
  const addTag = () => {
    if (resourceForm.tagInput.trim() && !resourceForm.tags.includes(resourceForm.tagInput.trim())) {
      setResourceForm(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: '',
      }));
    }
  };
  
  // Handle keyboard event for tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && resourceForm.tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };
  
  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setResourceForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };
  
  // Validate resource form
  const validateResourceForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Basic resource information validation
    if (!resourceForm.title.trim()) errors.title = '请输入资源标题';
    if (!resourceForm.category) errors.category = '请选择资源类别';
    if (!resourceForm.model.trim()) errors.model = '请输入型号规格';
    if (!resourceForm.specifications.trim()) errors.specifications = '请输入技术参数';
    
    // Description validation
    if (!resourceForm.description.trim()) {
      errors.description = '请输入资源描述';
    } else if (resourceForm.description.trim().length < 100) {
      errors.description = '资源描述至少100个字';}
    
    // Price validation
    if (!resourceForm.price.trim()) errors.price = '请输入价格';
    
    // Stock validation
    if (!resourceForm.stock.trim()) errors.stock = '请输入库存量';
    
    // Image validation
    if (resourceForm.images.length === 0) {
      errors.images = '请至少上传一张资源图片';
    }
    
    setResourceErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle resource form submission
  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateResourceForm()) {
      // In a real application, this would submit to an API
      console.log('Resource form submitted:', resourceForm);
      
      // Show success toast
      toast.success('资源录入成功！', {
        description: '您的资源已成功提交，我们将在1-2个工作日内审核。',
      });
      
      // Reset form
      setResourceForm({
        title: '',
        category: '',
        model: '',
        specifications: '',
        description: '',
        price: '',
        priceUnit: 'piece',
        stock: '',
        stockUnit: 'piece',
        productionCapacity: '',
        deliveryTime: '',
        images: [],
        certification: '',
        tags: [],
        tagInput: '',
      });
    }
  };
  
  // Unit options for price and stock
  const priceUnits = [
    { value: 'piece', label: '个' },
    { value: 'kg', label: '千克' },
    { value: 'ton', label: '吨' },
    { value: 'hour', label: '小时' },
    { value: 'set', label: '套' },
    { value: 'square', label: '平方米' },
  ];
  
  const stockUnits = [
    { value: 'piece', label: '个' },
    { value: 'kg', label: '千克' },
    { value: 'ton', label: '吨' },
    { value: 'set', label: '套' },
  ];
  
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">资源方入驻与资源录入</h1>
        <p className="text-gray-600 dark:text-gray-400">
          录入您的资源信息，开始对接需求
        </p>
      </div>
      
      {/* Status indicator */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-green-100 dark:border-green-900/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <i className="fa-check-circle text-green-500"></i>
              <span className="font-medium text-gray-900 dark:text-white">入驻状态：已认证企业</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">您已完成入驻审核，可以开始录入资源信息。</p>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium flex items-center gap-1">
              <i className="fa-building"></i> 绿色能源科技有限公司
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium flex items-center gap-1">
              <i className="fa-user"></i> 企业会员
            </span>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'onboarding'
                ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('onboarding')}
          >
            <i className="fa-sign-in-alt mr-2"></i>入驻申请
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'resources'
                ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('resources')}
          >
            <i className="fa-database mr-2"></i>资源管理
          </button>
        </div>
        
        {/* Onboarding form */}
        {activeTab === 'onboarding' && (
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">企业入驻信息</h3>
            
            <form onSubmit={handleOnboardingSubmit} className="space-y-8">
              {/* Basic company information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <i className="fa-building text-green-600 dark:text-green-400 mr-2"></i>
                  企业基本信息
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      企业名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={onboardingForm.companyName}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入企业全称"
                      disabled
                      defaultValue="绿色能源科技有限公司"
                    />
                    {onboardingErrors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.companyName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="companyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      企业类型 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="companyType"
                      name="companyType"
                      value={onboardingForm.companyType}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      disabled
                      defaultValue="limited"
                    >
                      <option value="">请选择企业类型</option>
                      <option value="limited">有限责任公司</option>
                      <option value="state-owned">国有企业</option>
                      <option value="joint-stock">股份有限公司</option>
                      <option value="partnership">合伙企业</option>
                      <option value="individual">个体工商户</option>
                      <option value="other">其他类型</option>
                    </select>
                    {onboardingErrors.companyType && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.companyType}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      工商注册号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="registrationNumber"
                      name="registrationNumber"
                      value={onboardingForm.registrationNumber}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入工商注册号/统一社会信用代码"
                      disabled
                      defaultValue="91320500XXXXXXXXXX"
                    />
                    {onboardingErrors.registrationNumber && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.registrationNumber}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="establishmentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      成立日期 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="establishmentDate"
                      name="establishmentDate"
                      value={onboardingForm.establishmentDate}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      disabled
                      defaultValue="2018-05-15"
                    />
                    {onboardingErrors.establishmentDate && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.establishmentDate}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="businessScope" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      经营范围 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="businessScope"
                      name="businessScope"
                      value={onboardingForm.businessScope}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入主要经营范围"
                      disabled
                      defaultValue="太阳能光伏设备研发、生产、销售；新能源技术开发、技术咨询、技术服务"
                    />
                    {onboardingErrors.businessScope && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.businessScope}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      企业地址 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={onboardingForm.address}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入企业注册地址"
                      disabled
                      defaultValue="江苏省苏州市工业园区科技路88号"
                    />
                    {onboardingErrors.address && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.address}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Contact information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <i className="fa-user-circle text-green-600 dark:text-green-400 mr-2"></i>
                  联系人信息
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      联系人姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={onboardingForm.contactPerson}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入联系人姓名"
                      disabled
                      defaultValue="张明"
                    />
                    {onboardingErrors.contactPerson && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.contactPerson}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      联系电话 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={onboardingForm.contactPhone}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入手机号码"
                      disabled
                      defaultValue="13800138000"
                    />
                    {onboardingErrors.contactPhone && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.contactPhone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      联系邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={onboardingForm.contactEmail}
                      onChange={handleOnboardingChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入邮箱地址"
                      disabled
                      defaultValue="zhangming@greenenergy.com"
                    />
                    {onboardingErrors.contactEmail && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.contactEmail}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Company profile */}
              <div className="space-y-2">
                <label htmlFor="companyProfile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  企业简介 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="companyProfile"
                  name="companyProfile"
                  value={onboardingForm.companyProfile}
                  onChange={handleOnboardingChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="请详细介绍企业情况、主营业务、核心优势等（至少100个字）"
                  disabled
                  defaultValue="绿色能源科技有限公司成立于2018年，是一家专注于太阳能光伏设备研发、生产与销售的高新技术企业。公司拥有多项专利技术，产品广泛应用于住宅、商业和工业领域。我们致力于通过创新技术推动可再生能源的普及，为客户提供高效、可靠的绿色能源解决方案。公司已通过ISO9001质量管理体系认证和ISO14001环境管理体系认证，产品获得CE、TÜV等国际认证。"
                ></textarea>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {onboardingForm.companyProfile.length}/2000 字
                  </p>
                  {onboardingErrors.companyProfile && (
                    <p className="text-red-500 text-sm">{onboardingErrors.companyProfile}</p>
                  )}
                </div>
              </div>
              
              {/* Qualification documents upload */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <i className="fa-file-text-o text-green-600 dark:text-green-400 mr-2"></i>
                  资质文件上传
                </h4>
                
                {/* Business license upload */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    营业执照 <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 dark:hover:border-green-500 transition-colors bg-gray-50 dark:bg-gray-900">
                    <input
                      type="file"
                      className="hidden"
                      id="businessLicense"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleBusinessLicenseUpload}
                      disabled
                    />
                    <label htmlFor="businessLicense" className="cursor-pointer">
                      <div className="text-green-600 dark:text-green-400 mb-2">
                        <i className="fa-file-image-o text-3xl"></i>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">点击上传营业执照扫描件或照片</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        支持JPG、PNG、PDF格式，文件大小不超过5MB
                      </p>
                    </label>
                  </div>
                  {onboardingErrors.businessLicense && (
                    <p className="text-red-500 text-sm mt-1">{onboardingErrors.businessLicense}</p>
                  )}
                  
                  {/* Preview if file is uploaded */}
                  {onboardingForm.businessLicense && (
                    <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 inline-block">
                      <div className="flex items-center">
                        <i className="fa-file-pdf-o text-red-500 mr-3 text-xl"></i>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">营业执照.pdf</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">文件大小: {(onboardingForm.businessLicense.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Other qualification files */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    其他资质文件（可选）
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 dark:hover:border-green-500 transition-colors bg-gray-50 dark:bg-gray-900">
                    <input
                      type="file"
                      className="hidden"
                      id="qualificationFiles"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      onChange={handleQualificationUpload}
                      disabled
                    />
                    <label htmlFor="qualificationFiles" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        <i className="fa-cloud-upload text-3xl"></i>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">点击或拖拽文件至此处上传</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        支持产品认证、荣誉证书、专利证书等资质文件，多个文件可批量上传
                      </p>
                    </label>
                  </div>
                  
                  {/* Display uploaded qualification files */}
                  {onboardingForm.qualificationFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">已上传文件 ({onboardingForm.qualificationFiles.length})</p>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        {onboardingForm.qualificationFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
                            <div className="flex items-center">
                              <i className="fa-file-text-o text-gray-400 mr-3"></i>
                              <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                                {file.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeQualificationFile(index)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                              disabled
                            >
                              <i className="fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Interested categories */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  感兴趣的资源类别 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {resourceCategories.map(category => (
                    <label
                      key={category.id}
                      className="flex items-center p-4 border rounded-lg cursor-pointer transition-all bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700"
                    >
                      <input
                        type="checkbox"
                        checked={onboardingForm.interestedCategories.includes(category.id)}
                        onChange={() => toggleInterestedCategory(category.id)}
                        className="w-4 h-4 text-green-600 dark:text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
                        disabled
                        defaultChecked={category.id === 1}
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <i className={`fa ${category.icon} text-gray-500 mr-2`}></i>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {onboardingErrors.interestedCategories && (
                  <p className="text-red-500 text-sm">{onboardingErrors.interestedCategories}</p>
                )}
              </div>
              
              {/* Agreement acceptance */}
              <div className="flex items-start space-x-3 pt-4">
                <div className="flex items-center h-5">
                  <input
                    id="agreementAccepted"
                    name="agreementAccepted"
                    type="checkbox"
                    checked={onboardingForm.agreementAccepted}
                    onChange={toggleAgreement}
                    className="w-4 h-4 text-green-600 dark:text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
                    disabled
                    defaultChecked
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="agreementAccepted" className="font-medium text-gray-700 dark:text-gray-300">
                    我已阅读并同意 <a href="#" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">《星空平台资源方入驻协议》</a> 和 <a href="#" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">《用户服务条款》</a>
                  </label>
                  {onboardingErrors.agreementAccepted && (
                    <p className="text-red-500 text-sm mt-1">{onboardingErrors.agreementAccepted}</p>
                  )}
                </div>
              </div>
              
              {/* Submit button */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  disabled
                >
                  保存草稿
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                  disabled
                >
                  <span>提交入驻申请</span>
                  <i className="fa-paper-plane ml-2"></i>
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Resources management tab */}
        {activeTab === 'resources' && (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">我的资源管理</h3>
              <button
                onClick={() => {
                  // Reset form for new resource
                  setResourceForm({
                    title: '',
                    category: '',
                    model: '',
                    specifications: '',
                    description: '',
                    price: '',
                    priceUnit: 'piece',
                    stock: '',
                    stockUnit: 'piece',
                    productionCapacity: '',
                    deliveryTime: '',
                    images: [],
                    certification: '',
                    tags: [],
                    tagInput: '',
                  });
                  setResourceErrors({});
                  
                  // Scroll to form
                  document.getElementById('resource-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 flex items-center"
              >
                <i className="fa-plus mr-2"></i>
                添加新资源
              </button>
            </div>
            
            {/* Resource entry form */}
            <div id="resource-form" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10 border border-gray-100 dark:border-gray-700">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">资源信息录入</h4>
              
              <form onSubmit={handleResourceSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Resource title */}
                  <div className="space-y-2">
                    <label htmlFor="resourceTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      资源标题 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="resourceTitle"
                      name="title"
                      value={resourceForm.title}
                      onChange={handleResourceInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入资源标题"
                    />
                    {resourceErrors.title && (
                      <p className="text-red-500 text-sm mt-1">{resourceErrors.title}</p>
                    )}
                  </div>
                  
                  {/* Resource category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      资源类别 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {resourceCategories.map(category => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleResourceCategorySelect(category.id)}
                          className={cn(
                            "flex flex-col items-center justify-center p-4 border rounded-lg transition-all",
                            resourceForm.category === category.name
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-800"
                              : "border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          )}
                        >
                          <i className={`fa ${category.icon} text-xl mb-2 ${resourceForm.category === category.name ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}></i>
                          <span className="text-sm">{category.name}</span>
                        </button>
                      ))}
                    </div>
                    {resourceErrors.category && (
                      <p className="text-red-500 text-sm mt-1">{resourceErrors.category}</p>
                    )}
                  </div>
                  
                  {/* Model and specifications */}
                  <div className="space-y-2">
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      型号规格 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      value={resourceForm.model}
                      onChange={handleResourceInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入资源型号规格"
                    />
                    {resourceErrors.model && (
                      <p className="text-red-500 text-sm mt-1">{resourceErrors.model}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      技术参数 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="specifications"
                      name="specifications"
                      value={resourceForm.specifications}
                      onChange={handleResourceInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入主要技术参数"
                    />
                    {resourceErrors.specifications && (
                      <p className="text-red-500 text-sm mt-1">{resourceErrors.specifications}</p>
                    )}
                  </div>
                  
                  {/* Price information */}
                  <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      价格 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={resourceForm.price}
                        onChange={handleResourceInputChange}
                        className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="请输入价格"
                      />
                      <select
                        name="priceUnit"
                        value={resourceForm.priceUnit}
                        onChange={handleResourceInputChange}
                        className="px-4 py-3 rounded-r-lg border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        {priceUnits.map(unit => (
                          <option key={unit.value} value={unit.value}>{unit.label}</option>
                        ))}
                      </select>
                    </div>
                    {resourceErrors.price && (
                      <p className="text-red-500 text-sm mt-1">{resourceErrors.price}</p>
                    )}
                  </div>
                  
                  {/* Stock information */}
                  <div className="space-y-2">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      库存量 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={resourceForm.stock}
                        onChange={handleResourceInputChange}
                        className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="请输入当前库存量"
                      />
                      <select
                        name="stockUnit"
                        value={resourceForm.stockUnit}
                        onChange={handleResourceInputChange}
                        className="px-4 py-3 rounded-r-lg border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        {stockUnits.map(unit => (
                          <option key={unit.value} value={unit.value}>{unit.label}</option>
                        ))}
                      </select>
                    </div>
                    {resourceErrors.stock && (
                      <p className="text-red-500 text-sm mt-1">{resourceErrors.stock}</p>
                    )}
                  </div>
                  
                  {/* Production capacity */}
                  <div className="space-y-2">
                    <label htmlFor="productionCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      生产能力（可选）
                    </label>
                    <input
                      type="text"
                      id="productionCapacity"
                      name="productionCapacity"
                      value={resourceForm.productionCapacity}
                      onChange={handleResourceInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入月生产能力"
                    />
                  </div>
                  
                  {/* Delivery time */}
                  <div className="space-y-2">
                    <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      交货周期（可选）
                    </label>
                    <input
                      type="text"
                      id="deliveryTime"
                      name="deliveryTime"
                      value={resourceForm.deliveryTime}
                      onChange={handleResourceInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入常规交货周期"
                    />
                  </div>
                </div>
                
                {/* Resource description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    资源描述 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={resourceForm.description}
                    onChange={handleResourceInputChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="请详细描述资源特性、优势、应用场景等信息（至少100个字）"
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {resourceForm.description.length}/2000 字
                    </p>
                    {resourceErrors.description && (
                      <p className="text-red-500 text-sm">{resourceErrors.description}</p>
                    )}
                  </div>
                </div>
                
                {/* Resource images */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    资源图片 <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 dark:hover:border-green-500 transition-colors bg-gray-50 dark:bg-gray-900">
                    <input
                      type="file"
                      className="hidden"
                      id="resourceImages"
                      multiple
                      accept=".jpg,.jpeg,.png"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="resourceImages" className="cursor-pointer">
                      <div className="text-green-600 dark:text-green-400 mb-2">
                        <i className="fa-cloud-upload-alt text-3xl"></i>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">点击或拖拽上传资源图片</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        支持JPG、PNG格式，最多上传5张图片，每张不超过5MB
                      </p>
                    </label>
                  </div>
                  {resourceErrors.images && (
                    <p className="text-red-500 text-sm mt-1">{resourceErrors.images}</p>
                  )}
                  
                  {/* Preview uploaded images */}
                  {resourceForm.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">已上传图片 ({resourceForm.images.length}/5)</p>
                      <div className="flex flex-wrap gap-4">
                        {resourceForm.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Resource image ${index + 1}`}
                              className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <i className="fa-times text-xs"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Certification */}
                <div className="space-y-2">
                  <label htmlFor="certification" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    认证信息（可选）
                  </label>
                  <input
                    type="text"
                    id="certification"
                    name="certification"
                    value={resourceForm.certification}
                    onChange={handleResourceInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="请输入相关认证信息，如ISO、CE等"
                  />
                </div>
                
                {/* Tags */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    资源标签（可选）
                  </label>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {resourceForm.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-300"
                          >
                            <i className="fa-times-circle text-xs"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        name="tagInput"
                        value={resourceForm.tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagKeyDown}
                        className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="输入标签，按回车或逗号添加"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-3 rounded-r-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
                      >
                        添加
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Submit buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    保存草稿
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                  >
                    <span>提交审核</span>
                    <i className="fa-paper-plane ml-2"></i>
                  </button>
                </div>
              </form>
            </div>
            
            {/* My resources list */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">我的资源列表</h4>
              
              {myResources.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          资源名称
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          类别
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          价格
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          库存
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          发布日期
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          需求数
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {myResources.map((resource) => (
                        <tr key={resource.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {resource.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-400">{resource.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-green-700 dark:text-green-400">{resource.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-400">{resource.stock} 个</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${resource.statusColor}`}>
                              {resource.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-400">{resource.publishDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <span className="text-blue-600 dark:text-blue-400 font-medium">{resource.demands}</span> 个需求
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                <i className="fa-eye mr-1"></i> 查看
                              </button>
                              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                                <i className="fa-edit mr-1"></i> 编辑
                              </button>
                              <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                <i className="fa-trash mr-1"></i> 删除
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 text-gray-400">
                    <i className="fa-database text-5xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">您还没有录入任何资源</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    填写上方表单添加您的第一个资源
                  </p>
                  <button
                    onClick={() => {
                      document.getElementById('resource-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300"
                  >
                    立即添加资源
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}