import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Filter, Star, MapPin, DollarSign, Users, TrendingUp, Heart, Share2, MessageCircle } from 'lucide-react';

// Mock resource data for a specific channel
const mockResources = [
  {
    id: 1,
    title: '太阳能光伏板组件',
    provider: '绿色能源科技有限公司',
    category: '绿色能源',
    location: '江苏省苏州市',
    price: '面议',
    rating: 4.8,
    reviews: 126,
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=solar%20panel%20installation%20in%20green%20environment&sign=fedb07b86a82cdab359488e02585012f',
    tags: ['可再生能源', '高效节能', '绿色认证'],
    available: true,
  },
  {
    id: 2,
    title: '风力发电设备',
    provider: '清风能源集团',
    category: '绿色能源',
    location: '内蒙古自治区呼和浩特市',
    price: '¥500,000起',
    rating: 4.6,
    reviews: 98,
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=wind%20turbines%20in%20wind%20farm&sign=1ea0690d8938133c1331e6b853106ef4',
    tags: ['风能', '大型设备', '可持续'],
    available: true,
  },
  {
    id: 3,
    title: '生物质能转化技术',
    provider: '生态能源研究院',
    category: '绿色能源',
    location: '北京市海淀区',
    price: '技术合作',
    rating: 4.7,
    reviews: 76,
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=biomass%20energy%20conversion%20plant&sign=e9cbf1c38cc4cd10f26552c1da5ee9ea',
    tags: ['生物质能', '技术转让', '环保'],
    available: true,
  },
  {
    id: 4,
    title: '地热能开发方案',
    provider: '大地热能开发有限公司',
    category: '绿色能源',
    location: '陕西省西安市',
    price: '定制方案',
    rating: 4.5,
    reviews: 54, 
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=geothermal%20energy%20power%20plant&sign=a696516f1bcd17cc8bda8ba829b3db88',
    tags: ['地热能', '技术服务', '长期合作'],
    available: false,
  },
  {
    id: 5,
    title: '小型水力发电设备',
    provider: '蓝色能源科技',
    category: '绿色能源',
    location: '四川省成都市',
    price: '¥200,000起',
    rating: 4.4,
    reviews: 67,
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=small-scale%20hydroelectric%20power%20plant&sign=b185f5dd04ece2be6e3d5cc0bb8f9aac',
    tags: ['水能', '小型设备', '易安装'],
    available: true,
  },
  {
    id: 6,
    title: '储能电池系统',
    provider: '新能源科技股份有限公司',
    category: '绿色能源',
    location: '广东省深圳市',
    price: '¥150,000起',
    rating: 4.9,
    reviews: 132,
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=energy%20storage%20battery%20system&sign=f6daf29dd82fb7a16b57a4b315091cbe',
    tags: ['储能', '锂电池', '智能管理'],
    available: true,
  },
];

// Resource channel categories
const resourceChannels = [
  {
    id: 1,
    title: '绿色能源',
    description: '可持续发展的清洁能源资源与技术解决方案，包括太阳能、风能、水能、生物质能等多种可再生能源形式。',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=renewable%20energy%20sources%20collage&sign=2e0dbc3c4628ff1eb942b97ca21ff02a',
    stats: {
      total: 128,
      available: 112,
      providers: 48,
     对接成功率: 89,
    },
    tags: ['太阳能', '风能', '水能', '生物质能', '储能技术', '智能电网'],
  },
  {
    id: 2,
    title: '生态农业',
    description: '有机种植、生态养殖等农业资源与技术，致力于推动农业可持续发展和绿色食品生产体系建设。',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=organic%20farming%20with%20greenhouse&sign=7847202ef8b340d38e0b1e62c954ec2d',
    stats: {
      total: 96,
      available: 87,
      providers: 36,
     对接成功率: 85,
    },
    tags: ['有机种植', '生态养殖', '绿色食品', '农业技术', '农产品加工'],
  },
  {
    id: 3,
    title: '环保技术',
    description: '污染治理、废物回收等环保技术与服务，专注于环境保护和可持续发展解决方案的提供与实施。',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=environmental%20protection%20technology&sign=99b35b216979f05aaa303d8fe6bc24d7',
    stats: {
      total: 74,
      available: 68,
      providers: 29,
     对接成功率: 82,
    },
    tags: ['污染治理', '废物回收', '环保材料', '环境监测', '清洁生产'],
  },
  {
    id: 4,
    title: '林业资源',
    description: '可持续林业管理与木材资源开发利用，促进森林资源的可持续经营和高效利用。',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=sustainable%20forest%20management&sign=e321f1415bed9a970188c8f95ee2b502',
    stats: {
      total: 63,
      available: 59,
      providers: 22,
     对接成功率: 91,
    },
    tags: ['可持续林业', '木材加工', '森林认证', '林业技术', '林产品'],
  },
];

// Filter options
const filterOptions = {
  priceRanges: [
    { label: '价格不限', value: 'all' },
    { label: '¥10万以下', value: 'below10' },
    { label: '¥10-50万', value: '10-50' },
    { label: '¥50-100万', value: '50-100' },
    { label: '¥100万以上', value: 'above100' },
    { label: '面议/合作', value: 'negotiable' },
  ],
  locations: [
    { label: '地区不限', value: 'all' },
    { label: '华北地区', value: 'north' },
    { label: '华东地区', value: 'east' },
    { label: '华南地区', value: 'south' },
    { label: '西部地区', value: 'west' },
    { label: '东北地区', value: 'northeast' },
  ],
  sortOptions: [
    { label: '推荐排序', value: 'recommended' },
    { label: '价格从低到高', value: 'priceAsc' },
    { label: '价格从高到低', value: 'priceDesc' },
    { label: '评分最高', value: 'rating' },
    { label: '最新发布', value: 'latest' },
  ],
};

export default function ResourceChannelDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const channelId = parseInt(id || '1');
  
  // State for filters and pagination
  const [currentChannel, setCurrentChannel] = useState(resourceChannels[0]);
  const [resources, setResources] = useState(mockResources);
  const [filteredResources, setFilteredResources] = useState(mockResources);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: 'all',
    location: 'all',
    sortBy: 'recommended',
    selectedTags: [] as string[],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch channel data based on ID
  useEffect(() => {
    const channel = resourceChannels.find(c => c.id === channelId);
    if (channel) {
      setCurrentChannel(channel);
    } else {
      // Redirect to 404 if channel not found
      navigate('/404');
    }
  }, [channelId, navigate]);

  // Apply filters
  useEffect(() => {
    let result = [...mockResources];
    
    // Apply price filter
    if (activeFilters.priceRange !== 'all') {
      result = result.filter(resource => {
        if (activeFilters.priceRange === 'negotiable') {
          return resource.price === '面议' || resource.price === '技术合作' || resource.price === '定制方案';
        }
        
        // Extract numeric value from price string
        const priceMatch = resource.price.match(/\d+/);
        if (!priceMatch) return false;
        
        const price = parseInt(priceMatch[0]);
        
        switch (activeFilters.priceRange) {
          case 'below10':
            return price < 10;
          case '10-50':
            return price >= 10 && price <= 50;
          case '50-100':
            return price > 50 && price <= 100;
          case 'above100':
            return price > 100;
          default:
            return true;
        } 
      });
    }
    
    // Apply tag filter
    if (activeFilters.selectedTags.length > 0) {
      result = result.filter(resource => 
        activeFilters.selectedTags.some(tag => resource.tags.includes(tag))
      );
    }
    
    // Apply sorting
    switch (activeFilters.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => {
          const priceA = a.price === '面议' ? Infinity : parseFloat(a.price.replace(/[^\d.-]/g, ''));
          const priceB = b.price === '面议' ? Infinity : parseFloat(b.price.replace(/[^\d.-]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'priceDesc':
        result.sort((a, b) => {
          const priceA = a.price === '面议' ? -Infinity : parseFloat(a.price.replace(/[^\d.-]/g, ''));
          const priceB = b.price === '面议' ? -Infinity : parseFloat(b.price.replace(/[^\d.-]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // Recommended sort (already in mock data order)
        break;
    }
    
    setFilteredResources(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters]);

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle tag selection
  const toggleTagFilter = (tag: string) => {
    setActiveFilters(prev => {
      const selectedTags = prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag];
      
      return {
        ...prev,
        selectedTags,
      };
    });
  };

  // Pagination logic
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Channel header with cover image */}
      <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
        <img 
          src={currentChannel.coverImage} 
          alt={currentChannel.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end">
          <div className="p-6 md:p-8 text-white">
            <div className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full mb-4">
              资源通道
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{currentChannel.title}</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mb-6">{currentChannel.description}</p>
            
            {/* Channel stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-600/30 flex items-center justify-center mr-3">
                  <i className="fa-cubes text-green-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentChannel.stats.total}</div>
                  <div className="text-sm opacity-80">资源总数</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-600/30 flex items-center justify-center mr-3">
                  <i className="fa-check-circle text-green-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentChannel.stats.available}</div>
                  <div className="text-sm opacity-80">可对接资源</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-600/30 flex items-center justify-center mr-3">
                  <i className="fa-building text-green-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentChannel.stats.providers}</div>
                  <div className="text-sm opacity-80">资源提供方</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-600/30 flex items-center justify-center mr-3">
                  <i className="fa-chart-pie text-green-400"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentChannel.stats.对接成功率}%</div>
                  <div className="text-sm opacity-80">对接成功率</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter and search bar */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder={`搜索${currentChannel.title}资源...`}
                className="pl-10 bg-gray-50 dark:bg-gray-900 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Mobile filter button */}
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
          
            {/* Desktop filter dropdowns */}
            <div className="hidden md:flex gap-3">
              <Select value={activeFilters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                <SelectTrigger className="w-40 focus:ring-green-500 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.priceRanges.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={activeFilters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger className="w-40 focus:ring-green-500 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.locations.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={activeFilters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger className="w-40 focus:ring-green-500 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Mobile filter panel */}
          {isFilterOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">价格范围</h3>
              <div className="grid grid-cols-3 gap-2">
                {filterOptions.priceRanges.map(option => (
                  <Button
                    key={option.value}
                    variant={activeFilters.priceRange === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('priceRange', option.value)}
                    className={cn(
                      "text-xs h-8",
                      activeFilters.priceRange === option.value
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">地区</h3>
              <div className="grid grid-cols-3 gap-2">
                {filterOptions.locations.map(option => (
                  <Button
                    key={option.value}
                    variant={activeFilters.location === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('location', option.value)}
                    className={cn(
                      "text-xs h-8",
                      activeFilters.location === option.value
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">排序方式</h3>
              <div className="grid grid-cols-2 gap-2">
                {filterOptions.sortOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={activeFilters.sortBy === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('sortBy', option.value)}
                    className={cn(
                      "text-xs h-8",
                      activeFilters.sortBy === option.value
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          )}
        </CardContent>
      </Card>
        
        {/* Active filters display */}
        {(activeFilters.selectedTags.length > 0 || 
          activeFilters.priceRange !== 'all' || 
          activeFilters.location !== 'all') && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">已选筛选条件:</span>
            
            {activeFilters.priceRange !== 'all' && (
              <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                <span>价格: {filterOptions.priceRanges.find(p => p.value === activeFilters.priceRange)?.label}</span>
                <button 
                  onClick={() => handleFilterChange('priceRange', 'all')}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <i className="fa-times-circle"></i>
                </button>
              </div>
            )}
            
            {activeFilters.location !== 'all' && (
              <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                <span>地区: {filterOptions.locations.find(l => l.value === activeFilters.location)?.label}</span>
                <button 
                  onClick={() => handleFilterChange('location', 'all')}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <i className="fa-times-circle"></i>
                </button>
              </div>
            )}
            
            {activeFilters.selectedTags.map(tag => (
              <div key={tag} className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full px-3 py-1 text-sm">
                <span>{tag}</span>
                <button 
                  onClick={() => toggleTagFilter(tag)}
                  className="ml-2 text-green-500 hover:text-green-700 dark:hover:text-green-300"
                >
                  <i className="fa-times-circle"></i>
                </button>
              </div>
            ))}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveFilters({
                priceRange: 'all',
                location: 'all',
                sortBy: 'recommended',
                selectedTags: [],
              })}
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 ml-2"
            >
              清除全部
            </Button>
          </div>
        )}

      {/* Main content with sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Card className="shadow-md sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">资源标签</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {currentChannel.tags.map(tag => (
                  <Button
                    key={tag}
                    variant={activeFilters.selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTagFilter(tag)}
                    className={cn(
                      "text-sm h-7",
                      activeFilters.selectedTags.includes(tag)
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                    )}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">价格范围</h3>
              <div className="space-y-2">
                {filterOptions.priceRanges.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={option.value}
                      checked={activeFilters.priceRange === option.value}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="w-4 h-4 text-green-600 dark:text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">地区</h3>
              <div className="space-y-2">
                {filterOptions.locations.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="location"
                      value={option.value}
                      checked={activeFilters.location === option.value}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-4 h-4 text-green-600 dark:text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">排序方式</h3>
              <div className="space-y-2">
                {filterOptions.sortOptions.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy"
                      value={option.value}
                      checked={activeFilters.sortBy === option.value}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-4 h-4 text-green-600 dark:text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
              <div className="mt-8">
                <Button asChild className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 shadow-md hover:shadow-lg">
                  <Link to="/demand-publish">
                    发布需求 <TrendingUp className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
        
        {/* Resource grid */}
        <div className="flex-grow">
          {/* Results info */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-700 dark:text-gray-300">
              找到 <span className="font-semibold text-green-600 dark:text-green-400">{filteredResources.length}</span> 个{currentChannel.title}资源
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:inline">显示:</span>
              <button className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fa-th-large"></i>
              </button>
              <button className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fa-list"></i>
              </button>
            </div>
          </div>
          
          {/* Resources grid */}
          {currentResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                  <div className="relative">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    {!resource.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-medium px-3 py-1 bg-red-500 rounded-full text-sm">
                          暂不可用
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="outline" className="w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-0 border-0 text-gray-600 dark:text-gray-400 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {resource.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-black/60 backdrop-blur-sm text-white">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-black/60 backdrop-blur-sm text-white">
                          +{resource.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-1">
                        {resource.title}
                      </h3>
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">{resource.rating}</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      由 <span className="font-medium text-gray-700 dark:text-gray-300">{resource.provider}</span> 提供 · {resource.location}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <div className="text-lg font-bold text-green-700 dark:text-green-400">
                        {resource.price}
                      </div>

                      <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                        <Link to={`/resources/${resource.id}`}>
                          查看详情
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-700">
              <div className="w-20 h-20 mx-auto mb-4 text-gray-400">
                <i className="fa-search text-5xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">未找到匹配资源</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                尝试调整筛选条件或搜索其他关键词
              </p>
              <button
                onClick={() => setActiveFilters({
                  priceRange: 'all',
                  location: 'all',
                  sortBy: 'recommended',
                  selectedTags: [],
                })}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                清除筛选条件
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <nav className="inline-flex rounded-lg shadow">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-l-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <i className="fa-chevron-left"></i>
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  // Show first, last, current and adjacent pages
                  const pageNum = index + 1;
                  const shouldShow = 
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    Math.abs(pageNum - currentPage) <= 1;
                    
                  const isEllipsis = 
                    (pageNum === 2 && currentPage > 3) || 
                    (pageNum === totalPages - 1 && currentPage < totalPages - 2);
                  
                  if (shouldShow) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={cn(
                          "px-4 py-2 border-t border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                          currentPage === pageNum 
                            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-l border-r border-green-200 dark:border-green-800 font-medium"
                            : "border-gray-200 dark:border-gray-700"
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (isEllipsis) {
                    return (
                      <span key={`ellipsis-${pageNum}`} className="px-4 py-2 border-t border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-r-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <i className="fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            找不到您需要的{currentChannel.title}资源?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            发布您的资源需求，我们将为您匹配最合适的资源提供方
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/demand-publish"
              className="px-auto py-3 px-8 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-lg shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              立即发布需求 <i className="fa-paper-plane ml-2"></i>
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