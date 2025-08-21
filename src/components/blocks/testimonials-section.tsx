import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/ui/layout"

interface Testimonial {
  id: string | number
  name: string
  title: string
  company: string
  content: string
  avatar: string
  rating: number
}

interface TestimonialsSectionProps {
  title?: string
  description?: string
  testimonials: Testimonial[]
  columns?: 1 | 2 | 3
  className?: string
}

const TestimonialsSection = React.forwardRef<HTMLElement, TestimonialsSectionProps>(
  ({ title, description, testimonials, columns = 3, className }, ref) => {
    const gridClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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

        {/* 评价卡片网格 */}
        <div className={cn("grid gap-8", gridClasses[columns])}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-green-100 dark:border-green-900/30 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                {/* 星级评分 */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={cn(
                        "fa fa-star",
                        i < testimonial.rating 
                          ? "text-yellow-400" 
                          : "text-gray-300 dark:text-gray-600"
                      )}
                    ></i>
                  ))}
                </div>
                
                {/* 评价内容 */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                  "{testimonial.content}"
                </p>

                {/* 用户信息 */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-100 dark:border-green-900 group-hover:border-green-200 dark:group-hover:border-green-800 transition-colors duration-300"
                  />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    )
  }
)
TestimonialsSection.displayName = "TestimonialsSection"

export { TestimonialsSection, type Testimonial }
