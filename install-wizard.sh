#!/bin/bash
# DMXAPI 测试版插件 - 安装脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "\n${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC} $1"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}\n"
}

print_step() { echo -e "${GREEN}▶${NC} $1"; }
print_info() { echo -e "${YELLOW}ℹ${NC} $1"; }
print_error() { echo -e "${RED}✖${NC} $1"; }
print_success() { echo -e "${GREEN}✔${NC} $1"; }

print_header "DMXAPI 测试版插件 - 安装向导"

echo "欢迎安装 DMXAPI 全功能创意插件测试版！"
echo ""
echo "功能列表："
echo "  💬 智能对话 (GPT-5.2/Claude/Gemini)"
echo "  🎨 文生图 (Gemini 3.1 Flash Image)"
echo "  🖌️ 图片编辑"
echo "  🖼️ 多图融合"
echo "  👁️ 视觉识别"
echo "  🎵 TTS 语音"
echo "  🎥 视频生成"
echo ""

# 步骤 1: 下载插件
print_step "步骤 1: 下载插件..."

TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

print_info "从 GitHub 下载..."
curl -sL "https://github.com/MuAIGC/openclaw-dmxapi/archive/refs/heads/test-v2.tar.gz" -o plugin.tar.gz

if [ ! -f "plugin.tar.gz" ]; then
    print_error "下载失败，请检查网络连接"
    exit 1
fi

tar -xzf plugin.tar.gz
cd openclaw-dmxapi-test-*

# 步骤 2: 安装依赖
print_step "步骤 2: 安装依赖..."
npm install --silent

# 步骤 3: 编译
print_step "步骤 3: 编译插件..."
npm run build --silent

# 步骤 4: 安装到 OpenClaw
print_step "步骤 4: 安装到 OpenClaw..."
openclaw plugins install . 2>&1 | grep -E "(✅|✔|成功|Installed)" || true

# 清理
cd /
rm -rf "$TEMP_DIR"

print_success "插件安装完成！"
echo ""

# 步骤 5: 配置
print_step "步骤 5: 配置 DMXAPI"
echo ""
echo "请配置你的 DMXAPI 凭证："
echo ""
echo "1. 访问 https://www.dmxapi.cn 注册/登录"
echo "2. 进入：个人设置 → 更多选项"
echo "3. 复制：系统令牌 和 用户 ID"
echo ""

# 获取系统令牌
while true; do
    echo -n "请输入 系统令牌："
    read -r SYSTEM_TOKEN
    
    if [ -z "$SYSTEM_TOKEN" ]; then
        print_error "系统令牌不能为空"
        continue
    fi
    
    break
done

while true; do
    echo -n "请输入 用户 ID："
    read -r USER_ID
    
    if [ -z "$USER_ID" ]; then
        print_error "用户 ID 不能为空"
        continue
    fi
    
    break
done

print_info "正在配置..."
openclaw dmxapi-token "$SYSTEM_TOKEN" "$USER_ID" 2>&1 | grep -E "(✅|✔|成功|失败)" || true

# 验证配置
print_step "验证配置..."
echo ""
openclaw dmxapi-balance 2>&1 | grep -A10 "DMXAPI 余额" || true

# 完成
print_header "安装完成！"

echo -e "${GREEN}🎉 DMXAPI 测试版插件已成功安装！${NC}"
echo ""
echo "可用命令："
echo ""
echo "  dmxapi-chat   - 智能对话"
echo "  dmxapi-draw   - 文生图"
echo "  dmxapi-edit   - 图片编辑"
echo "  dmxapi-fuse   - 多图融合"
echo "  dmxapi-vision - 视觉识别"
echo ""
echo "使用示例："
echo "  dmxapi-chat \"你好\""
echo "  dmxapi-draw \"一只可爱的猫咪\""
echo "  dmxapi-edit photo.png \"让图里的人拿着鲜花\""
echo "  dmxapi-fuse image1.png image2.png \"融合两张图片\""
echo "  dmxapi-vision photo.png \"这是什么？\""
echo ""
echo "更多文档："
echo "  https://github.com/MuAIGC/openclaw-dmxapi/blob/test-v2/README.md"
echo ""
print_success "祝您使用愉快！"
echo ""
