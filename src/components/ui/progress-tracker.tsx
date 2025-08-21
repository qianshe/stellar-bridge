import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressStep {
  id: string
  label: string
  description?: string
  icon?: string
  status: 'completed' | 'current' | 'pending' | 'error'
  date?: string
}

interface ProgressTrackerProps {
  steps: ProgressStep[]
  orientation?: 'horizontal' | 'vertical'
  showProgress?: boolean
  className?: string
}

const ProgressTracker = React.forwardRef<HTMLDivElement, ProgressTrackerProps>(
  ({ steps, orientation = 'horizontal', showProgress = true, className }, ref) => {
    const completedSteps = steps.filter(step => step.status === 'completed').length
    const progressPercentage = (completedSteps / steps.length) * 100

    const getStepColor = (status: ProgressStep['status']) => {
      switch (status) {
        case 'completed':
          return 'bg-green-600 text-white border-green-600'
        case 'current':
          return 'bg-blue-600 text-white border-blue-600'
        case 'error':
          return 'bg-red-600 text-white border-red-600'
        default:
          return 'bg-gray-200 text-gray-600 border-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600'
      }
    }

    const getConnectorColor = (index: number) => {
      const currentStep = steps[index]
      const nextStep = steps[index + 1]
      
      if (currentStep.status === 'completed') {
        return 'bg-green-600'
      } else if (currentStep.status === 'current' && nextStep?.status === 'pending') {
        return 'bg-gradient-to-r from-blue-600 to-gray-300'
      } else {
        return 'bg-gray-300 dark:bg-gray-600'
      }
    }

    if (orientation === 'vertical') {
      return (
        <div ref={ref} className={cn("space-y-4", className)}>
          {showProgress && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>进度</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-green-600 h-2 rounded-full"
                />
              </div>
            </div>
          )}
          
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="flex items-start">
                {/* 步骤图标 */}
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors",
                  getStepColor(step.status)
                )}>
                  {step.status === 'completed' ? (
                    <i className="fa fa-check"></i>
                  ) : step.status === 'error' ? (
                    <i className="fa fa-times"></i>
                  ) : step.icon ? (
                    <i className={cn("fa", step.icon)}></i>
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* 步骤内容 */}
                <div className="ml-4 flex-1">
                  <h4 className={cn(
                    "text-sm font-medium",
                    step.status === 'current' ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"
                  )}>
                    {step.label}
                  </h4>
                  {step.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {step.description}
                    </p>
                  )}
                  {step.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {step.date}
                    </p>
                  )}
                </div>
              </div>
              
              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-0.5 h-6 ml-5 mt-2",
                  getConnectorColor(index)
                )} />
              )}
            </div>
          ))}
        </div>
      )
    }

    // 水平布局
    return (
      <div ref={ref} className={cn("w-full", className)}>
        {showProgress && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>整体进度</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-green-600 h-2 rounded-full"
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center">
                {/* 步骤图标 */}
                <div className={cn(
                  "w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors mb-2",
                  getStepColor(step.status)
                )}>
                  {step.status === 'completed' ? (
                    <i className="fa fa-check"></i>
                  ) : step.status === 'error' ? (
                    <i className="fa fa-times"></i>
                  ) : step.icon ? (
                    <i className={cn("fa", step.icon)}></i>
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* 步骤标签 */}
                <h4 className={cn(
                  "text-sm font-medium max-w-24",
                  step.status === 'current' ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"
                )}>
                  {step.label}
                </h4>
                
                {step.date && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {step.date}
                  </p>
                )}
              </div>
              
              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={cn(
                    "h-0.5 w-full",
                    getConnectorColor(index)
                  )} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }
)
ProgressTracker.displayName = "ProgressTracker"

export { ProgressTracker, type ProgressStep }
