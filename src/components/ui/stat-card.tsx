import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatCardProps {
  value: string | number
  label: string
  icon?: string
  color?: string
  delay?: number
  className?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  onClick?: () => void
  loading?: boolean
  description?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ value, label, icon, color = "text-green-600 dark:text-green-400", delay = 0, className, trend, onClick, loading = false, description }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={cn(
          "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700",
          onClick && "cursor-pointer hover:scale-105",
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className={cn("text-3xl font-bold mb-1", color)}>
              {loading ? (
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded"></div>
              ) : (
                value
              )}
            </div>
            <div className="text-gray-600 dark:text-gray-300 flex items-center">
              {icon && <i className={cn("fa", icon, "mr-2")}></i>}
              {label}
            </div>
            {description && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </div>
            )}
            {trend && (
              <div className={cn(
                "text-sm mt-2 flex items-center",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                <i className={cn(
                  "fa mr-1",
                  trend.isPositive ? "fa-arrow-up" : "fa-arrow-down"
                )}></i>
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
