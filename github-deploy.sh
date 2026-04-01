#!/bin/bash
# GitHub 仓库创建和推送脚本
# 使用方法：bash github-deploy.sh

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
print_success() { echo -e "${GREEN}✔${NC} $1"; }

main() {
    clear
    print_header "GitHub 仓库创建向导"
    
    echo "本向导将帮助您："
    echo "  1. 在 GitHub 创建仓库"
    echo "  2. 推送代码到 GitHub"
    echo "  3. 创建 Release"
    echo ""
    
    # 获取 GitHub 用户名
    echo -n "请输入您的 GitHub 用户名："
    read -r GITHUB_USERNAME
    
    if [ -z "$GITHUB_USERNAME" ]; then
        echo "❌ GitHub 用户名不能为空"
        exit 1
    fi
    
    echo ""
    print_step "步骤 1: 在 GitHub 创建仓库"
    echo ""
    print_info "请打开以下链接创建仓库："
    echo ""
    echo -e "${BLUE}  https://github.com/new?name=openclaw-dmxapi&description=OpenClaw+DMXAPI+Plugin&public${NC}"
    echo ""
    echo "操作指引："
    echo "  1. 点击上方链接"
    echo "  2. 确认仓库名：openclaw-dmxapi"
    echo "  3. 选择 Public（公开）"
    echo "  4. ❌ 不要勾选 'Add a README file'"
    echo "  5. 点击 'Create repository'"
    echo ""
    
    read -p "完成创建后按回车键继续..." -r
    echo ""
    
    # 添加远程仓库
    print_step "步骤 2: 添加远程仓库并推送"
    echo ""
    
    REMOTE_URL="https://github.com/${GITHUB_USERNAME}/openclaw-dmxapi.git"
    
    # 检查是否已存在 remote
    if git remote | grep -q "origin"; then
        git remote set-url origin "$REMOTE_URL"
        print_success "已更新 remote"
    else
        git remote add origin "$REMOTE_URL"
        print_success "已添加 remote"
    fi
    
    # 确保分支名为 main
    git branch -M main 2>/dev/null || true
    
    # 推送
    print_info "正在推送代码到 GitHub..."
    if git push -u origin main 2>&1; then
        print_success "代码推送成功！"
    else
        echo "❌ 推送失败，请检查仓库是否已创建"
        exit 1
    fi
    
    echo ""
    
    # 完成
    print_header "发布完成！"
    
    echo -e "${GREEN}🎉 仓库创建成功！${NC}"
    echo ""
    echo "📦 仓库地址："
    echo -e "${BLUE}  https://github.com/${GITHUB_USERNAME}/openclaw-dmxapi${NC}"
    echo ""
    echo "📥 下一步：创建 Release"
    echo -e "${BLUE}  https://github.com/${GITHUB_USERNAME}/openclaw-dmxapi/releases/new${NC}"
    echo ""
    echo "Release 操作指引："
    echo "  1. 点击上方链接"
    echo "  2. Tag version: v1.0.0"
    echo "  3. Release title: OpenClaw DMXAPI Plugin v1.0.0"
    echo "  4. 上传文件：openclaw-dmxapi-v1.0.0.tar.gz"
    echo "  5. 点击 'Publish release'"
    echo ""
}

main "$@"
