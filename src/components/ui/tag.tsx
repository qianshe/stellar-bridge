import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center rounded-full text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        glass: "bg-white/20 backdrop-blur-sm text-white border border-white/30",
        gradient: "bg-gradient-to-r from-green-500 to-teal-500 text-white",
        animated: "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-[length:200%_200%] animate-gradient-x text-white"
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    }
  }
)

interface TagProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode
  closable?: boolean
  onClose?: () => void
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, children, closable, onClose, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          >
            <i className="fa fa-times text-xs"></i>
          </button>
        )}
      </span>
    )
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants }
