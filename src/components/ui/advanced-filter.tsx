import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchBar } from "@/components/ui/form"
import { Tag } from "@/components/ui/tag"

interface AdvancedFilterOption {
  value: string
  label: string
}

interface FilterConfig {
  key: string
  label: string
  type: 'select' | 'multiselect' | 'tags'
  options: AdvancedFilterOption[]
}

interface AdvancedFilterProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  filters: FilterConfig[]
  activeFilters: Record<string, any>
  onFilterChange: (key: string, value: any) => void
  availableTags?: string[]
  selectedTags?: string[]
  onTagToggle?: (tag: string) => void
  sortOptions?: AdvancedFilterOption[]
  sortBy?: string
  onSortChange?: (sortBy: string) => void
  isMobileFilterOpen?: boolean
  onMobileFilterToggle?: () => void
  className?: string
}

const AdvancedFilter = React.forwardRef<HTMLDivElement, AdvancedFilterProps>(
  ({ 
    searchValue,
    onSearchChange,
    searchPlaceholder = "搜索...",
    filters,
    activeFilters,
    onFilterChange,
    availableTags = [],
    selectedTags = [],
    onTagToggle,
    sortOptions = [],
    sortBy,
    onSortChange,
    isMobileFilterOpen,
    onMobileFilterToggle,
    className 
  }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {/* 搜索和筛选栏 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <SearchBar
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={onSearchChange}
            />
            
            {/* 移动端筛选按钮 */}
            <button 
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300"
              onClick={onMobileFilterToggle}
            >
              <i className="fa fa-filter"></i>
              <span>筛选</span>
            </button>
            
            {/* 桌面端筛选下拉框 */}
            <div className="hidden md:flex gap-3">
              {filters.map((filter) => (
                <div key={filter.key} className="relative">
                  <select
                    value={activeFilters[filter.key] || ''}
                    onChange={(e) => onFilterChange(filter.key, e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    {filter.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <i className="fa fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              ))}
              
              {/* 排序选择 */}
              {sortOptions.length > 0 && (
                <div className="relative">
                  <select
                    value={sortBy || ''}
                    onChange={(e) => onSortChange?.(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <i className="fa fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 标签筛选 */}
        {availableTags.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">标签筛选</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Tag
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => onTagToggle?.(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* 移动端侧边栏筛选 */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onMobileFilterToggle}></div>
            <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">筛选选项</h3>
                <button
                  onClick={onMobileFilterToggle}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fa fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="space-y-6">
                {filters.map((filter) => (
                  <div key={filter.key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {filter.label}
                    </label>
                    <select
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      {filter.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                
                {/* 移动端排序 */}
                {sortOptions.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      排序方式
                    </label>
                    <select
                      value={sortBy || ''}
                      onChange={(e) => onSortChange?.(e.target.value)}
                      className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)
AdvancedFilter.displayName = "AdvancedFilter"

export { AdvancedFilter, type FilterConfig, type AdvancedFilterOption }
