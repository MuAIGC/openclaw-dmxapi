#!/bin/bash
# OpenClaw DMXAPI 插件 - 一键安装和配置向导
# 使用场景：云镜像预装，用户只需执行此脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印函数
print_header() {
    echo -e "\n${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC} $1"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}\n"
}

print_step() {
    echo -e "${GREEN}▶${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

print_error() {
    echo -e "${RED}✖${NC} $1"
}

print_success() {
    echo -e "${GREEN}✔${NC} $1"
}

# 主函数
main() {
    clear
    print_header "OpenClaw DMXAPI 插件 - 安装向导"
    
    echo "欢迎使用 DMXAPI 插件安装向导！"
    echo ""
    echo "本向导将帮助您："
    echo "  1. 安装 DMXAPI 插件"
    echo "  2. 注册 DMXAPI 账号（如果没有）"
    echo "  3. 配置系统令牌和用户 ID"
    echo "  4. 验证配置并测试"
    echo ""
    
    read -p "按回车键继续..." -r
    echo
    
    # 步骤 1: 检查插件状态
    print_step "步骤 1: 检查插件状态"
    echo ""
    
    if openclaw plugins list 2>/dev/null | grep -q "dmxapi"; then
        print_info "DMXAPI 插件已安装"
        read -p "是否重新配置？(y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_success "配置已完成！使用以下命令开始使用："
            echo "  openclaw dmxapi-models     # 查看模型"
            echo "  openclaw dmxapi-balance    # 查询余额"
            exit 0
        fi
    else
        print_info "开始安装 DMXAPI 插件..."
        
        # 检查插件目录是否存在
        if [ -d "/MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi" ]; then
            print_step "从本地安装插件..."
            cd /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi
            openclaw plugins install . 2>&1 | grep -E "(✅|✔|成功)" || true
        else
            print_error "插件目录不存在：/MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi"
            print_info "请先克隆或下载插件代码"
            exit 1
        fi
    fi
    
    echo
    read -p "按回车键继续..." -r
    echo
    
    # 步骤 2: 引导注册 DMXAPI
    print_step "步骤 2: 注册 DMXAPI 账号"
    echo ""
    
    echo "DMXAPI 是一个大模型 API 聚合平台，提供："
    echo "  • 766+ 个 AI 模型（GPT/Claude/Gemini/国产模型）"
    echo "  • 统一接口，一个 Key 用所有模型"
    echo "  • 免费额度和优惠价格"
    echo ""
    
    read -p "您已经有 DMXAPI 账号吗？(y/n) " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "请打开以下链接注册账号（免费）："
        echo ""
        echo -e "${BLUE}  https://www.dmxapi.cn/register?aff=LpUa${NC}"
        echo ""
        echo "注册后请完成以下操作："
        echo "  1. 登录 DMXAPI 官网"
        echo "  2. 进入：工作台 → 个人设置 → 更多选项"
        echo "  3. 复制：系统令牌 和 用户 ID"
        echo ""
        
        read -p "完成注册后按回车键继续..." -r
    else
        print_success "已有账号，继续配置"
    fi
    
    echo
    read -p "按回车键继续..." -r
    echo
    
    # 步骤 3: 配置系统令牌
    print_step "步骤 3: 配置 DMXAPI"
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
    
    # 获取用户 ID
    while true; do
        echo -n "请输入 用户 ID："
        read -r USER_ID
        
        if [ -z "$USER_ID" ]; then
            print_error "用户 ID 不能为空"
            continue
        fi
        
        # 验证是否为数字
        if ! [[ "$USER_ID" =~ ^[0-9]+$ ]]; then
            print_error "用户 ID 必须是数字"
            continue
        fi
        
        break
    done
    
    echo
    print_info "正在配置插件..."
    openclaw dmxapi-token "$SYSTEM_TOKEN" "$USER_ID" 2>&1 | grep -E "(✅|✔|成功|失败)" || true
    
    echo
    read -p "按回车键继续..." -r
    echo
    
    # 步骤 4: 验证配置
    print_step "步骤 4: 验证配置"
    echo ""
    
    print_info "查询余额验证配置..."
    if openclaw dmxapi-balance 2>&1 | grep -q "DMXAPI 余额"; then
        print_success "配置成功！"
    else
        print_error "配置失败，请检查系统令牌和用户 ID 是否正确"
        echo ""
        print_info "您可以稍后重新配置："
        echo "  openclaw dmxapi-token <系统令牌> <用户 ID>"
        exit 1
    fi
    
    echo
    read -p "按回车键继续..." -r
    echo
    
    # 步骤 5: 完成
    print_header "安装完成！"
    
    echo -e "${GREEN}🎉 DMXAPI 插件已成功安装并配置！${NC}"
    echo ""
    echo "常用命令："
    echo ""
    echo -e "  ${BLUE}openclaw dmxapi-models${NC}        # 查看所有可用模型"
    echo -e "  ${BLUE}openclaw dmxapi-balance${NC}       # 查询账户余额"
    echo -e "  ${BLUE}openclaw dmxapi-tokens list${NC}   # 查看 API Key 列表"
    echo -e "  ${BLUE}openclaw dmxapi-tokens create${NC} # 创建新的 API Key"
    echo -e "  ${BLUE}openclaw dmxapi-stat today${NC}    # 查看今日消耗"
    echo -e "  ${BLUE}openclaw dmxapi-logs week${NC}     # 查看本周日志"
    echo ""
    echo "帮助文档："
    echo "  openclaw dmxapi-help"
    echo ""
    echo "更多信息请查看："
    echo "  /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi/README_COMPLETE.md"
    echo ""
    
    # 显示余额
    print_info "当前账户余额："
    openclaw dmxapi-balance 2>/dev/null | grep -A10 "DMXAPI 余额" || true
    
    echo ""
    print_success "祝您使用愉快！"
    echo ""
}

# 运行主函数
main "$@"
