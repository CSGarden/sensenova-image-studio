# AI Media Studio

一个纯 HTML、CSS、JavaScript 的 AI 媒体工作台，不需要 Node、npm 或本地后端。页面把图片生成、图片编辑、视频生成和视觉对话分为四个独立工作区，可连接 new-api，也可为 Agnes 单独填写官方 URL 与 Key。

- 在线地址：<https://csgarden.github.io/sensenova-image-studio/>
- GitHub 仓库：<https://github.com/CSGarden/sensenova-image-studio>
- 界面采用 GitHub Primer 风格，并支持浅色、深色主题。
- 图片生成：`sensenova-u1-fast`、`agnes-image-2.0-flash`、`agnes-image-2.1-flash`。
- 图片编辑：`agnes-image-2.0-flash`、`agnes-image-2.1-flash`、`gpt-image-1`。
- 视频生成：`agnes-video-v2.0`，支持文生视频、公开图片 URL 图生视频和异步任务轮询。
- 视觉对话：`sensenova-6.7-flash-lite`，支持文本对话、图片 URL 与本地图片理解。
- 内置 Agnes 2.0 三种尺寸、Agnes 2.1 的 1K–4K 与 8 种比例、SenseNova 2K 尺寸及常见 OpenAI 图片尺寸。
- Agnes 支持独立填写官方 Base URL 与 API Key，也可以继续通过 new-api 转发。
- 提示词模板库包含广告、短视频、漫画、动作戏、口播 B-roll 和教学流程等分镜模板。

## 使用

1. 直接双击 `index.html`，用现代浏览器打开。
2. 在「new-api 地址」填写你的 API Base URL，例如 `https://api.example.com/v1`。
3. 输入 new-api 令牌，然后从顶部工作区选择图片生成、图片编辑、视频生成或视觉对话。
4. 使用 Agnes 模型时，推荐在「Agnes 连接」中选择「直连 Agnes」，填写 `https://apihub.agnes-ai.com/v1` 和 Agnes Key。

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

### Agnes Image 2.0 Flash

[官方接口文档](https://agnes-ai.com/zh-Hans/docs/agnes-image-20-flash)当前将生成价格标为 `$0 / 张`。

文生图仍调用 `POST /images/generations`，页面会按照 Agnes 文档发送：

```json
{
  "model": "agnes-image-2.0-flash",
  "prompt": "你的提示词",
  "size": "1024x1024",
  "return_base64": true
}
```

Agnes 当前支持 `1024x768`、`1024x1024`、`768x1024`，文档未声明通用 `n` 参数，因此页面在选择该模型时会限制为单次 1 张。Agnes 官方文档当前显示价格为 `$0 / 张`，但通过 new-api 调用时是否扣费仍取决于渠道倍率和计费配置。

页面默认让 Agnes 直连 `https://apihub.agnes-ai.com/v1`，因为部分 new-api 版本会在图片请求结构化转发时过滤 `return_base64` 和 `extra_body`。如果要通过 new-api，请在对应渠道开启“请求体透传（Pass-through body）”，再在页面的 Agnes 连接区域切换为“通过 new-api”。

### Agnes Image 2.1 Flash

[官方接口文档](https://agnes-ai.com/zh-Hans/docs/agnes-image-21-flash)使用同一个 `POST /images/generations` 接口，但输出规格改为分辨率等级与比例两个独立参数：

```json
{
  "model": "agnes-image-2.1-flash",
  "prompt": "你的提示词",
  "size": "2K",
  "ratio": "16:9",
  "return_base64": true
}
```

页面支持 `1K`、`2K`、`3K`、`4K`，以及 `1:1`、`3:4`、`4:3`、`16:9`、`9:16`、`2:3`、`3:2`、`21:9`。图片编辑工作区也会显示同一组 Agnes 2.1 输出设置。

## 视频生成

[Agnes Video V2.0 文档](https://agnes-ai.com/zh-Hans/docs/agnes-video-v20)采用异步任务：

1. 页面向 `POST /v1/videos` 创建任务。
2. 直连模式优先请求 `GET /agnesapi?video_id=...&model_name=agnes-video-v2.0` 查询状态。
3. 如果官方推荐查询地址不可用，页面会尝试兼容的 `GET /v1/videos/{TASK_ID}`。
4. 状态为 `completed` 后，从 `metadata.url` 显示、复制、打开或下载 MP4。

创建请求示例：

```json
{
  "model": "agnes-video-v2.0",
  "prompt": "主体动作、镜头运动、场景与光线",
  "width": 1152,
  "height": 768,
  "num_frames": 121,
  "frame_rate": 24,
  "negative_prompt": "画面闪烁、人物变形"
}
```

页面提供约 3、5、10、18 秒的合规帧数预设，也支持横向、竖向、方形画面。图生视频需要填写上游可以公开访问的图片 URL。视频接口不一定被所有 new-api 版本转发，因此默认推荐直连 Agnes。

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

选择 `agnes-image-2.0-flash` 时，页面会自动改用它自己的图生图协议，不调用 `/images/edits`：

```json
{
  "model": "agnes-image-2.0-flash",
  "prompt": "保留主体，只把背景改成海边日落",
  "size": "1024x1024",
  "extra_body": {
    "image": ["data:image/png;base64,..."],
    "response_format": "b64_json"
  }
}
```

SenseNova 6.7 Flash-Lite 不支持这个编辑接口，因此不能直接用它返回编辑后的图片。若 new-api 没有配置图片编辑模型，页面会提示接口或模型不支持。

## 添加其他模型

预置模型集中定义在 `app.js` 顶部的 `MODEL_CATALOG`：

```js
const MODEL_CATALOG = {
  generation: [],
  edit: [],
  video: [],
};
```

新增同协议模型时，只需向对应数组增加 `id`、`title`、`provider` 和 `badges`，界面会自动生成模型卡片，点击事件使用容器委托，不需要为每张卡重复绑定。若新模型采用不同接口、鉴权或参数结构，再增加对应的请求适配函数。

## 安全提示

- API Key 默认不会保存；只有勾选「仅在此设备记住」后才写入浏览器 `localStorage`。
- 这是浏览器直连方案，适合本人电脑上的本地使用。不要把带有固定密钥的页面部署到公开网站。
- SenseNova 官方图片临时链接通常只保留 1 小时，请及时下载。

## GitHub Pages

仓库使用 `.github/workflows/pages.yml` 自动部署。向 `main` 分支推送后，GitHub Actions 会发布最新静态页面。
