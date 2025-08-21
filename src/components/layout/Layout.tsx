import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  hasSidebar?: boolean;
}

export function Layout({ children, className = '', hasSidebar = false }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main 
        className={cn(
          "flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8",
          hasSidebar ? "flex" : "",
          className
        )}
      >
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}