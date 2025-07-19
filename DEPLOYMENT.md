# 部署指南

## 环境要求
- Node.js 18+
- MongoDB 数据库
- 老张AI API Key

## 部署步骤

### 1. 准备环境变量
在部署平台设置以下环境变量：
- `MONGODB_URL`: MongoDB 连接字符串
- `LAOZHANG_API_KEY`: 老张AI API Key
- `PORT`: 服务器端口（可选，默认8080）

### 2. Render 部署
1. 注册 [Render](https://render.com) 账号
2. 连接 GitHub 仓库
3. 创建新的 Web Service
4. 设置环境变量
5. 部署

### 3. Railway 部署
1. 注册 [Railway](https://railway.app) 账号
2. 连接 GitHub 仓库
3. 设置环境变量
4. 部署

### 4. Vercel 部署（仅前端）
1. 注册 [Vercel](https://vercel.com) 账号
2. 连接 GitHub 仓库
3. 设置构建命令：`npm run build-client`
4. 设置输出目录：`client/dist`
5. 部署

## 本地开发
```bash
# 安装依赖
npm run install-server
npm run install-client

# 启动开发服务器
npm run dev-server  # 后端
npm run dev-client  # 前端
```

## 注意事项
- 确保 `.env` 文件已添加到 `.gitignore`
- 前端需要修改 API 地址为部署后的后端地址
- 建议使用 HTTPS 协议 