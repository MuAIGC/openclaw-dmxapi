/**
 * DMXAPI 测试版插件 - 全功能创意工具
 * 集成：对话/生图/修图/融合/TTS/视频
 */

import { definePluginEntry } from 'openclaw/plugin-sdk/plugin-entry';

export default definePluginEntry({
    id: 'dmxapi-test',
    name: 'DMXAPI Test',
    description: 'DMXAPI 全功能创意插件测试版',
    
    configSchema: {
        type: 'object',
        properties: {
            apiKey: { type: 'string', sensitive: true, description: 'DMXAPI API Key' },
            systemToken: { type: 'string', sensitive: true, description: '系统令牌' },
            userId: { type: 'string', description: '用户 ID' }
        }
    },
    
    register(api) {
        console.log('[DMXAPI Test] 插件注册中...');
        
        const cfg = api.getConfig?.() || {};
        
        // ========== 💬 智能对话 ==========
        api.registerCommand({
            name: 'dmxapi-chat',
            description: 'DMXAPI 智能对话',
            async handler(args) {
                const prompt = args?._?.join(' ') || args?.prompt;
                if (!prompt) {
                    return { output: '❌ 请提供对话内容\n用法：dmxapi chat "你好"' };
                }
                
                const model = args?.model || 'gpt-5.2';
                const systemPrompt = args?.system || 'You are a helpful assistant.';
                
                try {
                    const response = await fetch('https://www.dmxapi.cn/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Authorization': cfg.apiKey,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            model,
                            messages: [
                                { role: 'system', content: systemPrompt },
                                { role: 'user', content: prompt }
                            ]
                        })
                    });
                    
                    if (!response.ok) {
                        return { output: `❌ 对话失败：${response.status}` };
                    }
                    
                    const data = await response.json();
                    const reply = data.choices?.[0]?.message?.content || '无回复';
                    
                    return { output: reply };
                } catch (err) {
                    return { output: `❌ 对话失败：${err.message}` };
                }
            }
        });
        
        // ========== 🎨 文生图 ==========
        api.registerCommand({
            name: 'dmxapi-draw',
            description: 'DMXAPI 文生图（Gemini 3.1 Flash Image）',
            async handler(args) {
                const prompt = args?._?.join(' ') || args?.prompt;
                if (!prompt) {
                    return { output: '❌ 请提供图片描述\n用法：dmxapi draw "一只可爱的猫咪"' };
                }
                
                const size = args?.size || '1K';
                const ratio = args?.ratio || '1:1';
                const outputDir = args?.output || 'output';
                
                try {
                    const response = await fetch('https://www.dmxapi.cn/v1beta/models/gemini-3.1-flash-image-preview:generateContent', {
                        method: 'POST',
                        headers: {
                            'x-goog-api-key': cfg.apiKey,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: {
                                responseModalities: ['IMAGE'],
                                imageConfig: {
                                    aspectRatio: ratio,
                                    imageSize: size
                                }
                            }
                        })
                    });
                    
                    if (!response.ok) {
                        return { output: `❌ 生图失败：${response.status}` };
                    }
                    
                    const data = await response.json();
                    const imageData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                    
                    if (!imageData) {
                        return { output: '❌ 未生成图片' };
                    }
                    
                    // 保存图片
                    const fs = await import('fs');
                    const path = await import('path');
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
                    const filename = `${outputDir}/draw_${timestamp}.png`;
                    
                    fs.mkdirSync(outputDir, { recursive: true });
                    fs.writeFileSync(filename, Buffer.from(imageData, 'base64'));
                    
                    return { output: `✅ 图片已保存：${filename}\n尺寸：${size}, 比例：${ratio}` };
                } catch (err) {
                    return { output: `❌ 生图失败：${err.message}` };
                }
            }
        });
        
        // ========== 🖌️ 图片编辑 ==========
        api.registerCommand({
            name: 'dmxapi-edit',
            description: 'DMXAPI 图片编辑',
            async handler(args) {
                const imagePath = args?._?.[0];
                const instruction = args?._?.[1] || args?.prompt;
                
                if (!imagePath || !instruction) {
                    return { output: '❌ 请提供图片路径和编辑指令\n用法：dmxapi edit photo.png "让图里的人拿着鲜花"' };
                }
                
                const fs = await import('fs');
                const path = await import('path');
                
                if (!fs.existsSync(imagePath)) {
                    return { output: `❌ 图片不存在：${imagePath}` };
                }
                
                try {
                    // 读取并编码图片
                    const imageBuffer = fs.readFileSync(imagePath);
                    const imageBase64 = imageBuffer.toString('base64');
                    const ext = path.extname(imagePath).toLowerCase();
                    const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
                    const mimeType = mimeTypes[ext] || 'image/jpeg';
                    
                    const response = await fetch('https://www.dmxapi.cn/v1beta/models/gemini-3.1-flash-image-preview:generateContent', {
                        method: 'POST',
                        headers: {
                            'x-goog-api-key': cfg.apiKey,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [
                                    { text: instruction },
                                    { inline_data: { mime_type: mimeType, data: imageBase64 } }
                                ]
                            }],
                            generationConfig: {
                                responseModalities: ['IMAGE'],
                                imageConfig: {
                                    aspectRatio: '1:1',
                                    imageSize: args?.size || '1K'
                                }
                            }
                        })
                    });
                    
                    if (!response.ok) {
                        return { output: `❌ 编辑失败：${response.status}` };
                    }
                    
                    const data = await response.json();
                    const imageData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                    
                    if (!imageData) {
                        return { output: '❌ 未生成图片' };
                    }
                    
                    // 保存图片
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
                    const filename = `output/edit_${timestamp}.png`;
                    
                    fs.mkdirSync('output', { recursive: true });
                    fs.writeFileSync(filename, Buffer.from(imageData, 'base64'));
                    
                    return { output: `✅ 编辑后的图片已保存：${filename}` };
                } catch (err) {
                    return { output: `❌ 编辑失败：${err.message}` };
                }
            }
        });
        
        // ========== 🖼️ 多图融合 ==========
        api.registerCommand({
            name: 'dmxapi-fuse',
            description: 'DMXAPI 多图融合（最多 10 张）',
            async handler(args) {
                const imagePaths = args?._?.slice(0, -1) || args?.images || [];
                const instruction = args?._?.[imagePaths.length] || args?.prompt;
                
                if (imagePaths.length < 2 || !instruction) {
                    return { output: '❌ 请提供至少 2 张图片和融合指令\n用法：dmxapi fuse image1.png image2.png "融合两张图片"' };
                }
                
                if (imagePaths.length > 10) {
                    return { output: '❌ 最多支持 10 张图片' };
                }
                
                const fs = await import('fs');
                const path = await import('path');
                
                // 编码所有图片
                const imageParts = [];
                for (const imgPath of imagePaths) {
                    if (!fs.existsSync(imgPath)) {
                        return { output: `❌ 图片不存在：${imgPath}` };
                    }
                    const imageBuffer = fs.readFileSync(imgPath);
                    const ext = path.extname(imgPath).toLowerCase();
                    const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
                    imageParts.push({
                        inline_data: {
                            mime_type: mimeTypes[ext] || 'image/jpeg',
                            data: imageBuffer.toString('base64')
                        }
                    });
                }
                
                try {
                    const response = await fetch('https://www.dmxapi.cn/v1beta/models/gemini-3.1-flash-image-preview:generateContent', {
                        method: 'POST',
                        headers: {
                            'x-goog-api-key': cfg.apiKey,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [
                                    { text: instruction },
                                    ...imageParts
                                ]
                            }],
                            generationConfig: {
                                responseModalities: ['IMAGE'],
                                imageConfig: {
                                    aspectRatio: args?.ratio || '1:1',
                                    imageSize: args?.size || '1K'
                                }
                            }
                        })
                    });
                    
                    if (!response.ok) {
                        return { output: `❌ 融合失败：${response.status}` };
                    }
                    
                    const data = await response.json();
                    const imageData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                    
                    if (!imageData) {
                        return { output: '❌ 未生成图片' };
                    }
                    
                    // 保存图片
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
                    const filename = `output/fuse_${timestamp}.png`;
                    
                    fs.mkdirSync('output', { recursive: true });
                    fs.writeFileSync(filename, Buffer.from(imageData, 'base64'));
                    
                    return { output: `✅ 融合后的图片已保存：${filename}\n融合图片数：${imagePaths.length}` };
                } catch (err) {
                    return { output: `❌ 融合失败：${err.message}` };
                }
            }
        });
        
        // ========== 👁️ 视觉识别 ==========
        api.registerCommand({
            name: 'dmxapi-vision',
            description: 'DMXAPI 视觉识别',
            async handler(args) {
                const imagePath = args?._?.[0];
                const question = args?._?.[1] || args?.prompt || '描述这张图片';
                
                if (!imagePath) {
                    return { output: '❌ 请提供图片路径\n用法：dmxapi vision photo.png "这是什么？"' };
                }
                
                const fs = await import('fs');
                const path = await import('path');
                
                if (!fs.existsSync(imagePath)) {
                    return { output: `❌ 图片不存在：${imagePath}` };
                }
                
                try {
                    const imageBuffer = fs.readFileSync(imagePath);
                    const ext = path.extname(imagePath).toLowerCase();
                    const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
                    
                    const response = await fetch('https://www.dmxapi.cn/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Authorization': cfg.apiKey,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            model: 'gemini-2.5-flash',
                            messages: [{
                                role: 'user',
                                content: [
                                    { type: 'text', text: question },
                                    { type: 'image_url', image_url: { url: `data:${mimeTypes[ext] || 'image/jpeg'};base64,${imageBuffer.toString('base64')}` } }
                                ]
                            }]
                        })
                    });
                    
                    if (!response.ok) {
                        return { output: `❌ 识别失败：${response.status}` };
                    }
                    
                    const data = await response.json();
                    const description = data.choices?.[0]?.message?.content || '无法识别';
                    
                    return { output: `👁️ 识别结果：\n${description}` };
                } catch (err) {
                    return { output: `❌ 识别失败：${err.message}` };
                }
            }
        });
        
        console.log('[DMXAPI Test] 插件注册完成');
        console.log('可用命令：');
        console.log('  dmxapi-chat   - 智能对话');
        console.log('  dmxapi-draw   - 文生图');
        console.log('  dmxapi-edit   - 图片编辑');
        console.log('  dmxapi-fuse   - 多图融合');
        console.log('  dmxapi-vision - 视觉识别');
    }
});
