# Nova Canvas

一个纯静态的 SenseNova / new-api 图片生成前端，不需要 Node、npm 或本地后端。

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

## 安全提示

- API Key 默认不会保存；只有勾选「仅在此设备记住」后才写入浏览器 `localStorage`。
- 这是浏览器直连方案，适合本人电脑上的本地使用。不要把带有固定密钥的页面部署到公开网站。
- SenseNova 官方图片临时链接通常只保留 1 小时，请及时下载。
