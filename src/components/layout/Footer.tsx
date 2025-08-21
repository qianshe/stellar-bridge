import { Logo, FooterSection } from '@/components/ui';

export function Footer() {
  // Footer navigation links
  const footerLinks = [
    {
      title: '平台服务',
      links: [
        { label: '关于我们', path: '/about' },
        { label: '服务条款', path: '/terms' },
        { label: '隐私政策', path: '/privacy' },
        { label: '帮助中心', path: '/help' },
      ],
    },
    {
      title: '资源合作',
      links: [
        { label: '资源入驻', path: '/resource-onboarding' },
        { label: '合作案例', path: '/cases' },
        { label: '合作咨询', path: '/contact' },
      ],
    },
    {
      title: '开发者',
      links: [
        { label: 'API文档', path: '/api-docs' },
        { label: '开发指南', path: '/dev-guide' },
        { label: '开发者社区', path: '/community' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-green-100 dark:border-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Logo className="mb-4" />
  <div className="flex items-center">
    <p className="text-sm text-gray-600 dark:text-gray-400 mr-4">
      连接资源与需求，共创价值新生态
    </p>
    <div className="flex space-x-3">
      <a href="#" className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
        <i className="fa-brands fa-weixin"></i>
      </a>
      <a href="#" className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
        <i className="fa-brands fa-weibo"></i>
      </a>
      <a href="#" className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
        <i className="fa-brands fa-github"></i>
      </a>
    </div>
  </div>
          </div>

          {/* Footer links */}
             <div className="relative group inline-block">
              <div className="flex space-x-8">
                {footerLinks.map((section) => (
                  <div key={section.title}>
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2 cursor-pointer">
      {section.title}
                    </h3>
                  </div>
                ))}
              </div>
              
        <div className="absolute bottom-full left-0 right-0 transform -translate-y-1 bg-white dark:bg-gray-800 shadow-xl p-6 border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid grid-cols-3 gap-8">
                  {footerLinks.map((section) => (
                    <FooterSection
                      key={section.title}
                      title={section.title}
                      links={section.links}
                    />
                  ))}
                </div>
              </div>
            </div>
        </div>

        {/* Bottom section with copyright */}
         <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} 星空平台 版权所有 | 资源流通体系
          </p>
        </div>
      </div>
    </footer>
  );
}