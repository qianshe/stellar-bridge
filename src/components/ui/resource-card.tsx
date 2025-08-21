import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"

interface ResourceCardProps {
  id: string | number
  title: string
  description: string
  coverImage: string
  tags?: string[]
  stats?: {
    total?: number
    available?: number
    providers?: number
    successRate?: number
  }
  href?: string
  delay?: number
  className?: string
  onAction?: () => void
  actionLabel?: string
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  coverImage,
  tags = [],
  stats,
  href,
  delay = 0,
  className,
  onAction,
  actionLabel = "查看详情"
}) => {
    const [imageError, setImageError] = React.useState(false);

    // 根据标题生成渐变背景色
    const getGradientFromTitle = (title: string) => {
      const gradients = [
        'from-green-500 to-teal-500',
        'from-blue-500 to-purple-500',
        'from-purple-500 to-pink-500',
        'from-orange-500 to-red-500',
        'from-teal-500 to-cyan-500',
        'from-indigo-500 to-blue-500'
      ];
      const index = title.length % gradients.length;
      return gradients[index];
    };

    const CardContent = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={cn(
          "group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full",
          className
        )}
      >
        {/* 图片区域 */}
        <div className="relative">
          {!imageError ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={cn(
              "w-full h-48 bg-gradient-to-br flex items-center justify-center group-hover:scale-105 transition-transform duration-500",
              getGradientFromTitle(title)
            )}>
              <div className="text-white text-center">
                <i className="fa fa-image text-4xl mb-2 opacity-60"></i>
                <p className="text-sm opacity-80">图片加载中...</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-1">{title}</h3>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.slice(0, 3).map((tag, i) => (
                    <Tag key={i} variant="glass" size="sm">
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="p-6 flex-grow flex flex-col">
          <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
            {description}
          </p>
          
          {/* 统计数据 */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {stats.total !== undefined && (
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.total}</div>
                  <div className="text-xs text-gray-500">总数</div>
                </div>
              )}
              {stats.available !== undefined && (
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{stats.available}</div>
                  <div className="text-xs text-gray-500">可用</div>
                </div>
              )}
              {stats.providers !== undefined && (
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.providers}</div>
                  <div className="text-xs text-gray-500">提供方</div>
                </div>
              )}
              {stats.successRate !== undefined && (
                <div className="text-center">
                  <div className="text-lg font-bold text-teal-600 dark:text-teal-400">{stats.successRate}%</div>
                  <div className="text-xs text-gray-500">成功率</div>
                </div>
              )}
            </div>
          )}
          
          {/* 操作按钮 */}
          <Button
            variant="outline"
            className="w-full"
            onClick={onAction}
            icon="fa-arrow-right"
            iconPosition="right"
          >
            {actionLabel}
          </Button>
        </div>
      </motion.div>
    )

    if (href) {
      return (
        <Link to={href}>
          {CardContent}
        </Link>
      )
    }

    return CardContent
}

export { ResourceCard }
