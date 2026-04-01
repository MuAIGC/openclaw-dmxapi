#!/bin/bash
# DMXAPI 插件发布脚本

set -e

echo "🚀 开始发布 DMXAPI 插件..."

cd "$(dirname "$0")"

# 1. 检查版本号
VERSION=$(node -p "require('./package.json').version")
echo "📦 当前版本：v$VERSION"

# 2. 编译
echo "🔨 编译中..."
npm run build

# 3. 检查必要文件
echo "📋 检查文件..."
for file in dist/index.js README.md package.json; do
  if [ ! -f "$file" ]; then
    echo "❌ 缺少文件：$file"
    exit 1
  fi
done

# 4. 发布到 npm
echo "📤 发布到 npm..."
npm publish --access public

# 5. 完成
echo "✅ 发布完成！"
echo ""
echo "📦 用户可以通过以下命令安装："
echo "   openclaw plugins install openclaw-dmxapi"
echo ""
echo "🔗 npm 链接："
echo "   https://www.npmjs.com/package/openclaw-dmxapi"
