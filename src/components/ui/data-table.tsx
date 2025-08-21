import * as React from "react"
import { cn } from "@/lib/utils"
import { EmptyState } from "@/components/ui/layout"
import { LoadingState } from "@/components/ui/status"

interface Column<T> {
  key: keyof T | string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  render?: (value: any, record: T, index: number) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  empty?: {
    title: string
    description?: string
    action?: {
      label: string
      onClick: () => void
    }
  }
  pagination?: {
    current: number
    total: number
    pageSize: number
    onChange: (page: number) => void
  }
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  onSort?: (key: string, order: 'asc' | 'desc') => void
  rowKey?: keyof T | ((record: T) => string | number)
  onRowClick?: (record: T, index: number) => void
  className?: string
}

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  empty,
  pagination,
  sortBy,
  sortOrder,
  onSort,
  rowKey = 'id',
  onRowClick,
  className
}: DataTableProps<T>) {
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return record[rowKey] || index
  }

  const handleSort = (key: string) => {
    if (!onSort) return
    
    let newOrder: 'asc' | 'desc' = 'asc'
    if (sortBy === key && sortOrder === 'asc') {
      newOrder = 'desc'
    }
    onSort(key, newOrder)
  }

  const renderCell = (column: Column<T>, record: T, index: number) => {
    const value = typeof column.key === 'string' && column.key.includes('.') 
      ? column.key.split('.').reduce((obj, key) => obj?.[key], record)
      : record[column.key as keyof T]

    if (column.render) {
      return column.render(value, record, index)
    }

    return value
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <LoadingState size="lg" text="加载数据中..." />
      </div>
    )
  }

  if (data.length === 0 && empty) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <EmptyState
          title={empty.title}
          description={empty.description}
          action={empty.action}
        />
      </div>
    )
  }

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-6 py-4 text-sm font-medium text-gray-900 dark:text-white",
                    column.align === 'center' && "text-center",
                    column.align === 'right' && "text-right",
                    column.sortable && "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key as string)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <i className={cn(
                          "fa fa-caret-up text-xs",
                          sortBy === column.key && sortOrder === 'asc' 
                            ? "text-green-600" 
                            : "text-gray-400"
                        )}></i>
                        <i className={cn(
                          "fa fa-caret-down text-xs -mt-1",
                          sortBy === column.key && sortOrder === 'desc' 
                            ? "text-green-600" 
                            : "text-gray-400"
                        )}></i>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((record, index) => (
              <tr
                key={getRowKey(record, index)}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(record, index)}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={cn(
                      "px-6 py-4 text-sm text-gray-900 dark:text-white",
                      column.align === 'center' && "text-center",
                      column.align === 'right' && "text-right"
                    )}
                  >
                    {renderCell(column, record, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              共 {pagination.total} 条记录
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => pagination.onChange(pagination.current - 1)}
                disabled={pagination.current <= 1}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <span className="px-3 py-1 text-sm">
                {pagination.current} / {Math.ceil(pagination.total / pagination.pageSize)}
              </span>
              <button
                onClick={() => pagination.onChange(pagination.current + 1)}
                disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataTable, type Column }
