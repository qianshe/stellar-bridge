import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ResourceOption {
  id: string | number
  title: string
  description: string
  icon?: string
  image?: string
  tags?: string[]
  disabled?: boolean
}

interface ResourceSelectorProps {
  title?: string
  description?: string
  options: ResourceOption[]
  selectedId?: string | number
  onSelect: (id: string | number) => void
  multiple?: boolean
  selectedIds?: (string | number)[]
  onMultiSelect?: (ids: (string | number)[]) => void
  layout?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4
  className?: string
}

const ResourceSelector = React.forwardRef<HTMLDivElement, ResourceSelectorProps>(
  ({ 
    title,
    description,
    options, 
    selectedId, 
    onSelect,
    multiple = false,
    selectedIds = [],
    onMultiSelect,
    layout = 'grid',
    columns = 2,
    className 
  }, ref) => {
    const handleSelect = (id: string | number) => {
      if (multiple && onMultiSelect) {
        const newSelectedIds = selectedIds.includes(id)
          ? selectedIds.filter(selectedId => selectedId !== id)
          : [...selectedIds, id]
        onMultiSelect(newSelectedIds)
      } else {
        onSelect(id)
      }
    }

    const isSelected = (id: string | number) => {
      return multiple ? selectedIds.includes(id) : selectedId === id
    }

    const gridClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    }

    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        {/* 标题区域 */}
        {(title || description) && (
          <div className="text-center space-y-2">
            {title && (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}

        {/* 选项列表 */}
        <div className={cn(
          layout === 'grid' ? `grid gap-4 ${gridClasses[columns]}` : "space-y-4"
        )}>
          {options.map((option, index) => {
            const selected = isSelected(option.id)
            
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "relative p-4 border rounded-lg cursor-pointer transition-all duration-300",
                  selected 
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-800" 
                    : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:bg-gray-50 dark:hover:bg-gray-800",
                  option.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !option.disabled && handleSelect(option.id)}
              >
                {/* 选中指示器 */}
                {multiple && (
                  <div className="absolute top-3 right-3">
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                      selected 
                        ? "bg-green-600 border-green-600" 
                        : "border-gray-300 dark:border-gray-600"
                    )}>
                      {selected && (
                        <i className="fa fa-check text-white text-xs"></i>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  {/* 图标或图片 */}
                  <div className="flex-shrink-0">
                    {option.image ? (
                      <img 
                        src={option.image} 
                        alt={option.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : option.icon ? (
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center",
                        selected 
                          ? "bg-green-600 text-white" 
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      )}>
                        <i className={cn("fa", option.icon, "text-lg")}></i>
                      </div>
                    ) : null}
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <h4 className={cn(
                      "font-medium transition-colors",
                      selected 
                        ? "text-green-700 dark:text-green-400" 
                        : "text-gray-900 dark:text-white"
                    )}>
                      {option.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {option.description}
                    </p>
                    
                    {/* 标签 */}
                    {option.tags && option.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {option.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 单选指示器 */}
                {!multiple && selected && (
                  <div className="absolute top-3 right-3">
                    <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                      <i className="fa fa-check text-white text-xs"></i>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }
)
ResourceSelector.displayName = "ResourceSelector"

export { ResourceSelector, type ResourceOption }
