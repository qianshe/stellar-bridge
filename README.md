# Stellar Bridge

[**项目地址**](https://space.coze.cn/task/7539130254037221686)

## 🚀 技术栈

### 核心框架
- **React 18.3.1** - 现代React框架，支持并发特性
- **TypeScript 5.7.2** - 类型安全的JavaScript超集
- **Vite 6.2.0** - 极速的前端构建工具
- **React Router DOM 7.3.0** - 客户端路由管理

### UI组件与样式
- **Tailwind CSS 3.4.17** - 实用优先的CSS框架
- **shadcn/ui** - 基于Radix UI的现代组件系统
- **Radix UI** - 无样式、可访问的UI组件库
- **Framer Motion 12.9.2** - 强大的动画库
- **Recharts 2.15.1** - React图表库
- **Lucide React** - 现代化的图标库

### 工具库
- **Zod 3.24.2** - TypeScript优先的模式验证
- **Sonner 2.0.2** - 优雅的Toast通知组件
- **clsx & tailwind-merge** - 类名处理工具

## 📦 本地开发

### 环境准备

- 安装 [Node.js](https://nodejs.org/en) (推荐 v20+)
- 使用 npm 作为包管理器

### 操作步骤

1. **安装依赖**

```sh
npm install
```

2. **启动开发服务器**

```sh
npm run dev
```

3. **在浏览器访问** http://localhost:3000

### 构建项目

```sh
npm run build
```

### 其他命令

```sh
# 预览构建结果
npm run preview

# 类型检查
npm run type-check

# 清理缓存和构建文件
npm run clean

# 部署构建（清理+安装+构建）
npm run deploy:build

# 构建并启动预览服务器
npm run serve
```

## 📁 项目结构

```
stellar-bridge/
├── src/
│   ├── components/     # 可复用组件
│   ├── contexts/       # React Context
│   ├── hooks/          # 自定义Hooks
│   ├── lib/            # 工具函数
│   ├── pages/          # 页面组件
│   └── main.tsx        # 应用入口
├── public/             # 静态资源
├── dist/               # 构建输出
└── package.json        # 项目配置
```

## 🔧 开发说明

### 包管理器迁移
项目已从 pnpm 迁移到 npm，所有脚本命令已更新：
- ✅ 使用 `npm install` 安装依赖
- ✅ 使用 `npm run dev` 启动开发服务器
- ✅ 使用 `npm run build` 构建项目

### 组件库
项目已迁移到 shadcn/ui 组件系统，提供：
- ✅ **现代化设计** - 基于最新设计趋势的组件
- ✅ **完整类型支持** - 全面的TypeScript类型定义
- ✅ **无障碍访问** - 基于Radix UI的可访问性支持
- ✅ **高度可定制** - 通过Tailwind CSS轻松自定义样式
- ✅ **一致的API** - 统一的组件接口和使用方式

#### 已安装的组件
- Button - 按钮组件（支持多种变体和尺寸）
- Card - 卡片组件（包含Header、Content等子组件）
- Input - 输入框组件
- Label - 标签组件
- Separator - 分隔符组件
- Tabs - 标签页组件

## 🎯 特性

- ⚡️ **极速开发** - Vite提供毫秒级热更新
- 🎨 **现代UI** - Tailwind CSS + Radix UI
- 📱 **响应式设计** - 适配各种设备
- 🔒 **类型安全** - 全面的TypeScript支持
- 🎭 **流畅动画** - Framer Motion动画库
- 📊 **数据可视化** - Recharts图表组件
