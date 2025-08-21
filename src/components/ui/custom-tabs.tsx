import * as React from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: string
  disabled?: boolean
}

interface CustomTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  children: React.ReactNode
  className?: string
  variant?: "default" | "pills" | "underline"
}

const CustomTabs = React.forwardRef<HTMLDivElement, CustomTabsProps>(
  ({ tabs, activeTab, onTabChange, children, className, variant = "default" }, ref) => {
    const getTabClasses = (tab: Tab, isActive: boolean) => {
      const baseClasses = "flex-1 py-4 px-6 text-center font-medium transition-colors"
      
      switch (variant) {
        case "pills":
          return cn(
            baseClasses,
            "rounded-lg mx-1",
            isActive 
              ? "bg-green-600 text-white" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
            tab.disabled && "opacity-50 cursor-not-allowed"
          )
        case "underline":
          return cn(
            baseClasses,
            "border-b-2",
            isActive 
              ? "text-green-600 dark:text-green-400 border-green-600 dark:border-green-400" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent",
            tab.disabled && "opacity-50 cursor-not-allowed"
          )
        default:
          return cn(
            baseClasses,
            isActive 
              ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
            tab.disabled && "opacity-50 cursor-not-allowed"
          )
      }
    }

    return (
      <div ref={ref} className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", className)}>
        <div className={cn(
          "flex",
          variant === "default" && "border-b border-gray-200 dark:border-gray-700",
          variant === "pills" && "p-2"
        )}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                className={getTabClasses(tab, isActive)}
                onClick={() => !tab.disabled && onTabChange(tab.id)}
                disabled={tab.disabled}
              >
                {tab.icon && <i className={cn("fa", tab.icon, "mr-2")}></i>}
                {tab.label}
              </button>
            )
          })}
        </div>
        
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    )
  }
)
CustomTabs.displayName = "CustomTabs"

export { CustomTabs, type Tab }
