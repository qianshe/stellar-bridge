import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock data for demand categories
const demandCategories = [
  { id: 1, name: '绿色能源', icon: 'fa-bolt' },
  { id: 2, name: '生态农业', icon: 'fa-apple-alt' },
  { id: 3, name: '环保技术', icon: 'fa-recycle' },
  { id: 4, name: '林业资源', icon: 'fa-tree' },
  { id: 5, name: '生态旅游', icon: 'fa-mountain' },
  { id: 6, name: '绿色建材', icon: 'fa-building' },
];

// Mock data for existing demands
const myDemands = [
  {
    id: 1,
    title: '太阳能光伏板安装需求',
    category: '绿色能源',
    status: '已对接',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    publishDate: '2025-07-15',
    deadline: '2025-08-30',
    views: 24,
    responses: 5,
  },
  {
    id: 2,
    title: '有机肥料采购',
    category: '生态农业',
    status: '对接中',
    statusColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    publishDate: '2025-07-22',
    deadline: '2025-09-15',
    views: 18,
    responses: 3,
  },
  {
    id: 3,
    title: '污水处理技术合作',
    category: '环保技术',
    status: '待审核',
    statusColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    publishDate: '2025-08-05',
    deadline: '2025-09-30',
    views: 12,
    responses: 1,
  },
  {
    id: 4,
    title: '可持续林业管理方案',
    category: '林业资源',
    status: '已完成',
    statusColor: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    publishDate: '2025-06-10',
    deadline: '2025-07-20',
    views: 32,
    responses: 8,
  },
];

export default function DemandPublish() {
  // State for tab navigation
  const [activeTab, setActiveTab] = useState<'publish' | 'manage'>('publish');
  
  // State for form inputs
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    budgetType: 'fixed', // 'fixed' or 'negotiable'
    deadline: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    attachments: [] as File[],
  });
  
  // State for form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle budget type change
  const handleBudgetTypeChange = (type: 'fixed' | 'negotiable') => {
    setFormData(prev => ({
      ...prev,
      budgetType: type,
      // Clear budget if switching to negotiable
      budget: type === 'negotiable' ? '' : prev.budget,
    }));
  };
  
  // Handle category selection
  const handleCategorySelect = (categoryId: number) => {
    const category = demandCategories.find(c => c.id === categoryId);
    if (category) {
      setFormData(prev => ({ ...prev, category: category.name }));
      
      // Clear category error if exists
      if (errors.category) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.category;
          return newErrors;
        });
      }
    } else {
      setFormData(prev => ({ ...prev, category: '' }));
    }
  };
  
  // Handle file attachments
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files)],
      }));
    }
  };
  
  // Remove attachment by index
  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };
  
  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入需求标题';
    }
    
    if (!formData.category) {
      newErrors.category = '请选择需求类别';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '请输入需求描述';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = '需求描述至少50个字';
    }
    
    if (formData.budgetType === 'fixed' && !formData.budget.trim()) {
      newErrors.budget = '请输入预算金额';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = '请选择需求截止日期';
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = '请输入联系人姓名';
    }
    
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = '请输入联系电话';
    } else if (!/^1[3-9]\d{9}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = '请输入有效的手机号码';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = '请输入联系邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = '请输入有效的邮箱地址';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, this would submit to an API
      console.log('Form submitted:', formData);
      
      // Show success toast
      toast.success('需求发布成功！', {
        description: '您的需求已成功发布，我们将为您匹配合适的资源提供方。',
      });
      
      // Reset form
      setFormData({
        title: '',
        category: '',
        description: '',
        budget: '',
        budgetType: 'fixed',
        deadline: '',
        contactPerson: '',
        contactPhone: '',
        contactEmail: '',
        attachments: [],
      });
      
      // Switch to manage tab to view the new demand
      setActiveTab('manage');
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">需求发布与管理</h1>
        <p className="text-gray-600 dark:text-gray-400">
          发布您的资源需求或提供资源，管理您的对接项目
        </p>
      </div>
      
      {/* Tab navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'publish'
                ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('publish')}
          >
            <i className="fa-plus-circle mr-2"></i>发布新需求
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'manage'
                ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('manage')}
          >
            <i className="fa-list-alt mr-2"></i>我的需求管理
          </button>
        </div>
        
        {/* Publish new demand form */}
        {activeTab === 'publish' && (
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Demand title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    需求标题 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="请输入清晰简洁的需求标题"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>
                
                {/* Demand category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    需求类别 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {demandCategories.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategorySelect(category.id)}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 border rounded-lg transition-all",
                          formData.category === category.name
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-800"
                            : "border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        <i className={`fa ${category.icon} text-xl mb-2 ${formData.category === category.name ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}></i>
                        <span className="text-sm">{category.name}</span>
                      </button>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                  )}
                </div>
              </div>
              
              {/* Demand description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  需求详细描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="请详细描述您的需求，包括具体要求、技术参数、预期效果等信息（至少50个字）"
                ></textarea>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {formData.description.length}/2000 字
                  </p>
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget information */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    预算信息 <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <div className="flex border-b border-gray-300 dark:border-gray-600">
                      <button
                        type="button"
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${
                          formData.budgetType === 'fixed'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => handleBudgetTypeChange('fixed')}
                      >
                        固定预算
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${
                          formData.budgetType === 'negotiable'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => handleBudgetTypeChange('negotiable')}
                      >
                        面议
                      </button>
                    </div>
                    
                    {formData.budgetType === 'fixed' && (
                      <div className="p-4">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">¥</span>
                          <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border-0 focus:ring-0 text-gray-900 dark:text-white bg-transparent"
                            placeholder="请输入预算金额（元）"
                          />
                        </div>
                        {errors.budget && (
                          <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                        )}
                      </div>
                    )}
                    
                    {formData.budgetType === 'negotiable' && (
                      <div className="p-4 text-center">
                        <p className="text-gray-500 dark:text-gray-400">预算金额可协商</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Deadline */}
                <div className="space-y-2">
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    需求截止日期 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.deadline && (
                    <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
                  )}
                </div>
              </div>
              
              {/* Contact information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  联系方式 <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      联系人姓名
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入联系人姓名"
                    />
                    {errors.contactPerson && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      联系电话
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入手机号码"
                    />
                    {errors.contactPhone && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      联系邮箱
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="请输入邮箱地址"
                    />
                    {errors.contactEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Attachments */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  附件上传（可选）
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 dark:hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="attachment-upload"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFormData(prev => ({
                          ...prev,
                          attachments: [...prev.attachments, ...Array.from(e.target.files)],
                        }));
                      }
                    }}
                  />
                  <label htmlFor="attachment-upload" className="cursor-pointer">
                    <div className="text-green-600 dark:text-green-400 mb-2">
                      <i className="fa-cloud-upload-alt text-3xl"></i>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">点击或拖拽文件至此处上传</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      支持 PDF、Word、Excel、图片等格式，单个文件不超过20MB
                    </p>
                  </label>
                </div>
                
                {/* Display uploaded files */}
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">已上传文件 ({formData.attachments.length})</p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
                          <div className="flex items-center">
                            <i className="fa-file-o text-gray-400 mr-3"></i>
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          > 
                            <i className="fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Submit button */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    if (window.confirm('确定要取消吗？已填写的内容将不会保存。')) {
                      setFormData({
                        title: '',
                        category: '',
                        description: '',
                        budget: '',
                        budgetType: 'fixed',
                        deadline: '',
                        contactPerson: '',
                        contactPhone: '',
                        contactEmail: '',
                        attachments: [],
                      });
                      setErrors({});
                    }
                  }}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  <span>发布需求</span>
                  <i className="fa-paper-plane ml-2"></i>
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Manage demands tab */}
        {activeTab === 'manage' && (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">我的需求列表</h3>
              <div className="relative">
                <i className="fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="搜索需求..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all w-full md:w-64"
                />
              </div>
            </div>
            
            {/* Demand filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium">
                全部需求
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                待审核
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                对接中
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                已对接
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                已完成
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                已取消
              </button>
            </div>
            
            {/* Demands table */}
            {myDemands.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        需求标题
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        类别
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        状态
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        发布日期
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        截止日期
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        响应数
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {myDemands.map((demand) => (
                      <tr key={demand.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {demand.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">{demand.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${demand.statusColor}`}>
                            {demand.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">{demand.publishDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">{demand.deadline}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="text-green-600 dark:text-green-400 font-medium">{demand.responses}</span> 个响应
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
                  <i className="fa-list-alt text-5xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">您还没有发布任何需求</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  点击"发布新需求"开始寻找合适的资源
                </p>
                <button
                  onClick={() => setActiveTab('publish')}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  立即发布需求
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {myDemands.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-lg shadow">
                  <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-l-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
                    <i className="fa-chevron-left"></i>
                  </button>
                  <button className="px-4 py-2 border-t border-b border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-r-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
                    <i className="fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}