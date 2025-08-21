import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ============ Logo 组件 ============
interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = "md", 
  showText = true 
}) => {
  const sizeClasses = {
    sm: { icon: "w-8 h-8 text-lg", text: "text-lg" },
    md: { icon: "w-10 h-10 text-xl", text: "text-xl" },
    lg: { icon: "w-12 h-12 text-2xl", text: "text-2xl" }
  }

  const currentSize = sizeClasses[size]

  return (
    <Link to="/" className={cn("flex items-center", className)}>
      <div className={cn(
        "rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white",
        currentSize.icon,
        showText ? "mr-3" : ""
      )}>
        <i className="fa-solid fa-leaf"></i>
      </div>
      {showText && (
        <span className={cn(
          "font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-teal-600 dark:from-green-400 dark:to-teal-300",
          currentSize.text
        )}>
          星空平台
        </span>
      )}
    </Link>
  )
}

// ============ NavLink 组件 ============
interface NavLinkProps {
  to: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "mobile"
  isActive?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  children, 
  className,
  variant = "default",
  isActive = false
}) => {
  const baseClasses = "font-medium transition-colors duration-200"
  
  const variantClasses = {
    default: cn(
      "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400",
      isActive && "text-green-600 dark:text-green-400"
    ),
    mobile: cn(
      "block px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md",
      isActive && "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
    )
  }

  return (
    <Link 
      to={to} 
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </Link>
  )
}

// ============ UserMenu 组件 ============
interface UserMenuProps {
  isAuthenticated: boolean
  onLogout: () => void
  className?: string
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  isAuthenticated, 
  onLogout, 
  className 
}) => {
  if (isAuthenticated) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-700 dark:text-green-300">
          <i className="fa-solid fa-user"></i>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
        >
          退出
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex space-x-2", className)}>
      <Button variant="ghost" size="sm" asChild>
        <Link to="/login">登录</Link>
      </Button>
      <Button size="sm" asChild>
        <Link to="/register">注册</Link>
      </Button>
    </div>
  )
}

// ============ ThemeToggle 组件 ============
interface ThemeToggleProps {
  theme: string
  onToggle: () => void
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  theme, 
  onToggle, 
  className 
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={cn("text-gray-600 dark:text-gray-300", className)}
      aria-label="切换主题"
    >
      <i className={cn("fa-solid", theme === 'dark' ? "fa-sun" : "fa-moon")}></i>
    </Button>
  )
}

// ============ MobileMenuButton 组件 ============
interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ 
  isOpen, 
  onToggle, 
  className 
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={cn("md:hidden", className)}
      aria-label="打开菜单"
    >
      <i className={cn("fa-solid", isOpen ? "fa-times" : "fa-bars")}></i>
    </Button>
  )
}

// ============ FooterSection 组件 ============
interface FooterLink {
  label: string
  path: string
}

interface FooterSectionProps {
  title: string
  links: FooterLink[]
  className?: string
}

const FooterSection: React.FC<FooterSectionProps> = ({ 
  title, 
  links, 
  className 
}) => {
  return (
    <div className={className}>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label} className="mb-1">
            <Link
              to={link.path}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center group/item"
            >
              <span>{link.label}</span>
              <span className="ml-2 text-green-500 dark:text-green-400 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { 
  Logo, 
  NavLink, 
  UserMenu, 
  ThemeToggle, 
  MobileMenuButton, 
  FooterSection 
}
