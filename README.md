# 🧪 DMXAPI 测试版 - 全功能创意插件

> 版本：v2.0.0-test  
> 功能：对话/生图/修图/融合/TTS/视频

---

## 🎯 功能列表

| 功能 | 模型 | 命令 | 状态 |
|------|------|------|------|
| 💬 智能对话 | GPT-5.2/Claude/Gemini | `dmxapi chat` | ✅ |
| 👁️ 视觉识别 | Gemini-2.5-Flash | `dmxapi vision` | ✅ |
| 🎨 文生图 | Gemini-3.1-Flash-Image | `dmxapi draw` | ✅ |
| 🖌️ 图片编辑 | Gemini-3.1-Flash-Image | `dmxapi edit` | ✅ |
| 🖼️ 多图融合 | Gemini-3.1-Flash-Image | `dmxapi fuse` | ✅ |
| 🎵 TTS 语音 | mimo-v2-tts | `dmxapi tts` | ✅ |
| 🎥 视频生成 | Sora2/Kling | `dmxapi video` | ✅ |

---

## 🚀 快速开始

### 1. 安装测试版

```bash
# 从 GitHub 安装测试版
bash <(curl -s https://raw.githubusercontent.com/MuAIGC/openclaw-dmxapi/test-v2/install-wizard.sh)
```

### 2. 配置

```bash
# 配置 DMXAPI 凭证
openclaw dmxapi-token <系统令牌> <用户 ID>
```

### 3. 使用

```bash
# 智能对话
dmxapi chat "你好，介绍一下你自己"

# 文生图
dmxapi draw "一只可爱的猫咪，夕阳下，4K 画质"

# 图片编辑
dmxapi edit input.png "让图里的人手里拿着鲜花"

# 多图融合
dmxapi fuse image1.png image2.png "将两张图片融合"

# 视觉识别
dmxapi vision image.png "描述这张图片"

# TTS 语音
dmxapi tts "你好，我是木木"

# 视频生成
dmxapi video "一只小猫在草地上奔跑"
```

---

## 📋 详细命令

### 💬 智能对话

```bash
dmxapi chat "问题内容" [选项]

选项:
  --model <模型>    使用的模型 (默认：gpt-5.2)
  --system <提示词>  系统提示词
  --stream          流式输出
```

**示例：**
```bash
# 简单对话
dmxapi chat "鲁迅和周树人是什么关系？"

# 指定模型
dmxapi chat "写一首诗" --model claude-sonnet-4

# 系统提示词
dmxapi chat "你好" --system "你是一个专业的翻译助手"
```

---

### 🎨 文生图

```bash
dmxapi draw "<提示词>" [选项]

选项:
  --model <模型>      使用的模型 (默认：gemini-3.1-flash-image-preview)
  --size <分辨率>     1K/2K/4K (默认：1K)
  --ratio <宽高比>    1:1/16:9/9:16 等 (默认：1:1)
  --output <路径>     输出路径 (默认：output/)
  --n <数量>          生成数量 (默认：1)
```

**支持的宽高比：**
- 1:1 (正方形)
- 16:9 (横版)
- 9:16 (竖版)
- 4:3, 3:2, 3:4, 4:5
- 1:4, 4:1, 1:8, 8:1 (极端比例)

**示例：**
```bash
# 简单生成
dmxapi draw "一只可爱的猫咪，夕阳下"

# 4K 画质，横版
dmxapi draw "赛博朋克城市夜景" --size 4K --ratio 16:9

# 生成 3 张
dmxapi draw "梦幻森林" --n 3
```

---

### 🖌️ 图片编辑

```bash
dmxapi edit <图片路径> "<编辑指令>" [选项]

选项:
  --model <模型>    使用的模型 (默认：gemini-3.1-flash-image-preview)
  --size <分辨率>   1K/2K/4K (默认：1K)
  --output <路径>   输出路径
```

**示例：**
```bash
# 简单编辑
dmxapi edit photo.png "让图里的人手里拿着鲜花"

# 4K 画质
dmxapi edit photo.png "换成夕阳背景" --size 4K
```

---

### 🖼️ 多图融合

```bash
dmxapi fuse <图片 1> <图片 2> [图片 3...] "<融合指令>" [选项]

选项:
  --model <模型>    使用的模型 (默认：gemini-3.1-flash-image-preview)
  --size <分辨率>   1K/2K/4K (默认：1K)
  --ratio <宽高比>  输出比例 (默认：1:1)
  --output <路径>   输出路径
```

**限制：**
- 最多 10 张对象图片
- 最多 4 张角色图片

**示例：**
```bash
# 融合两张图片
dmxapi fuse image1.png image2.png "将二维码换到第一张图中"

# 4K 融合
dmxapi fuse a.png b.png c.png "融合三张图片" --size 4K
```

---

### 👁️ 视觉识别

```bash
dmxapi vision <图片路径> [选项]

选项:
  --model <模型>    使用的模型 (默认：gemini-2.5-flash)
  --detail          详细描述模式
```

**示例：**
```bash
# 简单识别
dmxapi vision photo.png

# 详细描述
dmxapi vision photo.png --detail
```

---

### 🎵 TTS 语音

```bash
dmxapi tts "<文本>" [选项]

选项:
  --model <模型>     使用的模型 (默认：mimo-v2-tts)
  --voice <音色>     音色选择 (默认：nova)
  --output <路径>    输出路径
  --speed <倍速>     语速 (0.5-2.0, 默认：1.0)
```

**示例：**
```bash
# 简单 TTS
dmxapi tts "你好，我是木木"

# 指定音色
dmxapi tts "你好" --voice shimmer

# 调整语速
dmxapi tts "你好" --speed 1.2
```

---

### 🎥 视频生成

```bash
dmxapi video "<提示词>" [选项]

选项:
  --model <模型>    使用的模型 (默认：kling-v1.6)
  --duration <秒>   视频时长 (默认：5)
  --output <路径>   输出路径
```

**示例：**
```bash
# 简单生成
dmxapi video "一只小猫在草地上奔跑"

# 10 秒视频
dmxapi video "海浪拍打沙滩" --duration 10
```

---

## 🔧 配置说明

### 环境变量

```bash
# 设置 DMXAPI 凭证
export DMXAPI_API_KEY="sk-xxx"
export DMXAPI_SYSTEM_TOKEN="xxx"
export DMXAPI_USER_ID="5239"
```

### 配置文件

编辑 `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "dmxapi": {
        "enabled": true,
        "config": {
          "apiKey": "sk-xxx",
          "systemToken": "xxx",
          "userId": "5239"
        }
      }
    }
  }
}
```

---

## 📊 价格参考

| 功能 | 模型 | 价格 |
|------|------|------|
| 对话 | GPT-5.2 | 💚 免费 |
| 对话 | Claude-Sonnet-4 | 💚 免费 |
| 对话 | Gemini-2.5-Flash | 💚 免费 |
| 生图 | Gemini-3.1-Flash-Image (1K) | ¥0.5/张 |
| 生图 | Gemini-3.1-Flash-Image (4K) | ¥2.0/张 |
| 编辑 | Gemini-3.1-Flash-Image | ¥0.5/次 |
| 融合 | Gemini-3.1-Flash-Image | ¥0.5/次 |
| 识别 | Gemini-2.5-Flash | 💚 免费 |
| TTS | mimo-v2-tts | 💚 免费 |
| 视频 | Kling-V1.6 | ¥2.0/次 |

---

## ⚠️ 注意事项

1. **API Key 安全**
   - 不要将 API Key 提交到代码库
   - 使用环境变量或配置文件

2. **输出目录**
   - 默认输出到 `output/` 目录
   - 自动生成时间戳文件名

3. **并发限制**
   - 免费模型有 RPM 限制（通常 5 次/分钟）
   - 付费模型并发更高

4. **图片格式**
   - 支持：PNG, JPEG, GIF, WebP
   - 输出默认 PNG 格式

---

## 🆘 故障排查

### 问题 1: 提示"未配置 API Key"

```bash
# 检查配置
openclaw dmxapi-balance

# 重新配置
openclaw dmxapi-token <系统令牌> <用户 ID>
```

### 问题 2: 生图失败

```bash
# 检查余额
openclaw dmxapi-balance

# 检查模型可用性
openclaw dmxapi-models --gemini
```

### 问题 3: 图片保存失败

```bash
# 检查输出目录权限
ls -la output/

# 创建输出目录
mkdir -p output
```

---

## 📞 支持

- **GitHub:** https://github.com/MuAIGC/openclaw-dmxapi
- **DMXAPI 官网:** https://www.dmxapi.cn
- **DMXAPI 文档:** https://doc.dmxapi.cn

---

**🧪 测试版说明：** 此版本为测试版，功能可能不稳定，请勿用于生产环境。

_最后更新：2026-04-01_
