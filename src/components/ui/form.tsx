import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ============ FormInput 组件 ============
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
  required?: boolean
  helperText?: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, required, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className={cn("fa", icon, "text-gray-400")}></i>
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "block w-full pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all",
              icon ? "pl-10" : "pl-4",
              error 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 dark:border-gray-600",
              className
            )}
            {...props}
          />
        </div>
        
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"

// ============ FormTextarea 组件 ============
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  required?: boolean
  helperText?: string
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, required, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={cn(
            "block w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none",
            error 
              ? "border-red-500 focus:ring-red-500" 
              : "border-gray-300 dark:border-gray-600",
            className
          )}
          {...props}
        />
        
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
      </div>
    )
  }
)
FormTextarea.displayName = "FormTextarea"

// ============ SearchBar 组件 ============
interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  className?: string
  icon?: string
  size?: "sm" | "md" | "lg"
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ 
    placeholder = "搜索...", 
    value, 
    onChange, 
    onSearch,
    className, 
    icon = "fa-search",
    size = "md"
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      onChange?.(newValue)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(internalValue)
      }
    }

    const sizeClasses = {
      sm: "py-2 text-sm",
      md: "py-3 text-base", 
      lg: "py-4 text-lg"
    }

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    return (
      <div className={cn("relative flex-grow", className)}>
        <i className={cn("fa", icon, "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400")}></i>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={internalValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={cn(
            "w-full pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all",
            sizeClasses[size]
          )}
        />
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

export {
  FormInput,
  FormTextarea,
  SearchBar
}
