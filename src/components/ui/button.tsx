import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg",
        outline: "border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 focus:ring-green-500",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-md hover:shadow-lg",
        ghost: "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 focus:ring-green-500",
        link: "text-green-600 underline-offset-4 hover:underline focus:ring-green-500"
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  loadingText?: string
  icon?: string
  iconPosition?: "left" | "right"
  children: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false,
    loadingText,
    icon,
    iconPosition = "right",
    children,
    disabled,
    asChild = false,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    const content = loading ? (
      <>
        <i className="fa fa-spinner fa-spin mr-2"></i>
        {loadingText || children}
      </>
    ) : (
      <>
        {icon && iconPosition === "left" && <i className={cn("fa", icon, "mr-2")}></i>}
        {children}
        {icon && iconPosition === "right" && <i className={cn("fa", icon, "ml-2")}></i>}
      </>
    )

    if (asChild) {
      return (
        <span className={cn(buttonVariants({ variant, size }), className)}>
          {content}
        </span>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
