import { useState } from 'react';
import { toast } from 'sonner';
import { CustomTabs } from '@/components/ui/custom-tabs';
import { DemandPublishForm, type DemandFormData, type DemandCategory } from '@/components/forms/demand-publish-form';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

// Mock data for demand categories
const demandCategories: DemandCategory[] = [
  { id: 1, name: '绿色能源', icon: 'fa-bolt' },
  { id: 2, name: '生态农业', icon: 'fa-apple-alt' },
  { id: 3, name: '环保技术', icon: 'fa-recycle' },
  { id: 4, name: '林业资源', icon: 'fa-tree' },
  { id: 5, name: '生态旅游', icon: 'fa-mountain' },
  { id: 6, name: '绿色建材', icon: 'fa-building' },
];

// Mock data for existing demands
interface Demand {
  id: number;
  title: string;
  category: string;
  status: string;
  statusColor: string;
  publishDate: string;
  deadline: string;
  views: number;
  responses: number;
}

const myDemands: Demand[] = [
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
  const [formData, setFormData] = useState<DemandFormData>({
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
        attachments: [...prev.attachments, ...Array.from(e.target.files || [])],
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

  // Define table columns for demand management
  const columns: Column<Demand>[] = [
    {
      key: 'title',
      title: '需求标题',
      render: (value) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {value}
        </div>
      )
    },
    {
      key: 'category',
      title: '类别',
      render: (value) => (
        <span className="text-gray-600 dark:text-gray-400">{value}</span>
      )
    },
    {
      key: 'status',
      title: '状态',
      render: (value, record) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${record.statusColor}`}>
          {value}
        </span>
      )
    },
    {
      key: 'publishDate',
      title: '发布日期',
      render: (value) => (
        <span className="text-gray-600 dark:text-gray-400">{value}</span>
      )
    },
    {
      key: 'deadline',
      title: '截止日期',
      render: (value) => (
        <span className="text-gray-600 dark:text-gray-400">{value}</span>
      )
    },
    {
      key: 'responses',
      title: '响应数',
      render: (value) => (
        <span className="text-green-600 dark:text-green-400 font-medium">{value} 个响应</span>
      )
    },
    {
      key: 'actions',
      title: '操作',
      align: 'right',
      render: () => (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm">
            <i className="fa fa-eye mr-1"></i> 查看
          </Button>
          <Button variant="ghost" size="sm">
            <i className="fa fa-edit mr-1"></i> 编辑
          </Button>
          <Button variant="ghost" size="sm">
            <i className="fa fa-trash mr-1 text-red-500"></i> 删除
          </Button>
        </div>
      )
    }
  ];

  // Define tabs configuration
  const tabs = [
    {
      id: 'publish',
      label: '发布新需求',
      icon: 'fa-plus-circle'
    },
    {
      id: 'manage',
      label: '我的需求管理',
      icon: 'fa-list-alt'
    }
  ];
  
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">需求发布与管理</h1>
        <p className="text-gray-600 dark:text-gray-400">
          发布您的资源需求或提供资源，管理您的对接项目
        </p>
      </div>
      
      {/* Custom Tabs */}
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as 'publish' | 'manage')}
      >
        {/* Publish new demand form */}
        {activeTab === 'publish' && (
          <DemandPublishForm
            categories={demandCategories}
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onCategorySelect={handleCategorySelect}
            onBudgetTypeChange={handleBudgetTypeChange}
            onFileChange={handleFileChange}
            onRemoveAttachment={removeAttachment}
            onSubmit={handleSubmit}
          />
        )}
        
        {/* Manage demands tab */}
        {activeTab === 'manage' && (
          <DataTable
            columns={columns}
            data={myDemands}
            empty={{
              title: '您还没有发布任何需求',
              description: '点击"发布新需求"开始寻找合适的资源',
              action: {
                label: '立即发布需求',
                onClick: () => setActiveTab('publish')
              }
            }}
          />
        )}
      </CustomTabs>
    </div>
  );
}