import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Search, ExternalLink, Database } from 'lucide-react';



// Mock data for charts
const activityData = [
  { month: '1月', 资源数: 40, 需求数: 24 },
  { month: '2月', 资源数: 30, 需求数: 43 },
  { month: '3月', 资源数: 50, 需求数: 25 },
  { month: '4月', 资源数: 78, 需求数: 65 },
  { month: '5月', 资源数: 69, 需求数: 76 },
  { month: '6月', 资源数: 98, 需求数: 87 },
];

const successRateData = [
  { name: '1月', 成功率: 65 },
  { name: '2月', 成功率: 72 },
  { name: '3月', 成功率: 68 },
  { name: '4月', 成功率: 80 },
  { name: '5月', 成功率: 85 },
  { name: '6月', 成功率: 88 },
];

// Resource categories data
const resourceCategories = [
  {
    id: 1,
    title: '绿色能源',
    description: '可持续发展的清洁能源资源与技术解决方案',
    icon: 'fa-leaf',
    color: 'from-green-500 to-teal-500',
    count: 128,
  },
  {
    id: 2,
    title: '生态农业',
    description: '有机种植、生态养殖等农业资源与技术',
    icon: 'fa-apple-alt',
    color: 'from-amber-500 to-emerald-500',
    count: 96,
  },
  {
    id: 3,
    title: '环保技术',
    description: '污染治理、废物回收等环保技术与服务',
    icon: 'fa-recycle',
    color: 'from-blue-500 to-cyan-500',
    count: 74,
  },
  {
    id: 4,
    title: '林业资源',
    description: '可持续林业管理与木材资源开发利用',
    icon: 'fa-tree',
    color: 'from-emerald-600 to-emerald-800',
    count: 63,
  },
];

// Process steps data
const processSteps = [
  {
    step: 1,
    title: '需求发布',
    description: '详细描述您的资源需求和预期目标',
  },
  {
    step: 2,
    title: '智能匹配',
    description: '系统自动匹配最合适的资源提供方',
  },
  {
    step: 3,
    title: '对接沟通',
    description: '与资源提供方直接沟通，确认合作细节',
  },
  {
    step: 4,
    title: '合作达成',
    description: '完成资源对接，跟踪合作进度与效果',
  },
];

export default function Home() {
  return (
    <div className="space-y-20">


      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-green-300 dark:bg-green-900 blur-3xl"></div>
          <div className="absolute left-20 bottom-10 w-72 h-72 rounded-full bg-teal-300 dark:bg-teal-900 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 p-6 md:p-10">
          <div className="md:w-1/2 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              连接<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">木属性资源</span>，共创绿色未来
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-gray-300"
            >
              星空平台为木属性资源供需双方提供高效对接服务，促进绿色生态系统的可持续发展与资源优化配置。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button asChild className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-lg shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <Link to="/demand-publish">
                  发布需求 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="px-8 py-3 bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Link to="/resource-channels">
                  浏览资源 <Search className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-green-700 dark:text-green-400">500+</span> 资源方已入驻
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10 dark:shadow-green-900/20 transform rotate-1 transition-transform duration-500 hover:rotate-0">
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Green%20nature%20landscape%20with%20forest%20and%20sunlight%20streaming%20through%20trees%20creating%20a%20serene%20environment&sign=1a43bdd4beae7712424adf01c8530c29" 
                alt="木属性生态资源" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-sm font-medium">资源对接成功率 88%</span>
                  </div>
                  <h3 className="text-xl font-bold">绿色生态资源网络</h3>
                </div>
              </div>
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-48 transform -rotate-3 transition-transform duration-500 hover:rotate-0">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">2,384</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">成功对接案例</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-48 transform rotate-3 transition-transform duration-500 hover:rotate-0">
              <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">96%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">用户满意度</div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Platform Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: '500+', label: '入驻资源方', icon: 'fa-building', color: 'text-green-600 dark:text-green-400' },
          { value: '12,580', label: '资源总量', icon: 'fa-cubes', color: 'text-teal-600 dark:text-teal-400' },
          { value: '2,384', label: '成功对接', icon: 'fa-handshake', color: 'text-emerald-600 dark:text-emerald-400' },
          { value: '88%', label: '对接成功率', icon: 'fa-chart-line', color: 'text-olive-600 dark:text-olive-400' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300 flex items-center">
                  <i className={`fa ${stat.icon} mr-2`}></i>
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
      
      {/* Resource Categories */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">资源通道</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            探索我们丰富的木属性资源类别，找到满足您需求的最佳解决方案
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resourceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <CardHeader className="p-6 flex-grow">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fa ${category.icon}`}></i>
                  </div>
                  <CardTitle className="text-xl group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 mb-3">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="mb-4">
                    {category.description}
                  </CardDescription>
                  <div className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <Database className="mr-2 h-4 w-4 text-green-500 dark:text-green-500" />
                    {category.count} 个资源
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 mt-auto">
                  <Button asChild variant="outline" className="w-full text-green-700 dark:text-green-400 font-medium border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20">
                    <Link to={`/resource-channels/${category.id}`}>
                      查看详情 <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Platform Activity */}
      <Card className="rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">平台活跃度</h2>
            <p className="text-gray-600 dark:text-gray-400">资源与需求增长趋势分析</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button size="sm" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50">月度</Button>
            <Button size="sm" variant="ghost" className="text-gray-600 dark:text-gray-400">季度</Button>
            <Button size="sm" variant="ghost" className="text-gray-600 dark:text-gray-400">年度</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                <Line 
                  type="monotone" 
                  dataKey="资源数" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="资源数"
                />
                <Line 
                  type="monotone" 
                  dataKey="需求数" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="需求数"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={successRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                  formatter={(value) => [`${value}%`, '成功率']}
                />
                <Area 
                  type="monotone" 
                  dataKey="成功率" 
                  stroke="#10b981" 
                  fill="url(#colorSuccess)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
      
      {/* How It Works */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">对接流程</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">简单四步，实现资源高效对接与合作
          </p>
        </div>
        
        <div className="relative">
          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="rounded-xl shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl mb-3">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-teal-400 to-green-400 -translate-y-1/2 z-0"></div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-lg shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Link to="/resource-onboarding">
              资源方入驻 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">用户评价</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            听听我们的用户如何评价星空平台的资源对接服务
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: '张经理',
              title: '绿色能源科技公司',
              content: '通过星空平台，我们成功对接了3家优质供应商，资源获取效率提升了60%，合作非常愉快。',
              avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=middle-aged%20asian%20man%20with%20professional%20appearance&sign=05101528d7b3351c2ad4b5850d142981',
              rating: 5,
            },
            {
              name: '李女士',
              title: '生态农业合作社',
              content: '平台的智能匹配功能非常精准，帮我们找到了理想的技术合作伙伴，解决了长期困扰的种植难题。',
              avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=middle-aged%20asian%20woman%20with%20friendly%20smile&sign=6513077d302d5eea6388df88f6b54291',
              rating: 5,
            },
            {
              name: '王总监',
              title: '环保工程企业',
              content: '作为资源提供方入驻平台后，我们接到了更多优质需求，业务范围得到了有效拓展，感谢平台提供的机会。',
              avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=senior%20asian%20man%20with%20business%20attire&sign=45813197026330c0cd803a87f5a77694',
              rating: 4,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-star ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      ></i>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-100 dark:border-green-900"
                    />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-500 z-0"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=abstract%20nature%20pattern%20with%20wood%20texture&sign=61e7e0135b43505f195d3e247c710777')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative z-10 px-6 py-16 md:py-24 text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto">
            加入星空平台，共建木属性资源生态系统
          </h2>
          
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            无论您是资源需求方还是提供方，我们都能为您提供高效、精准的对接服务，实现资源价值最大化
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="px-10 py-3 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-lg shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <Link to="/resource-connection">
                开始资源对接 <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}