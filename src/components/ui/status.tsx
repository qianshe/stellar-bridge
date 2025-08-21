import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ============ StatusBadge 组件 ============
const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
        indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    }
  }
)

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode
  icon?: string
  pulse?: boolean
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, variant, size, children, icon, pulse = false, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusBadgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <i className={cn("fa", icon, "mr-1", pulse && "animate-pulse")}></i>
        )}
        {children}
      </span>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

// ============ LoadingState 组件 ============
interface LoadingStateProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
  variant?: "spinner" | "dots" | "pulse"
}

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ size = "md", text, className, variant = "spinner" }, ref) => {
    const sizeClasses = {
      sm: { container: "p-4", spinner: "w-6 h-6", text: "text-sm" },
      md: { container: "p-8", spinner: "w-8 h-8", text: "text-base" },
      lg: { container: "p-12", spinner: "w-12 h-12", text: "text-lg" }
    }

    const currentSize = sizeClasses[size]

    const renderSpinner = () => {
      switch (variant) {
        case "dots":
          return (
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-green-600 rounded-full animate-pulse",
                    size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
                  )}
                  style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1s" }}
                />
              ))}
            </div>
          )
        case "pulse":
          return <div className={cn("bg-green-600 rounded-full animate-pulse", currentSize.spinner)} />
        default:
          return (
            <div className={cn("animate-spin rounded-full border-4 border-gray-200 border-t-green-600", currentSize.spinner)} />
          )
      }
    }

    return (
      <div ref={ref} className={cn("flex flex-col items-center justify-center text-center", currentSize.container, className)}>
        {renderSpinner()}
        {text && <p className={cn("mt-4 text-gray-600 dark:text-gray-400", currentSize.text)}>{text}</p>}
      </div>
    )
  }
)
LoadingState.displayName = "LoadingState"

// ============ 预定义状态映射 ============
const statusMap = {
  // 对接状态
  matching: { variant: "info" as const, text: "匹配中", icon: "fa-search" },
  negotiating: { variant: "warning" as const, text: "协商中", icon: "fa-comments" },
  contracting: { variant: "purple" as const, text: "合同签订中", icon: "fa-file-text" },
  executing: { variant: "info" as const, text: "执行中", icon: "fa-cogs" },
  completed: { variant: "success" as const, text: "已完成", icon: "fa-check" },
  canceled: { variant: "error" as const, text: "已取消", icon: "fa-times" },
  
  // 通用状态
  active: { variant: "success" as const, text: "活跃", icon: "fa-circle" },
  inactive: { variant: "default" as const, text: "非活跃", icon: "fa-circle-o" },
  pending: { variant: "warning" as const, text: "待处理", icon: "fa-clock-o" },
  approved: { variant: "success" as const, text: "已批准", icon: "fa-check" },
  rejected: { variant: "error" as const, text: "已拒绝", icon: "fa-times" },
  draft: { variant: "default" as const, text: "草稿", icon: "fa-edit" },
  published: { variant: "success" as const, text: "已发布", icon: "fa-globe" },
  
  // 优先级
  high: { variant: "error" as const, text: "高", icon: "fa-arrow-up" },
  medium: { variant: "warning" as const, text: "中", icon: "fa-minus" },
  low: { variant: "info" as const, text: "低", icon: "fa-arrow-down" }
}

interface QuickStatusBadgeProps {
  status: keyof typeof statusMap
  pulse?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const QuickStatusBadge = React.forwardRef<HTMLSpanElement, QuickStatusBadgeProps>(
  ({ status, pulse = false, size = "sm", className }, ref) => {
    const statusConfig = statusMap[status]
    
    return (
      <StatusBadge
        ref={ref}
        variant={statusConfig.variant}
        size={size}
        icon={statusConfig.icon}
        pulse={pulse}
        className={className}
      >
        {statusConfig.text}
      </StatusBadge>
    )
  }
)
QuickStatusBadge.displayName = "QuickStatusBadge"

export { 
  StatusBadge, 
  QuickStatusBadge, 
  LoadingState,
  statusBadgeVariants, 
  statusMap 
}
