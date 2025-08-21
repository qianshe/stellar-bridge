import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PageContainer,
  PageHeader,
  FilterBar,
  ResourceCard,
  EmptyState
} from '@/components/ui';

// 资源通道数据
const resourceChannels = [
  {
    id: 1,
    title: '能源流通',
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
    title: '农业对接',
    description: '现代农业种植、养殖等资源与技术对接',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=organic%20farming%20with%20greenhouse&sign=20b8e83fee54a812e12d43005d69ce64',
    stats: {
      total: 96,
      available: 87,
      providers: 36,
      successRate: 85,
    },
    tags: ['现代种植', '智能养殖', '优质食品'],
  },
  {
    id: 3,
    title: '技术流通',
    description: '先进技术与服务的流通对接平台',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=environmental%20protection%20technology&sign=69208386aa686a9c8b9d7d0949375a8a',
    stats: {
      total: 74,
      available: 68,
      providers: 29,
      successRate: 82,
    },
    tags: ['技术服务', '解决方案', '创新应用'],
  },
  {
    id: 4,
    title: '资源配置',
    description: '多元化资源管理与优化配置服务',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=sustainable%20forest%20management&sign=6ae863ea23868215659cb6674828c13b',
    stats: {
      total: 63,
      available: 59,
      providers: 22,
      successRate: 91,
    },
    tags: ['资源管理', '优化配置', '可持续发展'],
  },
  {
    id: 5,
    title: '体验服务',
    description: '多元化体验服务资源与可持续项目开发',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=ecological%20tourism%20landscape&sign=15c085c79a9459de44db7eb4eb5a6a16',
    stats: {
      total: 45,
      available: 42,
      providers: 18,
      successRate: 87,
    },
    tags: ['体验服务', '可持续项目', '优质体验'],
  },
  {
    id: 6,
    title: '建材流通',
    description: '高效、节能型建筑材料与技术解决方案',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=green%20building%20materials&sign=ec87db6a8c893698cb82d3823b08443b',
    stats: {
      total: 52,
      available: 49,
      providers: 24,
      successRate: 84,
    },
    tags: ['优质建材', '节能材料', '创新材料'],
  },
];

export default function ResourceChannels() {
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

  // 筛选选项
  const filterOptions = [
    { id: 'all', label: '全部', count: resourceChannels.length },
    { id: 'popular', label: '热门', count: resourceChannels.filter(c => c.stats.total > 70).length },
    { id: 'high-success', label: '高成功率', count: resourceChannels.filter(c => c.stats.successRate > 85).length }
  ];

  return (
    <PageContainer className="space-y-8">
      {/* 页面标题 */}
      <PageHeader
        title="资源通道"
        description="探索各类资源流通通道，找到满足您需求的最佳解决方案"
      />
      
      {/* 搜索和筛选 */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="搜索资源通道..."
        filters={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      {/* 资源通道列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((channel, index) => (
          <ResourceCard
            key={channel.id}
            id={channel.id}
            title={channel.title}
            description={channel.description}
            coverImage={channel.coverImage}
            tags={channel.tags}
            stats={channel.stats}
            href={`/resource-channels/${channel.id}`}
            actionLabel="查看详情"
            delay={index * 0.1}
          />
        ))}
      </div>
      
      {/* 空状态 */}
      {filteredChannels.length === 0 && (
        <EmptyState
          icon="fa-search"
          title="未找到匹配的资源通道"
          description="尝试调整搜索条件或浏览全部资源通道"
          action={{
            label: "查看全部资源通道",
            onClick: () => {
              setSearchQuery('');
              setActiveFilter('all');
            }
          }}
        />
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
    </PageContainer>
  );
}