import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchBar } from "@/components/ui/form"

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterBarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  filters?: FilterOption[]
  activeFilter?: string
  onFilterChange?: (filterId: string) => void
  className?: string
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ 
    searchValue, 
    onSearchChange, 
    searchPlaceholder = "搜索...",
    filters = [],
    activeFilter,
    onFilterChange,
    className 
  }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700",
          className
        )}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* 搜索框 */}
          <SearchBar
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
          />
          
          {/* 筛选按钮 */}
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange?.(filter.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeFilter === filter.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  )}
                >
                  {filter.label}
                  {filter.count !== undefined && (
                    <span className={cn(
                      "ml-2 px-2 py-0.5 rounded-full text-xs",
                      activeFilter === filter.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                    )}>
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)
FilterBar.displayName = "FilterBar"

export { FilterBar, type FilterOption }
