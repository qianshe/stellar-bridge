import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatItem {
  label: string
  value: string | number
  icon: string
  color?: string
}

interface ResourceDetailHeaderProps {
  title: string
  description: string
  coverImage?: string
  stats: StatItem[]
  tags?: string[]
  className?: string
}

const ResourceDetailHeader = React.forwardRef<HTMLDivElement, ResourceDetailHeaderProps>(
  ({ title, description, coverImage, stats, tags = [], className }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-teal-500 text-white",
          className
        )}
      >
        {/* 背景图片 */}
        {coverImage && (
          <div className="absolute inset-0">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-teal-500/80"></div>
          </div>
        )}
        
        {/* 装饰性背景 */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute left-20 bottom-10 w-72 h-72 rounded-full bg-white blur-3xl"></div>
        </div>
        
        <div className="relative z-10 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* 左侧内容 */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {title}
                  </h1>
                  <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                    {description}
                  </p>
                </motion.div>
                
                {/* 标签 */}
                {tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap gap-2"
                  >
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>
              
              {/* 右侧统计数据 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-1"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-4 opacity-90">关键数据</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex items-center">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                          stat.color || "bg-white/20"
                        )}>
                          <i className={cn("fa", stat.icon, "text-white")}></i>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
ResourceDetailHeader.displayName = "ResourceDetailHeader"

export { ResourceDetailHeader, type StatItem }
