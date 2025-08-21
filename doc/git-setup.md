# Git 仓库设置指南

## � Git仓库初始化命令

### 1. 初始化仓库
```bash
# 初始化Git仓库
git init

# 配置用户信息（仅为当前项目配置，不影响全局设置）
git config user.name "qianshe"
git config user.email "cutoffother@gmail.com"

# 设置主分支为main
git branch -M main
```

**注意**：这里使用的是 `git config`（不带 `--global`），所以用户信息**仅为当前项目配置**，不会影响你的全局Git设置。

#### 用户配置说明
- **项目级配置**：`git config user.name "qianshe"` - 仅影响当前项目
- **全局配置**：`git config --global user.name "your-name"` - 影响所有项目
- **查看配置**：`git config --list` - 查看当前项目的所有配置
- **查看全局配置**：`git config --global --list` - 查看全局配置

这样设置的好处是：
- 不会改变你其他项目的Git用户信息
- 可以为不同项目使用不同的用户身份
- 保持全局设置的独立性

### 2. 配置.gitignore
```bash
# doc文件夹已添加到.gitignore，包含：
# - 开发文档
# - 部署指南
# - 迁移记录
# 这些文件仅用于本地开发参考
```

## �📋 当前状态

✅ **已完成的设置**：
- Git仓库已初始化
- 用户信息已配置（仅当前项目：qianshe / cutoffother@gmail.com）
- doc文件夹已忽略提交
- 主分支已设置为 `main`
- 远程仓库已连接到 GitHub

## 🔗 连接远程仓库

### 1. 添加远程仓库
```bash
# 已通过GitHub MCP找到仓库URL
git remote add origin https://github.com/qianshe/stellar-bridge.git
```

### 2. 推送到GitHub
```bash
# 首次推送（如果网络连接正常）
git push -u origin main

# 如果遇到网络问题，可以：
# 1. 检查网络连接
# 2. 尝试使用VPN
# 3. 或手动上传文件到GitHub
```

### 3. 验证连接
```bash
# 检查远程仓库
git remote -v
```

### 4. SSH方式推送（推荐）
```bash
# 更换为SSH URL（避免网络问题）
git remote set-url origin git@github.com:qianshe/stellar-bridge.git

# 拉取远程内容（如果有冲突）
git pull origin main --allow-unrelated-histories --no-rebase

# 推送代码
git push -u origin main
```

### 5. 当前状态
✅ **已完成**：
- 远程仓库已连接：`git@github.com:qianshe/stellar-bridge.git` (SSH)
- 代码已成功推送到GitHub
- 合并了远程的LICENSE文件
- 本地和远程仓库已同步
- doc文件夹已从版本控制中移除，仅保留本地

## 📦 后续开发工作流

### 日常开发
```bash
# 1. 拉取最新代码
git pull origin main

# 2. 创建功能分支
git checkout -b feature/new-feature

# 3. 开发和提交
git add .
git commit -m "feat: add new feature"

# 4. 推送分支
git push origin feature/new-feature

# 5. 在GitHub上创建Pull Request
```

### 提交信息规范
使用约定式提交格式：
- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式化
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建工具、依赖更新

## 🚀 部署建议

### GitHub Pages
```bash
# 安装gh-pages
npm install --save-dev gh-pages

# 添加部署脚本到package.json
"deploy": "npm run build && gh-pages -d dist/static"
```

### Vercel
1. 连接GitHub仓库到Vercel
2. 设置构建命令：`npm run build`
3. 设置输出目录：`dist/static`

### Netlify
1. 连接GitHub仓库到Netlify
2. 设置构建命令：`npm run build`
3. 设置发布目录：`dist/static`

## 🔧 Git配置优化

### 设置行尾处理（Windows）
```bash
git config core.autocrlf true
```

### 设置默认编辑器
```bash
git config core.editor "code --wait"
```

### 设置别名
```bash
git config alias.st status
git config alias.co checkout
git config alias.br branch
git config alias.cm commit
```

## 📊 项目统计

- **总文件数**: 38个
- **代码行数**: 11,301行
- **主要技术**: React + TypeScript + Vite + shadcn/ui
- **包管理**: npm
- **构建工具**: Vite

## 🎯 下一步

1. 提供GitHub仓库URL
2. 添加远程仓库
3. 推送代码到GitHub
4. 设置CI/CD（可选）
5. 配置部署环境
