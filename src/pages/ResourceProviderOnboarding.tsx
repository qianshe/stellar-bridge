import { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FormInput, FormTextarea } from '@/components/ui/form';
import { DataTable, type Column } from '@/components/ui/data-table';

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
    publishDate: '2025-07-28',
    views: 43,
    demands: 3,
    price: '¥25,000/套',
    stock: 8,
  },
];

// Define columns for the data table
const resourceColumns: Column<typeof myResources[0]>[] = [
  {
    key: 'title',
    header: '资源名称',
    render: (item) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {item.title}
      </div>
    ),
  },
  {
    key: 'category',
    header: '类别',
    render: (item) => (
      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
        {item.category}
      </span>
    ),
  },
  {
    key: 'status',
    header: '状态',
    render: (item) => (
      <span className={`px-2 py-1 text-xs rounded-full ${item.statusColor}`}>
        {item.status}
      </span>
    ),
  },
  {
    key: 'publishDate',
    header: '发布日期',
  },
  {
    key: 'views',
    header: '浏览量',
  },
  {
    key: 'demands',
    header: '需求数',
  },
  {
    key: 'price',
    header: '价格',
    render: (item) => (
      <span className="font-medium text-green-600 dark:text-green-400">
        {item.price}
      </span>
    ),
  },
  {
    key: 'stock',
    header: '库存',
  },
];

export default function ResourceProviderOnboarding() {
  // Onboarding form state
  const [onboardingForm, setOnboardingForm] = useState({
    companyName: '',
    companyType: '',
    businessLicense: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    companyAddress: '',
    businessScope: '',
    certifications: '',
  });

  const [onboardingErrors, setOnboardingErrors] = useState<Record<string, string>>({});

  // Resource form state
  const [resourceForm, setResourceForm] = useState({
    title: '',
    category: '',
    description: '',
    specifications: '',
    price: '',
    stock: '',
    stockUnit: '个',
    productionCapacity: '',
    qualityCertification: '',
    images: [] as File[],
    tags: [] as string[],
    tagInput: '',
  });

  const [resourceErrors, setResourceErrors] = useState<Record<string, string>>({});
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<number | null>(null);

  // Handle onboarding form changes
  const handleOnboardingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOnboardingForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (onboardingErrors[name]) {
      setOnboardingErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle resource form changes
  const handleResourceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResourceForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (resourceErrors[name]) {
      setResourceErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle resource category selection
  const handleResourceCategorySelect = (categoryId: number) => {
    setSelectedResourceCategory(categoryId);
    const category = resourceCategories.find(c => c.id === categoryId);
    if (category) {
      setResourceForm(prev => ({
        ...prev,
        category: category.name
      }));
    }
    
    // Clear category error
    if (resourceErrors.category) {
      setResourceErrors(prev => ({
        ...prev,
        category: ''
      }));
    }
  };

  // Handle tag input changes
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResourceForm(prev => ({
      ...prev,
      tagInput: e.target.value
    }));
  };

  // Handle tag key down (Enter or comma to add tag)
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  // Add tag
  const addTag = () => {
    const tag = resourceForm.tagInput.trim();
    if (tag && !resourceForm.tags.includes(tag)) {
      setResourceForm(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
        tagInput: ''
      }));
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setResourceForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle onboarding form submission
  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: Record<string, string> = {};
    
    if (!onboardingForm.companyName.trim()) {
      errors.companyName = '请输入企业名称';
    }
    if (!onboardingForm.companyType) {
      errors.companyType = '请选择企业类型';
    }
    if (!onboardingForm.contactPerson.trim()) {
      errors.contactPerson = '请输入联系人姓名';
    }
    if (!onboardingForm.contactPhone.trim()) {
      errors.contactPhone = '请输入联系电话';
    }
    
    if (Object.keys(errors).length > 0) {
      setOnboardingErrors(errors);
      return;
    }
    
    // Submit onboarding form
    toast.success('企业入驻申请已提交，请等待审核');
  };

  // Handle resource form submission
  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: Record<string, string> = {};
    
    if (!resourceForm.title.trim()) {
      errors.title = '请输入资源名称';
    }
    if (!resourceForm.category) {
      errors.category = '请选择资源类别';
    }
    if (!resourceForm.description.trim()) {
      errors.description = '请输入资源描述';
    }
    if (!resourceForm.price.trim()) {
      errors.price = '请输入价格';
    }
    if (!resourceForm.stock.trim()) {
      errors.stock = '请输入库存量';
    }
    
    if (Object.keys(errors).length > 0) {
      setResourceErrors(errors);
      return;
    }
    
    // Submit resource form
    toast.success('资源信息已提交，请等待审核');
    
    // Reset form
    setResourceForm({
      title: '',
      category: '',
      description: '',
      specifications: '',
      price: '',
      stock: '',
      stockUnit: '个',
      productionCapacity: '',
      qualityCertification: '',
      images: [],
      tags: [],
      tagInput: '',
    });
    setSelectedResourceCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <i className="fa-handshake text-3xl text-green-600 dark:text-green-400"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            资源供应商入驻
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            加入我们的绿色生态平台，让您的优质资源触达更多需求方，共建可持续发展的未来
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Onboarding Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">企业入驻信息</h3>
            
            <form onSubmit={handleOnboardingSubmit} className="space-y-8">
              {/* Basic company information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <i className="fa-building text-green-600 dark:text-green-400 mr-2"></i>
                  企业基本信息
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    id="companyName"
                    name="companyName"
                    label="企业名称"
                    required
                    value={onboardingForm.companyName}
                    onChange={handleOnboardingChange}
                    placeholder="请输入企业全称"
                    error={onboardingErrors.companyName}
                  />
                  
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
                    >
                      <option value="">请选择企业类型</option>
                      <option value="有限责任公司">有限责任公司</option>
                      <option value="股份有限公司">股份有限公司</option>
                      <option value="个体工商户">个体工商户</option>
                      <option value="合伙企业">合伙企业</option>
                      <option value="其他">其他</option>
                    </select>
                    {onboardingErrors.companyType && (
                      <p className="text-red-500 text-sm mt-1">{onboardingErrors.companyType}</p>
                    )}
                  </div>

                  <FormInput
                    id="contactPerson"
                    name="contactPerson"
                    label="联系人"
                    required
                    value={onboardingForm.contactPerson}
                    onChange={handleOnboardingChange}
                    placeholder="请输入联系人姓名"
                    error={onboardingErrors.contactPerson}
                  />

                  <FormInput
                    id="contactPhone"
                    name="contactPhone"
                    label="联系电话"
                    required
                    value={onboardingForm.contactPhone}
                    onChange={handleOnboardingChange}
                    placeholder="请输入联系电话"
                    error={onboardingErrors.contactPhone}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  提交入驻申请
                  <i className="fa-paper-plane ml-2"></i>
                </Button>
              </div>
            </form>
          </div>

          {/* Resource Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">资源信息录入</h3>
            
            <form onSubmit={handleResourceSubmit} className="space-y-8">
              {/* Resource Category */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  资源类别 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {resourceCategories.map(category => (
                    <Button
                      key={category.id}
                      type="button"
                      onClick={() => handleResourceCategorySelect(category.id)}
                      variant={selectedResourceCategory === category.id ? "default" : "outline"}
                      className={cn(
                        "h-auto p-4 flex flex-col items-center gap-2",
                        selectedResourceCategory === category.id
                          ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                          : ""
                      )}
                    >
                      <i className={`${category.icon} text-xl`}></i>
                      <span className="text-sm">{category.name}</span>
                    </Button>
                  ))}
                </div>
                {resourceErrors.category && (
                  <p className="text-red-500 text-sm mt-1">{resourceErrors.category}</p>
                )}
              </div>

              {/* Basic Resource Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="title"
                  name="title"
                  label="资源名称"
                  required
                  value={resourceForm.title}
                  onChange={handleResourceInputChange}
                  placeholder="请输入资源名称"
                  error={resourceErrors.title}
                />

                <FormInput
                  id="price"
                  name="price"
                  label="价格"
                  required
                  value={resourceForm.price}
                  onChange={handleResourceInputChange}
                  placeholder="请输入价格（如：¥1,200/块）"
                  error={resourceErrors.price}
                />
              </div>

              {/* Stock */}
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
                    className="rounded-r-lg rounded-l-none border-l-0 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="个">个</option>
                    <option value="套">套</option>
                    <option value="吨">吨</option>
                    <option value="平方米">平方米</option>
                    <option value="立方米">立方米</option>
                  </select>
                </div>
                {resourceErrors.stock && (
                  <p className="text-red-500 text-sm mt-1">{resourceErrors.stock}</p>
                )}
              </div>

              {/* Description */}
              <FormTextarea
                id="description"
                name="description"
                label="资源描述"
                required
                value={resourceForm.description}
                onChange={handleResourceInputChange}
                placeholder="请详细描述您的资源特点、优势等"
                error={resourceErrors.description}
                rows={4}
              />

              {/* Tags */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  标签（可选）
                </label>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resourceForm.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        {tag}
                        <Button
                          type="button"
                          onClick={() => removeTag(tag)}
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0 text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-300"
                        >
                          <i className="fa-times"></i>
                        </Button>
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
                    <Button
                      type="button"
                      onClick={addTag}
                      className="rounded-l-none"
                      size="sm"
                    >
                      添加
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  发布资源
                  <i className="fa-paper-plane ml-2"></i>
                </Button>
              </div>
            </form>
          </div>
          
          {/* My resources list */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">我的资源列表</h4>
            
            {myResources.length > 0 ? (
              <DataTable
                data={myResources}
                columns={resourceColumns}
              />
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 text-gray-400">
                  <i className="fa-database text-5xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">您还没有录入任何资源</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  填写上方表单添加您的第一个资源
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
