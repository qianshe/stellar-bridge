import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ============ PageContainer 组件 ============
interface PageContainerProps {
  children: React.ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
  className?: string
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, maxWidth = "xl", padding = "md", className }, ref) => {
    const maxWidthClasses = {
      sm: "max-w-sm",
      md: "max-w-md", 
      lg: "max-w-lg",
      xl: "max-w-6xl",
      "2xl": "max-w-7xl",
      full: "max-w-full"
    }

    const paddingClasses = {
      none: "",
      sm: "py-6 px-4",
      md: "py-12 px-4",
      lg: "py-16 px-4"
    }

    return (
      <div 
        ref={ref}
        className={cn(
          "mx-auto",
          maxWidthClasses[maxWidth],
          paddingClasses[padding],
          className
        )}
      >
        {children}
      </div>
    )
  }
)
PageContainer.displayName = "PageContainer"

// ============ PageHeader 组件 ============
interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
  centered?: boolean
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, children, className, centered = false }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "space-y-4",
          centered && "text-center max-w-3xl mx-auto",
          className
        )}
      >
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex flex-wrap gap-4">
            {children}
          </div>
        )}
      </div>
    )
  }
)
PageHeader.displayName = "PageHeader"

// ============ AuthLayout 组件 ============
interface AuthLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  footerText?: string
  footerLink?: {
    text: string
    href: string
  }
  className?: string
}

const AuthLayout = React.forwardRef<HTMLDivElement, AuthLayoutProps>(
  ({ title, description, children, footerText, footerLink, className }, ref) => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={cn("w-full max-w-md", className)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-green-100 dark:border-green-900/30">
            {/* 头部 */}
            <div className="bg-gradient-to-r from-green-600 to-teal-500 p-6 text-white">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="opacity-90 text-white/90">{description}</p>
            </div>
            
            {/* 内容区域 */}
            <div className="p-6 md:p-8">
              {children}
            </div>
            
            {/* 底部链接 */}
            {(footerText || footerLink) && (
              <div className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {footerText}
                  {footerLink && (
                    <>
                      {' '}
                      <Link 
                        to={footerLink.href}
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
                      >
                        {footerLink.text}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }
)
AuthLayout.displayName = "AuthLayout"

// ============ EmptyState 组件 ============
interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "ghost"
  }
  className?: string
  size?: "sm" | "md" | "lg"
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon = "fa-search", title, description, action, className, size = "md" }, ref) => {
    const sizeClasses = {
      sm: { container: "p-8", icon: "text-3xl w-12 h-12", title: "text-lg", description: "text-sm" },
      md: { container: "p-12", icon: "text-5xl w-20 h-20", title: "text-xl", description: "text-base" },
      lg: { container: "p-16", icon: "text-6xl w-24 h-24", title: "text-2xl", description: "text-lg" }
    }

    const currentSize = sizeClasses[size]

    return (
      <div 
        ref={ref}
        className={cn(
          "bg-white dark:bg-gray-800 rounded-xl text-center border border-gray-100 dark:border-gray-700",
          currentSize.container,
          className
        )}
      >
        <div className={cn("mx-auto mb-4 text-gray-400", currentSize.icon)}>
          <i className={cn("fa", icon)}></i>
        </div>
        
        <h3 className={cn("font-bold text-gray-900 dark:text-white mb-2", currentSize.title)}>
          {title}
        </h3>
        
        {description && (
          <p className={cn("text-gray-600 dark:text-gray-400 mb-6", currentSize.description)}>
            {description}
          </p>
        )}
        
        {action && (
          <Button
            onClick={action.onClick}
            size="md"
          >
            {action.label}
          </Button>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { 
  PageContainer, 
  PageHeader, 
  AuthLayout, 
  EmptyState 
}
