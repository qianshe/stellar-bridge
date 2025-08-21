import * as React from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  label: string
  icon: string
  disabled?: boolean
  badge?: string | number
}

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarNavProps {
  groups: NavGroup[]
  activeItem: string
  onItemClick: (itemId: string) => void
  collapsed?: boolean
  className?: string
}

const SidebarNav = React.forwardRef<HTMLDivElement, SidebarNavProps>(
  ({ groups, activeItem, onItemClick, collapsed = false, className }, ref) => {
    return (
      <div ref={ref} className={cn("h-full overflow-y-auto", className)}>
        <div className="p-4 space-y-6">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* 分组标题 */}
              {!collapsed && (
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
                  {group.title}
                </p>
              )}
              
              {/* 导航项 */}
              <nav className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => !item.disabled && onItemClick(item.id)}
                    disabled={item.disabled}
                    className={cn(
                      "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
                      activeItem === item.id
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                      item.disabled && "opacity-50 cursor-not-allowed",
                      collapsed && "justify-center"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <i className={cn("fa", item.icon, !collapsed && "mr-3")}></i>
                    
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className={cn(
                            "ml-2 px-2 py-0.5 text-xs rounded-full",
                            activeItem === item.id
                              ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                              : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    )
  }
)
SidebarNav.displayName = "SidebarNav"

export { SidebarNav, type NavItem, type NavGroup }
