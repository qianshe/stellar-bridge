import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, MessageCircle, Calendar, TrendingUp, Eye, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Mock data for connection projects
const connectionProjects = [
  {
    id: 1,
    title: '高效太阳能光伏板采购',
    demandId: 'XQ20250715001',
    resourceId: 'ZY20250620045',
    resourceProvider: '绿色能源科技有限公司',
    status: 'negotiating', // 'matching', 'negotiating', 'contracting', 'executing', 'completed', 'canceled'
    statusText: '洽谈中',
    statusColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    progress: 40,
    createTime: '2025-07-15',
    expectedCompletion: '2025-08-30',
    recentUpdate: '2025-08-05',
    messages: 12,
    unreadMessages: 3,
  },
  {
    id: 2,
    title: '有机肥料供应合作',
    demandId: 'XQ20250722003',
    resourceId: 'ZY20250702018',
    resourceProvider: '生态农业合作社',
    status: 'contracting', // 'matching', 'negotiating', 'contracting', 'executing', 'completed', 'canceled'
    statusText: '合同签订中',
    statusColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    progress: 65,
    createTime: '2025-07-22',
    expectedCompletion: '2025-09-15',
    recentUpdate: '2025-08-10',
    messages: 8,
    unreadMessages: 0,
  },
  {
    id: 3,
    title: '污水处理设备安装项目',
    demandId: 'XQ20250610012',
    resourceId: 'ZY20250518033',
    resourceProvider: '环保科技工程有限公司',
    status: 'executing', // 'matching', 'negotiating', 'contracting', 'executing', 'completed', 'canceled'
    statusText: '执行中',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    progress: 80,
    createTime: '2025-06-10',
    expectedCompletion: '2025-08-20',
    recentUpdate: '2025-08-14',
    messages: 24,
    unreadMessages: 0,
  },
  {
    id: 4,
    title: '生物质能技术合作开发',
    demandId: 'XQ20250528007',
    resourceId: 'ZY20250422021',
    resourceProvider: '新能源研究院',
    status: 'completed', // 'matching', 'negotiating', 'contracting', 'executing', 'completed', 'canceled'
    statusText: '已完成',
    statusColor: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    progress: 100,
    createTime: '2025-05-28',
    expectedCompletion: '2025-07-30',
    recentUpdate: '2025-07-28',
    messages: 36,
    unreadMessages: 0,
  },
  {
    id: 5,
    title: '小型风力发电系统采购',
    demandId: 'XQ20250705009',
    resourceId: 'ZY20250615014',
    resourceProvider: '风能设备制造有限公司',
    status: 'canceled', // 'matching', 'negotiating', 'contracting', 'executing', 'completed', 'canceled'
    statusText: '已取消',
    statusColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    progress: 25,
    createTime: '2025-07-05',
    expectedCompletion: '2025-08-25',
    recentUpdate: '2025-07-20',
    messages: 5,
    unreadMessages: 0,
  },
];

// Mock data for detailed connection information
const connectionDetails = {
  id: 2,
  title: '有机肥料供应合作',
  demandId: 'XQ20250722003',
  resourceId: 'ZY20250702018',
  resourceProvider: '生态农业合作社',
  resourceProviderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=organic%20farm%20logo&sign=e3ae4cebe16213649a0b92a8c2afa63d',
  status: 'contracting',
  statusText: '合同签订中',
  statusColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  progress: 65,
  createTime: '2025-07-22',
  expectedCompletion: '2025-09-15',
  recentUpdate: '2025-08-10',
  
  // Demand information
  demandInfo: {
    title: '有机肥料采购需求',
    quantity: '50吨',
    specifications: '氮磷钾复合肥，有机质≥45%',
    deliveryTime: '2025-09-15前',budget: '¥900,000',
  },
  
  // Resource information
  resourceInfo: {
    title: '有机肥料（氮磷钾复合）',
    model: 'OF-2025',
    specifications: '氮磷钾比例3:2:2，有机质48%，水分≤15%',
    unitPrice: '¥18,000/吨',
    deliveryCapacity: '20吨/周',
    certification: '有机认证、ISO9001质量认证',
  },
  
  // Timeline
  timeline: [
    {
      id: 1,
      time: '2025-07-22 10:30',
      title: '需求发布',
      description: '发布有机肥料采购需求',
      status: 'completed',
    },
    {
      id: 2,
      time: '2025-07-23 09:15',
      title: '智能匹配',
      description: '系统匹配到生态农业合作社的有机肥料资源',
      status: 'completed',
    },
    {
      id: 3,
      time: '2025-07-25 14:20',
      title: '对接开始',
      description: '与生态农业合作社开始对接沟通',
      status: 'completed',
    },
    {
      id: 4,
      time: '2025-08-02 16:45',
      title: '样品确认',
      description: '收到样品并确认符合要求',
      status: 'completed',
    },
    {
      id: 5,
      time: '2025-08-08 11:30',
      title: '价格协商',
      description: '双方达成价格协议',
      status: 'completed',
    },
    {
      id: 6,
      time: '2025-08-10 09:40',
      title: '合同起草',
      description: '供应商起草合同并提交审核',
      status: 'in_progress',
    },
    {
      id: 7,
      time: '',
      title: '合同签订',
      description: '双方签署正式合同',
      status: 'pending',
    },
    {
      id: 8,
      time: '',
      title: '生产备货',
      description: '供应商安排生产和备货',
      status: 'pending',
    },
    {
      id: 9,
      time: '',
      title: '物流配送',
      description: '肥料配送至指定地点',
      status: 'pending',
    },
    {
      id: 10,
      time: '',
      title: '验收完成',
      description: '需求方验收合格',
      status: 'pending',
    },
  ],
  
  // Messages
  messages: [
    {
      id: 1,
      sender: '对方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=organic%20farm%20logo&sign=e3ae4cebe16213649a0b92a8c2afa63d',
      content: '您好，我们看到了您发布的有机肥料采购需求，我们合作社可以提供符合要求的产品。',
      time: '2025-07-23 09:15',
      read: true,
    },
    {
      id: 2,
      sender: '我方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=company%20logo&sign=e1e47500e1f20618befb6ea4922c6320',
      content: '您好，请问贵社的有机肥料具体参数是什么？能否提供样品？',
      time: '2025-07-23 14:22',
      read: true,
    },
    {
      id: 3,
      sender: '对方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=organic%20farm%20logo&sign=e3ae4cebe16213649a0b92a8c2afa63d',
      content: '我们的有机肥料氮磷钾比例3:2:2，有机质含量48%，符合国家标准。样品可以提供，我们会尽快安排寄送。',
      time: '2025-07-24 09:05',
      read: true,
    },
    {
      id: 4,
      sender: '对方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=organic%20farm%20logo&sign=e3ae4cebe16213649a0b92a8c2afa63d',
      content: '样品已通过顺丰快递寄出，运单号：SF1234567890，预计明天到达。',
      time: '2025-07-28 16:30',
      read: true,
    },
    {
      id: 5,
      sender: '我方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=company%20logo&sign=e1e47500e1f20618befb6ea4922c6320',
      content: '样品已收到，正在检测中，预计明天给您结果。',
      time: '2025-07-29 15:40',
      read: true,
    },
    {
      id: 6,
      sender: '我方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=company%20logo&sign=e1e47500e1f20618befb6ea4922c6320',
      content: '样品检测合格，符合我们的要求。关于价格，希望能给到更优惠的批量采购价。',
      time: '2025-08-01 10:15',
      read: true,
    },
    {
      id: 7,
      sender: '对方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=organic%20farm%20logo&sign=e3ae4cebe16213649a0b92a8c2afa63d',
      content: '感谢反馈！考虑到您的采购量较大，我们可以给到¥18,000/吨的价格，这是我们能提供的最优惠价格了。',
      time: '2025-08-02 14:30',
      read: true,
    },
    {
      id: 8,
      sender: '我方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=company%20logo&sign=e1e47500e1f20618befb6ea4922c6320',
      content: '好的，这个价格我们接受。请尽快起草合同，我们希望能尽快完成签约。',
      time: '2025-08-08 11:30',
      read: true,
    },
    {
      id: 9,
      sender: '对方',
      senderAvatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=organic%20farm%20logo&sign=e3ae4cebe16213649a0b92a8c2afa63d',
      content: '合同已起草完成，请查收附件。如无问题，我们可以安排线上签约。',
      time: '2025-08-10 09:40',
      read: true,
      attachments: [
        { name: '有机肥料采购合同.pdf', size: '1.2MB', type: 'pdf' },
      ],
    },
  ],
  
  // Documents
  documents: [
    {
      id: 1,
      name: '有机肥料检测报告.pdf',
      type: 'pdf',
      size: '1.5MB',
      uploadTime: '2025-08-01',
      uploadedBy: '我方',
    },
    {
      id: 2,
      name: '产品规格说明书.docx',
      type: 'docx',
      size: '850KB',
      uploadTime: '2025-07-24',
      uploadedBy: '对方',
    },
    {
      id: 3,
      name: '有机认证证书.jpg',
      type: 'jpg',
      size: '2.3MB',
      uploadTime: '2025-07-25',
      uploadedBy: '对方',
    },
    {
      id: 4,
      name: '有机肥料采购合同.pdf',
      type: 'pdf',
      size: '1.2MB',
      uploadTime: '2025-08-10',
      uploadedBy: '对方',
    },
  ],
  
  // Tasks
  tasks: [
    {
      id: 1,
      title: '合同审核',
      assignee: '我方',
      dueDate: '2025-08-15',
      status: 'pending', // 'pending', 'in_progress', 'completed'
    },
    {
      id: 2,
      title: '合同签署',
      assignee: '双方',
      dueDate: '2025-08-20',
      status: 'pending',
    },
    {
      id: 3,
      title: '预付款支付',
      assignee: '我方',
      dueDate: '2025-08-25',
      status: 'pending',
    },
    {
      id: 4,
      title: '生产安排',
      assignee: '对方',
      dueDate: '2025-08-30',
      status: 'pending',
    },
  ],
  
  // Progress chart data
  progressData: [
    { date: '7/22', progress: 10 },
    { date: '7/25', progress: 20 },
    { date: '7/28', progress: 30 },
    { date: '8/1', progress: 45 },
    { date: '8/5', progress: 55 },
    { date: '8/10', progress: 65 },
    { date: '8/15', progress: 75 },
    { date: '8/20', progress: 80 },
    { date: '8/30', progress: 90 },
    { date: '9/15', progress: 100 },
  ],
};

export default function ConnectionProgress() {
  // State for view mode (list or detail)
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedConnection, setSelectedConnection] = useState<number | null>(null);
  
  // State for message input
  const [newMessage, setNewMessage] = useState('');
  const [messageAttachments, setMessageAttachments] = useState<File[]>([]);
  
  // State for active tab in detail view
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'messages' | 'documents' | 'tasks'>('overview');
  
  // Handle selecting a connection
  const handleSelectConnection = (connectionId: number) => {
    setSelectedConnection(connectionId);
    setViewMode('detail');
    setActiveDetailTab('overview');
  };
  
  // Handle back to list
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedConnection(null);
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() || messageAttachments.length > 0) {
      // In a real application, this would send the message to the server
      console.log('New message:', newMessage);
      console.log('Attachments:', messageAttachments);
      
      // Clear form
      setNewMessage('');
      setMessageAttachments([]);
      
      // Show success feedback (in real app, this would be a toast)
      alert('消息发送成功');
    }
  };
  
  // Handle file attachment for messages
  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMessageAttachments(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };
  
  // Remove attachment
  const removeAttachment = (index: number) => {
    setMessageAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">对接进度跟踪</h1>
          <p className="text-gray-600 dark:text-gray-400">
            查看和管理您的资源对接项目进度
          </p>
        </div>
        
        {viewMode === 'detail' && (
          <Button
            variant="outline"
            onClick={handleBackToList}
            className="flex items-center"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            返回列表
          </Button>
        )}
      </div>
      
      {/* Connection list view */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Filter and search */}
          <Card className="shadow-sm border border-gray-100 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="搜索对接项目..."
                    className="pl-10 bg-gray-50 dark:bg-gray-900 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 focus:ring-green-500 focus:border-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="matching">匹配中</SelectItem>
                      <SelectItem value="negotiating">洽谈中</SelectItem>
                      <SelectItem value="contracting">合同签订中</SelectItem>
                      <SelectItem value="executing">执行中</SelectItem>
                      <SelectItem value="completed">已完成</SelectItem>
                      <SelectItem value="canceled">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 focus:ring-green-500 focus:border-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有时间</SelectItem>
                      <SelectItem value="week">最近一周</SelectItem>
                      <SelectItem value="month">最近一个月</SelectItem>
                      <SelectItem value="quarter">最近三个月</SelectItem>
                      <SelectItem value="halfyear">最近半年</SelectItem>
                      <SelectItem value="year">最近一年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Connection projects list */}
          <Card className="shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>项目名称</TableHead>
                      <TableHead>资源提供方</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>进度</TableHead>
                      <TableHead>开始日期</TableHead>
                      <TableHead>预计完成</TableHead>
                      <TableHead>最近更新</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {connectionProjects.map((project) => (
                      <TableRow
                        key={project.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                        onClick={() => handleSelectConnection(project.id)}
                      >
                        <TableCell>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {project.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            需求ID: {project.demandId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-700 dark:text-gray-300">{project.resourceProvider}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={project.statusColor}>
                            {project.statusText}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress
                              value={project.progress}
                              className="w-full h-2"
                            />
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {project.progress}% 完成
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-700 dark:text-gray-300">{project.createTime}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-700 dark:text-gray-300">{project.expectedCompletion}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-700 dark:text-gray-300">{project.recentUpdate}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                            查看详情
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  显示 1-5 条，共 12 条
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Connection detail view */}
      {viewMode === 'detail' && selectedConnection === connectionDetails.id && (
        <div className="space-y-8">
          {/* Project header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{connectionDetails.title}</h2>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${connectionDetails.statusColor}`}>
                    {connectionDetails.statusText}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  需求ID: {connectionDetails.demandId} | 资源ID: {connectionDetails.resourceId} | 创建时间: {connectionDetails.createTime}
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-1">
                  <div 
                    className="h-3 rounded-full bg-green-500" 
                    style={{ width: `${connectionDetails.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-gray-600 dark:text-gray-400">
                    进度: {connectionDetails.progress}% 完成
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    预计完成: {connectionDetails.expectedCompletion}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 w-full md:w-auto">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">需求方</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">绿色生态农业公司</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">资源提供方</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{connectionDetails.resourceProvider}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">最近更新</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{connectionDetails.recentUpdate}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detail tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeDetailTab === 'overview'
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveDetailTab('overview')}
              >
                <i className="fa-dashboard mr-2"></i>概览
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeDetailTab === 'messages'
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveDetailTab('messages')}
              >
                <i className="fa-comments mr-2"></i>沟通记录
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-800 text-xs font-medium dark:bg-green-900/30 dark:text-green-400">
                  8
                </span>
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeDetailTab === 'documents'
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveDetailTab('documents')}
              >
                <i className="fa-file-text-o mr-2"></i>文档资料
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeDetailTab === 'tasks'
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveDetailTab('tasks')}
              >
                <i className="fa-tasks mr-2"></i>任务管理
              </button>
            </div>
            
            {/* Overview tab content */}
            {activeDetailTab === 'overview' && (
              <div className="p-6 space-y-8">
                {/* Basic information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Demand information */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <i className="fa-shopping-cart text-blue-500 mr-2"></i>
                      需求信息
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">需求标题:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.demandInfo.title}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">采购数量:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.demandInfo.quantity}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">规格要求:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.demandInfo.specifications}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">交货时间:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.demandInfo.deliveryTime}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">预算金额:</span>
                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">{connectionDetails.demandInfo.budget}</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Resource information */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <i className="fa-cubes text-green-500 mr-2"></i>
                      资源信息
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">资源标题:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.resourceInfo.title}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">型号规格:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.resourceInfo.model}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">技术参数:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.resourceInfo.specifications}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">单价:</span>
                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">{connectionDetails.resourceInfo.unitPrice}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">供货能力:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.resourceInfo.deliveryCapacity}</span>
                      </li>
                      <li className="flex">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 w-28">认证信息:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{connectionDetails.resourceInfo.certification}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">对接进度时间线</h3>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    
                    {/* Timeline items */}
                    <div className="space-y-6">
                      {connectionDetails.timeline.map((item) => (
                        <div key={item.id} className="relative pl-12">
                          <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                            item.status === 'completed' 
                              ? 'bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400'
                              : item.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            {item.status === 'completed' ? (
                              <i className="fa-check"></i>
                            ) : item.status === 'in_progress' ? (
                              <i className="fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fa-clock-o"></i>
                            )}
                          </div>
                          
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-base font-medium text-gray-900 dark:text-white">{item.title}</h4>
                              {item.time && (
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {item.time}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Progress chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">项目进度趋势</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={connectionDetails.progressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }} 
                          formatter={(value) => [`${value}%`, '完成度']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="progress" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="项目进度"
                          strokeDasharray={connectionDetails.progressData.some(item => item.date === new Date().toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }).replace('/', '/')) ? '' : '5 5'}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
            
            {/* Messages tab content */}
            {activeDetailTab === 'messages' && (
              <div className="flex flex-col h-[calc(100vh-320px)]">
                {/* Messages list */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                  {connectionDetails.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === '我方' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex max-w-[80%] ${message.sender === '我方' ? 'flex-row-reverse' : ''}`}>
                        <img 
                          src={message.senderAvatar} 
                          alt={message.sender}
                          className="w-10 h-10 rounded-full object-cover mr-3 ml-0"
                        />
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-500">
                              {message.sender}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-600 ml-2">
                              {message.time}
                            </span>
                          </div>
                          <div className={`p-4 rounded-lg ${
                            message.sender === '我方'
                              ? 'bg-green-50 text-gray-900 dark:bg-green-900/30 dark:text-gray-100 rounded-br-none'
                              : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-bl-none'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            
                            {/* Attachments */}
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <i className={`fa-file-${attachment.type}-o text-gray-400 mr-3`}></i>
                                    <div className="flex-grow min-w-0">
                                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{attachment.name}</p>
                                      <p className="text-xs text-gray-500 dark:text-gray-500">{attachment.size}</p>
                                    </div>
                                    <button className="ml-3 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                                      <i className="fa-download"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message input */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  {/* Attachments preview */}
                  {messageAttachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      {messageAttachments.map((file, index) => (
                        <div key={index} className="flex items-center px-3 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                          <i className="fa-file-o text-gray-400 mr-2"></i>
                          <span className="truncate max-w-[150px]">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setMessageAttachments(prev => prev.filter((_, i) => i !== index))}
                            className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          >
                            <i className="fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex">
                    <div className="flex items-center space-x-2 mr-2">
                      <label htmlFor="message-attachment" className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
                        <i className="fa-paperclip"></i>
                      </label>
                      <input
                        type="file"
                        id="message-attachment"
                        className="hidden"
                        multiple
                        onChange={handleFileAttachment}
                      />
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <i className="fa-smile-o"></i>
                      </button>
                    </div>
                    <div className="flex-grow relative">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                        placeholder="输入消息内容..."
                        rows={2}
                      ></textarea>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() && messageAttachments.length === 0}
                      className="ml-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      发送
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Documents tab content */}
            {activeDetailTab === 'documents' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">文档资料</h3>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 flex items-center">
                    <i className="fa-upload mr-2"></i>
                    上传文档
                  </button>
                </div>
                
                <div className="space-y-4">
                  {connectionDetails.documents.map((doc) => (
                    <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded flex items-center justify-center mr-4 ${
                          doc.type === 'pdf' ? 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400' :
                          doc.type === 'docx' ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400' :
                          doc.type === 'jpg' || doc.type === 'png' ? 'bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          <i className={`fa-file-${doc.type}-o text-lg`}></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {doc.size} · {doc.uploadTime} · 上传者: {doc.uploadedBy}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <i className="fa-download"></i>
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <i className="fa-eye"></i>
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <i className="fa-ellipsis-v"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tasks tab content */}
            {activeDetailTab === 'tasks' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">任务管理</h3>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 flex items-center">
                    <i className="fa-plus mr-2"></i>
                    创建任务
                  </button>
                </div>
                
                <div className="space-y-4">
                  {connectionDetails.tasks.map((task) => (
                    <div key={task.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 mr-3 ${
                            task.status === 'completed'
                              ? 'border-green-500 bg-green-500 text-white'
                              : task.status === 'in_progress'
                                ? 'border-blue-500 bg-blue-500 text-white'
                                : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {task.status === 'completed' && <i className="fa-check text-xs"></i>}
                            {task.status === 'in_progress' && <i className="fa-spinner fa-spin text-xs"></i>}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h4>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-1">
                              <span className="flex items-center mr-4">
                                <i className="fa-user-o mr-1"></i>
                                {task.assignee}
                              </span>
                              <span className="flex items-center">
                                <i className="fa-calendar-o mr-1"></i>
                                截止日期: {task.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                          task.status === 'completed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : task.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {task.status === 'completed' ? '已完成' : task.status === 'in_progress' ? '进行中' : '待处理'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}