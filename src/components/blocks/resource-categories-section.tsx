import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ResourceCard } from "@/components/ui"
import { PageHeader } from "@/components/ui/layout"

interface ResourceCategory {
  id: string | number
  title: string
  description: string
  icon: string
  color: string
  count: number
  coverImage?: string
  tags?: string[]
  stats?: {
    total?: number
    available?: number
    providers?: number
    successRate?: number
  }
}

interface ResourceCategoriesSectionProps {
  title?: string
  description?: string
  categories: ResourceCategory[]
  columns?: 2 | 3 | 4
  onCategoryClick?: (categoryId: string | number) => void
  className?: string
}

const ResourceCategoriesSection = React.forwardRef<HTMLElement, ResourceCategoriesSectionProps>(
  ({ title, description, categories, columns = 4, onCategoryClick, className }, ref) => {
    const gridClasses = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    }

    const handleCategoryClick = (categoryId: string | number) => {
      if (onCategoryClick) {
        onCategoryClick(categoryId)
      }
    }

    return (
      <section ref={ref} className={cn("space-y-8", className)}>
        {/* 标题区域 */}
        {(title || description) && (
          <PageHeader 
            title={title || ""}
            description={description}
            centered
          />
        )}

        {/* 资源分类网格 */}
        <div className={cn("grid gap-8", gridClasses[columns])}>
          {categories.map((category, index) => {
            // 如果没有提供coverImage，生成一个默认的渐变背景
            const defaultCoverImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23${category.color.includes('green') ? '10b981' : category.color.includes('blue') ? '3b82f6' : category.color.includes('amber') ? 'f59e0b' : '06b6d4'};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23${category.color.includes('green') ? '059669' : category.color.includes('blue') ? '1d4ed8' : category.color.includes('amber') ? 'd97706' : '0891b2'};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad${index})'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='48' font-family='Arial'%3E%3Ci class='fa ${category.icon}'%3E%3C/i%3E%3C/text%3E%3C/svg%3E`

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ResourceCard
                  id={category.id}
                  title={category.title}
                  description={category.description}
                  coverImage={category.coverImage || defaultCoverImage}
                  tags={category.tags || [`${category.count} 个资源`]}
                  stats={category.stats}
                  onAction={() => handleCategoryClick(category.id)}
                  actionLabel="查看详情"
                  delay={index * 0.1}
                />
              </motion.div>
            )
          })}
        </div>
      </section>
    )
  }
)
ResourceCategoriesSection.displayName = "ResourceCategoriesSection"

export { ResourceCategoriesSection, type ResourceCategory }
