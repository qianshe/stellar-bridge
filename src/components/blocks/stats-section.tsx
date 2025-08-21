import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { StatCard } from "@/components/ui"

interface StatItem {
  value: string | number
  label: string
  icon: string
  color: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

interface StatsSectionProps {
  title?: string
  description?: string
  stats: StatItem[]
  columns?: 2 | 3 | 4
  variant?: "default" | "compact" | "cards"
  centered?: boolean
  className?: string
}

const StatsSection = React.forwardRef<HTMLElement, StatsSectionProps>(
  ({ title, description, stats, columns = 4, variant = "default", centered = true, className }, ref) => {
    const gridClasses = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4"
    }

    return (
      <section ref={ref} className={cn("space-y-8", className)}>
        {/* 标题区域 */}
        {(title || description) && (
          <div className="text-center space-y-4">
            {title && (
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {/* 统计卡片网格 */}
        <div className={cn("grid gap-6", gridClasses[columns])}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>
    )
  }
)
StatsSection.displayName = "StatsSection"

export { StatsSection, type StatItem }
