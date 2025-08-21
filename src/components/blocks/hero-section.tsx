import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface HeroAction {
  label: string
  href: string
  icon?: string
}

interface HeroStats {
  value: string
  label: string
}

interface HeroImage {
  src: string
  alt: string
}

interface FloatingCard {
  value: string
  label: string
  position: "top-right" | "bottom-left"
  color?: string
}

interface HeroSectionProps {
  title: React.ReactNode
  description: string
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  stats?: HeroStats
  heroImage?: HeroImage
  floatingCards?: FloatingCard[]
  variant?: "default" | "centered" | "minimal"
  size?: "sm" | "md" | "lg"
  className?: string
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({
    title,
    description,
    primaryAction,
    secondaryAction,
    stats,
    heroImage,
    floatingCards = [],
    variant = "default",
    size = "md",
    className
  }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    // 根据variant和size生成样式类
    const sizeClasses = {
      sm: "py-12 md:py-16",
      md: "py-20 md:py-32",
      lg: "py-32 md:py-48"
    };

    const variantClasses = {
      default: "bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800",
      centered: "bg-gradient-to-r from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      minimal: "bg-white dark:bg-gray-900"
    };
    return (
      <section
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-green-300 dark:bg-green-900 blur-3xl"></div>
          <div className="absolute left-20 bottom-10 w-72 h-72 rounded-full bg-teal-300 dark:bg-teal-900 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 p-6 md:p-10">
          {/* 左侧内容 */}
          <div className="md:w-1/2 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-gray-300"
            >
              {description}
            </motion.p>
            
            {/* 操作按钮 */}
            {(primaryAction || secondaryAction) && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {primaryAction && (
                  <Button asChild size="lg">
                    <Link to={primaryAction.href}>
                      {primaryAction.label}
                      {primaryAction.icon && <i className={cn("fa", primaryAction.icon, "ml-2")}></i>}
                    </Link>
                  </Button>
                )}

                {secondaryAction && (
                  <Button asChild variant="outline" size="lg">
                    <Link to={secondaryAction.href}>
                      {secondaryAction.label}
                      {secondaryAction.icon && <i className={cn("fa", secondaryAction.icon, "ml-2")}></i>}
                    </Link>
                  </Button>
                )}
              </motion.div>
            )}
            
            {/* 统计信息 */}
            {stats && (
              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-green-700 dark:text-green-400">{stats.value}</span> {stats.label}
                </div>
              </div>
            )}
          </div>
          
          {/* 右侧图片 */}
          {heroImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10 dark:shadow-green-900/20 transform rotate-1 transition-transform duration-500 hover:rotate-0">
                {!imageError ? (
                  <img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="w-full h-auto object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <i className="fa fa-image text-6xl mb-4 opacity-60"></i>
                      <p className="text-lg opacity-80">图片加载中...</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-sm font-medium">资源对接成功率 88%</span>
                    </div>
                    <h3 className="text-xl font-bold">智能资源流通网络</h3>
                  </div>
                </div>
              </div>
              
              {/* 浮动卡片 */}
              {floatingCards.map((card, index) => (
                <div 
                  key={index}
                  className={cn(
                    "absolute bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-48 transition-transform duration-500 hover:rotate-0",
                    card.position === "bottom-left" && "-bottom-6 -left-6 transform -rotate-3",
                    card.position === "top-right" && "-top-6 -right-6 transform rotate-3"
                  )}
                >
                  <div className={cn("text-2xl font-bold mb-1", card.color || "text-green-700 dark:text-green-400")}>
                    {card.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{card.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    )
  }
)
HeroSection.displayName = "HeroSection"

export { HeroSection }
