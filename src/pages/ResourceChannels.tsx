import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 资源通道数据
const resourceChannels = [
  {
    id: 1,
    title: '绿色能源',
    description: '可持续发展的清洁能源资源与技术解决方案',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=renewable%20energy%20sources%20collage&sign=a587c232452794c4677d890b35e82270',
    stats: {
      total: 128,
      available: 112,
      providers: 48,
      successRate: 89,
    },
    tags: ['太阳能', '风能', '水能', '生物质能'],
  },
  {
    id: 2,
    title: '生态农业',
    description: '有机种植、生态养殖等农业资源与技术',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=organic%20farming%20with%20greenhouse&sign=20b8e83fee54a812e12d43005d69ce64',
    stats: {
      total: 96,
      available: 87,
      providers: 36,
      successRate: 85,
    },
    tags: ['有机种植', '生态养殖', '绿色食品'],
  },
  {
    id: 3,
    title: '环保技术',
    description: '污染治理、废物回收等环保技术与服务',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=environmental%20protection%20technology&sign=69208386aa686a9c8b9d7d0949375a8a',
    stats: {
      total: 74,
      available: 68,
      providers: 29,
      successRate: 82,
    },
    tags: ['污染治理', '废物回收', '环保材料'],
  },
  {
    id: 4,
    title: '林业资源',
    description: '可持续林业管理与木材资源开发利用',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=sustainable%20forest%20management&sign=6ae863ea23868215659cb6674828c13b',
    stats: {
      total: 63,
      available: 59,
      providers: 22,
      successRate: 91,
    },
    tags: ['可持续林业', '木材加工', '森林认证'],
  },
  {
    id: 5,
    title: '生态旅游',
    description: '自然生态旅游资源与可持续旅游开发项目',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=ecological%20tourism%20landscape&sign=15c085c79a9459de44db7eb4eb5a6a16',
    stats: {
      total: 45,
      available: 42,
      providers: 18,
      successRate: 87,
    },
    tags: ['生态景区', '可持续旅游', '自然体验'],
  },
  {
    id: 6,
    title: '绿色建材',
    description: '环保、节能型建筑材料与技术解决方案',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=green%20building%20materials&sign=ec87db6a8c893698cb82d3823b08443b',
    stats: {
      total: 52,
      available: 49,
      providers: 24,
      successRate: 84,
    },
    tags: ['环保建材', '节能材料', '可再生材料'],
  },
];

export default function ResourceChannels() {
  // 状态管理
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 筛选资源通道
  const filteredChannels = resourceChannels.filter(channel => {
    // 搜索筛选
    const matchesSearch = searchQuery === '' || 
      channel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // 类别筛选
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'popular' && channel.stats.total > 70) ||
      (activeFilter === 'high-success' && channel.stats.successRate > 85);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">资源通道</h1>
        <p className="text-gray-600 dark:text-gray-400">
          探索各类木属性资源通道，找到满足您需求的最佳解决方案
        </p>
      </div>
      
      {/* 搜索和筛选 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 搜索框 */}
          <div className="relative flex-grow">
            <i className="fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="搜索资源通道..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* 筛选选项 */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeFilter === 'all'
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              全部通道
            </button>
            <button
              onClick={() => setActiveFilter('popular')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeFilter === 'popular'
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              热门资源
            </button>
            <button
              onClick={() => setActiveFilter('high-success')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeFilter === 'high-success'
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              高成功率
            </button>
          </div>
        </div>
      </div>
      
      {/* 资源通道列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((channel, index) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
          >
            <div className="relative">
              <img 
                src={channel.coverImage} 
                alt={channel.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{channel.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {channel.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                {channel.description}
              </p>
              
              {/* 统计数据 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-700 dark:text-green-400">{channel.stats.total}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">资源总数</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-700 dark:text-blue-400">{channel.stats.available}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">可对接</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-700 dark:text-purple-400">{channel.stats.providers}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">提供方</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-700 dark:text-amber-400">{channel.stats.successRate}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">成功率</div>
                </div>
              </div>
              
              <Link
                to={`/resource-channels/${channel.id}`}
                className="block w-full text-center py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                查看详情 <i className="fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* 空状态 */}
      {filteredChannels.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 mx-auto mb-4 text-gray-400">
            <i className="fa-search text-5xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">未找到匹配的资源通道</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            尝试调整搜索条件或浏览全部资源通道
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            查看全部资源通道
          </button>
        </div>
      )}
      
      {/* 行动召唤 */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            找不到您需要的资源通道?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            告诉我们您的需求，我们将为您寻找或创建合适的资源通道
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/demand-publish"
              className="px-auto py-3 px-8 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-lg shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              发布需求 <i className="fa-paper-plane ml-2"></i>
            </Link>
            
            <Link
              to="/resource-onboarding"
              className="px-auto py-3 px-8 bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              资源方入驻 <i className="fa-sign-in-alt ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}