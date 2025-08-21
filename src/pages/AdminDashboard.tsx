import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Database, ShoppingCart, Handshake, UserPlus, Clock, TrendingUp, TrendingDown, Search, Filter, Eye, MoreHorizontal } from 'lucide-react';

// Mock data for dashboard
const dashboardData = {
  // Key metrics
  keyMetrics: [
    { title: '总用户数', value: 12580, change: 12.5, icon: 'fa-users', color: 'from-blue-500 to-indigo-500' },
    { title: '资源总数', value: 3846, change: 8.2, icon: 'fa-database', color: 'from-green-500 to-teal-500' },
    { title: '需求总数', value: 2453, change: 15.8, icon: 'fa-shopping-cart', color: 'from-purple-500 to-pink-500' },
    { title: '成功对接', value: 1876, change: 20.3, icon: 'fa-handshake-o', color: 'from-amber-500 to-orange-500' },
    { title: '本月新增用户', value: 1256, change: 25.7, icon: 'fa-user-plus', color: 'from-emerald-500 to-cyan-500' },
    { title: '平均对接周期', value: 7.2, unit: '天', change: -1.3, icon: 'fa-clock-o', color: 'from-red-500 to-rose-500' },
  ],
  
  // User growth data
  userGrowthData: [
    { month: '1月', 注册用户: 850, 活跃用户: 620 },
    { month: '2月', 注册用户: 920, 活跃用户: 680 },
    { month: '3月', 注册用户: 1050, 活跃用户: 780 },
    { month: '4月', 注册用户: 1200, 活跃用户: 920 },
    { month: '5月', 注册用户: 1350, 活跃用户: 1050 },
    { month: '6月', 注册用户: 1580, 活跃用户: 1250 },
    { month: '7月', 注册用户: 1850, 活跃用户: 1480 },
    { month: '8月', 注册用户: 2100, 活跃用户: 1750 },
  ],
  
  // Resource category distribution
  resourceCategoryData: [
    { name: '绿色能源', value: 1280, color: '#10b981' },
    { name: '生态农业', value: 960, color: '#8b5cf6' },
    { name: '环保技术', value: 740, color: '#3b82f6' },
    { name: '林业资源', value: 630, color: '#f59e0b' },
    { name: '生态旅游', value: 120, color: '#ec4899' },
    { name: '绿色建材', value: 116, color: '#06b6d4' },
  ],
  
  // Recent activities
  recentActivities: [
    { id: 1, user: '张三', action: '发布了新需求', target: '有机肥料采购需求', time: '2025-08-16 10:23', status: 'normal' },
    { id: 2, user: '李四', action: '完成了资源对接', target: '太阳能光伏板供应', time: '2025-08-16 09:45', status: 'success' },
    { id: 3, user: '王五', action: '入驻平台', target: '环保科技有限公司', time: '2025-08-16 08:30', status: 'normal' },
    { id: 4, user: '赵六', action: '上传了新资源', target: '小型风力发电设备', time: '2025-08-15 16:42', status: 'normal' },
    { id: 5, user: '钱七', action: '取消了需求', target: '污水处理设备采购', time: '2025-08-15 14:20', status: 'warning' },
    { id: 6, user: '孙八', action: '完成了实名认证', target: '个人认证', time: '2025-08-15 11:35', status: 'normal' },
    { id: 7, user: '周九', action: '提交了入驻申请', target: '林业资源开发有限公司', time: '2025-08-15 10:18', status: 'pending' },
    { id: 8, user: '吴十', action: '反馈了问题', target: '资源搜索功能异常', time: '2025-08-14 17:50', status: 'warning' },
  ],
  
  // Pending tasks
  pendingTasks: [
     { id: 1, type: '资源审核', title: '审核 "XX橄榄油原料商" 资质', submitTime: '2025-08-16 09:23', priority: 'high', assignee: '李审核', dueDate: '2025-08-18' },
     { id: 2, type: '用户投诉', title: '处理用户对资源对接的投诉', submitTime: '2025-08-16 14:45', priority: 'high', assignee: '王客服', dueDate: '2025-08-17' },
     { id: 3, type: '平台公告', title: '发布平台最新活动公告', submitTime: '2025-08-15 11:30', priority: 'medium', assignee: '张运营', dueDate: '2025-08-20' },
     { id: 4, type: '入驻申请', title: '审核新资源方入驻申请', submitTime: '2025-08-16 10:15', priority: 'medium', assignee: '赵管理', dueDate: '2025-08-19' },
  ],
  
  // Resource and demand comparison
  resourceDemandComparison: [
    { month: '1月', 资源数: 2400, 需求数: 1800 },
    { month: '2月', 资源数: 2600, 需求数: 1950 },
    { month: '3月', 资源数: 2800, 需求数: 2100 },
    { month: '4月', 资源数: 3100, 需求数: 2250 },
    { month: '5月', 资源数: 3400, 需求数: 2350 },
    { month: '6月', 资源数: 3800, 需求数: 2450 },
  ],
  
  // Connection success rate
  connectionSuccessRate: [
    { name: '绿色能源', rate: 89 },
    { name: '生态农业', rate: 85 },
    { name: '环保技术', rate: 78 },
    { name: '林业资源', rate: 92 },
    { name: '其他', rate: 75 },
  ],
};

export default function AdminDashboard() {
  // State for date range filter
  const [dateRange, setDateRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  
  // State for sidebar navigation
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mr-3">
              <i className="fa-leaf text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-teal-600 dark:from-green-400 dark:to-teal-300">星空平台</span>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
            运营管理
          </p>
          <nav className="space-y-1">
            {[
              { name: 'dashboard', label: '控制台', icon: 'fa-dashboard' },
              { name: 'users', label: '用户管理', icon: 'fa-users' },
              { name: 'resources', label: '资源管理', icon: 'fa-database' },
              { name: 'demands', label: '需求管理', icon: 'fa-shopping-cart' },
              { name: 'connections', label: '对接管理', icon: 'fa-handshake-o' },
              { name: 'content', label: '内容管理', icon: 'fa-file-text-o' },
              { name: 'analytics', label: '数据分析', icon: 'fa-bar-chart' },
              { name: 'settings', label: '系统设置', icon: 'fa-cog' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNavItem(item.name)}
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeNavItem === item.name
                    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <i className={`fa ${item.icon} mr-3`}></i>
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
              帮助与支持
            </p>
            <nav className="space-y-1">
              {[
                { name: 'help', label: '帮助中心', icon: 'fa-question-circle' },
                { name: 'docs', label: '运营文档', icon: 'fa-book' },
                { name: 'contact', label: '联系技术支持', icon: 'fa-life-ring' },
              ].map((item) => (
                <button
                  key={item.name}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <i className={`fa ${item.icon} mr-3`}></i>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=admin%20user%20avatar&sign=beb3a163d676c83fd6208ea00bd98626" 
              alt="Admin user"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">管理员</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">admin@example.com</p>
            </div>
            <button className="ml-auto text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <i className="fa-sign-out"></i>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button className="lg:hidden mr-4 text-gray-500 dark:text-gray-400">
              <i className="fa-bars"></i>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">运营控制台</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <i className="fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="搜索..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all w-64"
              />
            </div>
            
            <div className="relative">
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative">
                <i className="fa-bell"></i>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            
            <div className="relative">
              <button className="flex items-center space-x-2">
                <img 
                  src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=admin%20user%20avatar&sign=beb3a163d676c83fd6208ea00bd98626" 
                  alt="Admin user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">管理员</span>
                <i className="fa-chevron-down text-xs text-gray-500"></i>
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
          <div className="space-y-8">
            {/* Dashboard header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">平台概览</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  欢迎回来，管理员！这是星空平台的运营数据概览
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <div className="flex bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  {['week', 'month', 'quarter', 'year'].map((range) => (
                    <Button
                      key={range}
                      variant="ghost"
                      size="sm"
                      onClick={() => setDateRange(range)}
                      className={cn(
                        "transition-colors",
                        dateRange === range
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      )}
                    >
                      {range === 'week' && '本周'}
                      {range === 'month' && '本月'}
                      {range === 'quarter' && '本季度'}
                      {range === 'year' && '本年'}
                    </Button>
                  ))}
                </div>
                
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                  <i className="fa-download mr-2"></i>导出报告
                </button>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {dashboardData.keyMetrics.map((metric, index) => (
                <motion.div
                  key={metric.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-4`}>
                        {metric.icon === 'fa-users' && <Users className="h-6 w-6" />}
                        {metric.icon === 'fa-database' && <Database className="h-6 w-6" />}
                        {metric.icon === 'fa-shopping-cart' && <ShoppingCart className="h-6 w-6" />}
                        {metric.icon === 'fa-handshake-o' && <Handshake className="h-6 w-6" />}
                        {metric.icon === 'fa-user-plus' && <UserPlus className="h-6 w-6" />}
                        {metric.icon === 'fa-clock-o' && <Clock className="h-6 w-6" />}
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-1">{metric.title}</p>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {metric.value}
                          {metric.unit || ''}
                        </div>
                        <div className={`flex items-center text-sm ${
                          metric.change >= 0
                            ? 'text-green-500 dark:text-green-400'
                            : 'text-red-500 dark:text-red-400'
                        }`}>
                          {metric.change >= 0 ? '+' : ''}{metric.change}%
                          {metric.change >= 0 ? <TrendingUp className="ml-1 h-3 w-3" /> : <TrendingDown className="ml-1 h-3 w-3" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User growth chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>用户增长趋势</CardTitle>
                  </CardHeader>
                  <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">用户增长趋势</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      注册用户
                    </button>
                    <button className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      活跃用户
                    </button>
                  </div>
                </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData.userGrowthData}>
                      <defs>
                        <linearGradient id="colorRegistered" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="注册用户" 
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#colorRegistered)" 
                        name="注册用户"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="活跃用户" 
                        stroke="#10b981" 
                        fillOpacity={1} 
                        fill="url(#colorActive)" 
                        name="活跃用户"
                      />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Resource category distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>资源类别分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardData.resourceCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {dashboardData.resourceCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} 个`, '资源数量']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {dashboardData.resourceCategoryData.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                    </div>
                  ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Second charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Resource and demand comparison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">资源与需求对比</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      资源数
                    </button>
                    <button className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                      需求数
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.resourceDemandComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Legend />
                      <Bar 
                        dataKey="资源数" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]}
                        name="资源数"
                      />
                      <Bar 
                        dataKey="需求数" 
                        fill="#8b5cf6" 
                        radius={[4, 4, 0, 0]}
                        name="需求数"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
              
              {/* Connection success rate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">对接成功率</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={dashboardData.connectionSuccessRate}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" />
                      <YAxis dataKey="name" type="category" stroke="#9ca3af" />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, '成功率']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Bar 
                        dataKey="rate" 
                        fill="#10b981" 
                        radius={[0, 4, 4, 0]}
                        name="成功率"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">86.5%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">平均对接成功率</div>
                </div>
              </motion.div>
            </div>
            
            {/* Recent activities and pending tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">最近活动</h3>
                  <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                    查看全部
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        activity.status === 'success'
                          ? 'bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400'
                        : activity.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : activity.status === 'pending'
                          ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {activity.status === 'success' ? (
                          <i className="fa-check"></i>
                        ) : activity.status === 'warning' ? (
                          <i className="fa-exclamation-triangle"></i>
                        ) : activity.status === 'pending' ? (
                          <i className="fa-clock-o"></i>
                        ) : (
                          <i className="fa-user-o"></i>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                          <span className="font-medium text-green-600 dark:text-green-400 ml-1">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
               {/* Pending tasks */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.3, delay: 0.1 }}
                 className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
               >
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">待处理任务</h3>
                   <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                     查看全部
                   </button>
                 </div>
                 <div className="space-y-4">
                   {dashboardData.pendingTasks.map((task) => (
                     <div key={task.id} className={`flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 ${
                       task.priority === 'high' ? 'border-l-4 border-red-500' : ''
                     }`}>
                       <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                           <h4 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h4>
                           <span className={`px-2 py-0.5 rounded-full text-xs ${
                             task.priority === 'high'
                               ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                               : task.priority === 'medium'
                                 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                               : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                           }`}>
                             {task.priority === 'high' ? '紧急' : '普通'}
                           </span>
                         </div>
                         <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-1">
                           <span className="flex items-center mr-4">
                             <i className="fa-user-o mr-1"></i>
                             {task.assignee}
                           </span>
                           <span className="flex items-center">
                             <i className="fa-calendar-o mr-1"></i>
                             {task.dueDate}
                           </span>
                         </div>
                       </div>
                       <div className="flex space-x-2 ml-4">
                         <button className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors">
                           处理
                         </button>
                         <button className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded transition-colors">
                           延后
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>
               </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}