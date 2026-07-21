# Image Generation Studio

一个兼容 OpenAI Images API 的纯静态图片生成前端，可通过 new-api 调用 SenseNova 或其他图片模型，不需要 Node、npm 或本地后端。

- 在线地址：<https://csgarden.github.io/sensenova-image-studio/>
- GitHub 仓库：<https://github.com/CSGarden/sensenova-image-studio>
- 界面采用 GitHub Primer 风格，并支持浅色、深色主题。
- 默认模型是 `sensenova-u1-fast`，模型名称可以自由修改。
- 内置 SenseNova 2K 尺寸及常见 OpenAI 图片尺寸。
- 提示词模板库包含广告、短视频、漫画、动作戏、口播 B-roll 和教学流程等分镜模板。
- 新增 `sensenova-6.7-flash-lite` 多模态对话模式，支持连续文本对话、图片 URL 和本地图片理解。
- 新增“图片编辑”模式，使用兼容 OpenAI `POST /images/edits` 的模型直接上传原图并返回编辑结果。

## 使用

1. 直接双击 `index.html`，用现代浏览器打开。
2. 在「new-api 地址」填写你的 API Base URL，例如 `https://api.example.com/v1`。
3. 输入 new-api 令牌、模型名和画面描述，点击「开始生成」。

页面会自动把 Base URL 拼成 `/images/generations`。如果你的代理路径不同，也可以直接填写完整地址，例如：

```text
https://api.example.com/v1/images/generations
```

## 请求格式

```json
{
  "model": "sensenova-u1-fast",
  "prompt": "你的提示词",
  "size": "2752x1536",
  "n": 1
}
```

请求头使用：

```text
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

页面兼容 `data[].url`、`data[].b64_json` 和常见的 `images[]` 返回结构。

## 多模态对话

多模态模式调用：

```text
POST {API_BASE_URL}/chat/completions
```

图片按照 OpenAI 兼容格式放入 `image_url` content 块：

```json
{
  "model": "sensenova-6.7-flash-lite",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "请描述这张图片" },
        {
          "type": "image_url",
          "image_url": { "url": "https://example.com/image.png" }
        }
      ]
    }
  ],
  "stream": false,
  "reasoning_effort": "medium"
}
```

支持 PNG、JPEG、GIF、WebP，单次消息最多添加 4 张图片。本地文件会转换成 data URL；如果 new-api 不接受 data URL，请改用可公开访问的图片 URL。

Flash-Lite 的官方能力是图片理解与分析，不会直接返回修改后的图片。页面提供“生成改图提示词”和“转到图片生成”两步工作流，用生成模型重新创作，但这不等同于像素级原图编辑。

## 图片编辑

图片编辑模式使用：

```text
POST {API_BASE_URL}/images/edits
Content-Type: multipart/form-data
```

表单字段为 `model`、`prompt`、`size`、`n` 和 `image`。默认编辑模型填写为 `gpt-image-1`，也可以改成你的 new-api 中实际支持 `/images/edits` 的模型。

SenseNova 6.7 Flash-Lite 不支持这个编辑接口，因此不能直接用它返回编辑后的图片。若 new-api 没有配置图片编辑模型，页面会提示接口或模型不支持。

## 安全提示

- API Key 默认不会保存；只有勾选「仅在此设备记住」后才写入浏览器 `localStorage`。
- 这是浏览器直连方案，适合本人电脑上的本地使用。不要把带有固定密钥的页面部署到公开网站。
- SenseNova 官方图片临时链接通常只保留 1 小时，请及时下载。

## GitHub Pages

仓库使用 `.github/workflows/pages.yml` 自动部署。向 `main` 分支推送后，GitHub Actions 会发布最新静态页面。
