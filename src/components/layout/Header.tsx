import { useState, useContext } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { AuthContext } from '@/contexts/authContext';
import {
  Logo,
  NavLink,
  UserMenu,
  ThemeToggle,
  MobileMenuButton
} from '@/components/ui';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Navigation links for the main menu
  const navLinks = [
    { label: '首页', path: '/' },
    { label: '资源通道', path: '/resource-channels' },
    { label: '资源对接', path: '/resource-connection' },
    { label: '需求管理', path: '/demand-publish' },
    { label: '资源入驻', path: '/resource-onboarding' },
    { label: '进度跟踪', path: '/progress-tracking' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-green-100 dark:border-green-900 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          
          {/* Actions: Theme toggle, User menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            
            <UserMenu isAuthenticated={isAuthenticated} onLogout={logout} />
            
            <MobileMenuButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-green-100 dark:border-green-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                variant="mobile"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}