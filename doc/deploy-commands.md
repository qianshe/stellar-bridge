Fantasy 项目部署命令列表
========================


## Windows 命令行（CMD）命令

如果您使用的是CMD而不是PowerShell：

1. 构建项目
   ```cmd
   npm run build
   ```

2. 删除目标目录
   ```cmd
   Remove-Item "D:\Docker\nginx\html\fantasy" -Recurse -Force
   ```

3. 复制文件
   ```cmd
   xcopy dist\* "D:\Docker\nginx\html\fantasy\" /E /I /Y
   ```

4. 重启Docker容器
   ```cmd
   docker restart nginx
   ```

完成后访问: http://localhost/fantasy

## 注意事项：
- 确保在项目根目录执行这些命令
- PowerShell和CMD的命令语法不同，请选择对应的版本
- 如果某个命令失败，请检查错误信息后再继续
- 确保Docker服务正在运行
