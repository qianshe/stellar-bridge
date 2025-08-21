import * as React from "react"
import { cn } from "@/lib/utils"
import { FormInput, FormTextarea } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

interface DemandCategory {
  id: number
  name: string
  icon: string
}

interface DemandFormData {
  title: string
  category: string
  description: string
  budget: string
  budgetType: 'fixed' | 'negotiable'
  deadline: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
  attachments: File[]
}

interface DemandPublishFormProps {
  categories: DemandCategory[]
  formData: DemandFormData
  errors: Record<string, string>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onCategorySelect: (categoryId: number) => void
  onBudgetTypeChange: (type: 'fixed' | 'negotiable') => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveAttachment: (index: number) => void
  onSubmit: (e: React.FormEvent) => void
  className?: string
}

const DemandPublishForm = React.forwardRef<HTMLFormElement, DemandPublishFormProps>(
  ({ 
    categories,
    formData, 
    errors, 
    onInputChange, 
    onCategorySelect, 
    onBudgetTypeChange,
    onFileChange,
    onRemoveAttachment,
    onSubmit, 
    className 
  }, ref) => {
    return (
      <form ref={ref} onSubmit={onSubmit} className={cn("space-y-8", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 需求标题 */}
          <FormInput
            label="需求标题"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            placeholder="请输入清晰简洁的需求标题"
            required
            error={errors.title}
          />
          
          {/* 需求类别 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              需求类别 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategorySelect(category.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 border rounded-lg transition-all",
                    formData.category === category.name
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-800"
                      : "border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  <i className={cn("fa", category.icon, "text-lg mb-2 text-gray-600 dark:text-gray-400")}></i>
                  <span className="text-xs text-center text-gray-700 dark:text-gray-300">{category.name}</span>
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        {/* 需求描述 */}
        <FormTextarea
          label="需求描述"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="请详细描述您的需求，包括具体要求、技术规格、应用场景等"
          rows={6}
          required
          error={errors.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 预算信息 */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              预算信息 <span className="text-red-500">*</span>
            </label>
            
            {/* 预算类型选择 */}
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="budgetType"
                  value="fixed"
                  checked={formData.budgetType === 'fixed'}
                  onChange={() => onBudgetTypeChange('fixed')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">固定预算</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="budgetType"
                  value="negotiable"
                  checked={formData.budgetType === 'negotiable'}
                  onChange={() => onBudgetTypeChange('negotiable')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">面议</span>
              </label>
            </div>

            {/* 预算输入 */}
            {formData.budgetType === 'fixed' && (
              <FormInput
                name="budget"
                value={formData.budget}
                onChange={onInputChange}
                placeholder="请输入预算金额"
                error={errors.budget}
              />
            )}
          </div>

          {/* 截止日期 */}
          <FormInput
            label="截止日期"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={onInputChange}
            required
            error={errors.deadline}
          />
        </div>

        {/* 联系信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            label="联系人"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={onInputChange}
            placeholder="请输入联系人姓名"
            required
            error={errors.contactPerson}
          />
          
          <FormInput
            label="联系电话"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={onInputChange}
            placeholder="请输入联系电话"
            required
            error={errors.contactPhone}
          />
          
          <FormInput
            label="联系邮箱"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={onInputChange}
            placeholder="请输入联系邮箱"
            required
            error={errors.contactEmail}
          />
        </div>

        {/* 附件上传 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            相关附件
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              onChange={onFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <i className="fa fa-cloud-upload text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-600 dark:text-gray-400">点击上传文件或拖拽文件到此处</p>
              <p className="text-sm text-gray-500 mt-2">支持 PDF、DOC、图片等格式，单个文件最大 10MB</p>
            </label>
          </div>
          
          {/* 已上传文件列表 */}
          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveAttachment(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
          >
            发布需求
          </Button>
        </div>
      </form>
    )
  }
)
DemandPublishForm.displayName = "DemandPublishForm"

export { DemandPublishForm, type DemandFormData, type DemandCategory }
