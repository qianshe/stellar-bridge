import { useNavigate } from 'react-router-dom';
import {
  HeroSection,
  StatsSection,
  TestimonialsSection,
  ResourceCategoriesSection
} from '@/components/blocks';
import { PageContainer } from '@/components/ui';

// Mock数据 - 资源分类数据
const resourceCategories = [
  {
    id: 1,
    title: '能源流通',
    description: '可持续发展的清洁能源资源与技术解决方案',
    icon: 'fa-bolt',
    color: 'from-green-500 to-teal-500',
    count: 128,
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=renewable%20energy%20sources%20collage&sign=a587c232452794c4677d890b35e82270',
    tags: ['太阳能', '风能', '水能', '生物质能'],
    stats: {
      total: 128,
      available: 112,
      providers: 48,
      successRate: 89
    }
  },
  {
    id: 2,
    title: '农业对接',
    description: '现代农业种植、养殖等资源与技术对接',
    icon: 'fa-seedling',
    color: 'from-amber-500 to-emerald-500',
    count: 96,
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=organic%20farming%20with%20greenhouse&sign=20b8e83fee54a812e12d43005d69ce64',
    tags: ['现代种植', '智能养殖', '优质食品'],
    stats: {
      total: 96,
      available: 87,
      providers: 36,
      successRate: 85
    }
  },
  {
    id: 3,
    title: '技术流通',
    description: '先进技术与服务的流通对接平台',
    icon: 'fa-cogs',
    color: 'from-blue-500 to-cyan-500',
    count: 74,
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=environmental%20protection%20technology&sign=69208386aa686a9c8b9d7d0949375a8a',
    tags: ['技术服务', '解决方案', '创新应用'],
    stats: {
      total: 74,
      available: 68,
      providers: 29,
      successRate: 82
    }
  },
  {
    id: 4,
    title: '资源配置',
    description: '多元化资源管理与优化配置服务',
    icon: 'fa-network-wired',
    color: 'from-emerald-600 to-emerald-800',
    count: 63,
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=sustainable%20forest%20management&sign=6ae863ea23868215659cb6674828c13b',
    tags: ['资源管理', '优化配置', '可持续发展'],
    stats: {
      total: 63,
      available: 59,
      providers: 22,
      successRate: 91
    }
  },
];

export default function Home() {
  const navigate = useNavigate();

  // Hero区块数据
  const heroProps = {
    title: (
      <>
        连接<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">优质资源</span>，共创流通未来
      </>
    ),
    description: "星空平台为资源供需双方提供高效对接服务，促进流通体系的可持续发展与资源优化配置。",
    primaryAction: {
      label: "发布需求",
      href: "/demand-publish",
      icon: "fa-plus"
    },
    secondaryAction: {
      label: "浏览资源",
      href: "/resource-channels",
      icon: "fa-search"
    },
    stats: {
      value: "500+",
      label: "资源方已入驻"
    },
    heroImage: {
      src: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Green%20nature%20landscape%20with%20forest%20and%20sunlight%20streaming%20through%20trees%20creating%20a%20serene%20environment&sign=1a43bdd4beae7712424adf01c8530c29",
      alt: "木属性生态资源"
    },
    floatingCards: [
      {
        value: "96%",
        label: "用户满意度",
        position: "top-right" as const,
        color: "text-teal-700 dark:text-teal-400"
      },
      {
        value: "88%",
        label: "对接成功率",
        position: "bottom-left" as const,
        color: "text-green-700 dark:text-green-400"
      }
    ],
    variant: "default" as const,
    size: "lg" as const
  };

  // 统计数据
  const platformStats = [
    {
      value: '500+',
      label: '入驻资源方',
      icon: 'fa-building',
      color: 'text-green-600 dark:text-green-400',
      trend: { value: 12, isPositive: true }
    },
    {
      value: '12,580',
      label: '资源总量',
      icon: 'fa-cubes',
      color: 'text-teal-600 dark:text-teal-400',
      trend: { value: 8, isPositive: true }
    },
    {
      value: '2,384',
      label: '成功对接',
      icon: 'fa-handshake',
      color: 'text-emerald-600 dark:text-emerald-400',
      trend: { value: 15, isPositive: true }
    },
    {
      value: '88%',
      label: '对接成功率',
      icon: 'fa-chart-line',
      color: 'text-olive-600 dark:text-olive-400',
      trend: { value: 3, isPositive: true }
    },
  ];



  // 用户评价数据
  const userTestimonials = [
    {
      id: 1,
      name: '张经理',
      title: '项目负责人',
      company: '绿色能源科技公司',
      content: '通过星空平台，我们成功对接了3家优质供应商，资源获取效率提升了60%，合作非常愉快。',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=middle-aged%20asian%20man%20with%20professional%20appearance&sign=05101528d7b3351c2ad4b5850d142981',
      rating: 5
    },
    {
      id: 2,
      name: '李女士',
      title: '技术总监',
      company: '生态农业合作社',
      content: '平台的智能匹配功能非常精准，帮我们找到了理想的技术合作伙伴，解决了长期困扰的种植难题。',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=middle-aged%20asian%20woman%20with%20friendly%20smile&sign=6513077d302d5eea6388df88f6b54291',
      rating: 5
    },
    {
      id: 3,
      name: '王总监',
      title: '创始人',
      company: '环保工程企业',
      content: '作为资源提供方入驻平台后，我们接到了更多优质需求，业务范围得到了有效拓展，感谢平台提供的机会。',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=senior%20asian%20man%20with%20business%20attire&sign=45813197026330c0cd803a87f5a77694',
      rating: 4
    }
  ];

  return (
    <PageContainer className="space-y-16">
      {/* Hero区块 */}
      <HeroSection {...heroProps} />
      
      {/* 统计数据区块 */}
      <StatsSection
        title="平台数据概览"
        description="实时展示平台运营数据，见证我们的成长与用户的信任"
        stats={platformStats}
        columns={4}
        variant="cards"
        centered={true}
      />
      
      {/* 资源分类区块 */}
      <ResourceCategoriesSection
        title="资源通道"
        description="探索我们丰富的木属性资源类别，找到满足您需求的最佳解决方案"
        categories={resourceCategories}
        columns={4}
        onCategoryClick={(categoryId) => navigate(`/resource-channels/${categoryId}`)}
      />
      
      {/* 用户评价区块 */}
      <TestimonialsSection 
        title="用户评价"
        description="听听我们用户的真实反馈"
        testimonials={userTestimonials}
        columns={3}
      />
    </PageContainer>
  );
}
