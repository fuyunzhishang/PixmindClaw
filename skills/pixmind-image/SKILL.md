---
name: pixmind-image
description: Generate or edit AI images via Pixmind API (text-to-image and image-to-image)
metadata: {"openclaw": {"requires": {"env": ["PIXMIND_API_KEY"]}, "primaryEnv": "PIXMIND_API_KEY"}}
---

# Pixmind Image Generation Skill

Generate AI images using [Pixmind](https://www.pixmind.io). Supports text-to-image and image-to-image generation with multiple models.

> **Note:** The API endpoint `aihub-admin.aimix.pro` is the official Pixmind API gateway. Result URLs on `chatmix.top` are Pixmind's CDN for generated content.

## When to use

- User asks to generate, create, or draw an image
- User wants to transform or edit an existing image
- User requests image variations or upscaling

## Prerequisites

1. Register at [pixmind.io](https://www.pixmind.io/) — Get 200 bonus points on signup for free trial
2. Create an API key in the [API Platform dashboard](https://www.pixmind.io/api-platform/dashboard/keys)
3. Set env `PIXMIND_API_KEY` with your key

## API Details

**Endpoint**: `POST https://aihub-admin.aimix.pro/api-platform/v1/generations`
**Auth**: Header `Authorization: Bearer {API_KEY}` (from env `PIXMIND_API_KEY`)

## Request Body (JSON)

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `type` | Yes | string | Fixed value: `image` |
| `prompt` | Yes | string | Image description / prompt (max 20000 chars) |
| `model` | No | string | Model ID (default: `seedream-4.0`) |
| `aspectRatio` | No | string | Aspect ratio, e.g. `1:1`, `16:9`, `9:16` (varies by model, default: `1:1`) |
| `sampleCount` | No | number | Number of images to generate (default: 1, max varies by model) |
| `speed` | No | string | Generation speed: `relax`, `fast`, `turbo` (varies by model) |
| `seed` | No | number | Seed for reproducible generation (1–2147483647, if model supports) |
| `negativePrompt` | No | string | What to avoid in the image (if model supports) |
| `stylization` | No | number | Style strength 0–1000 (default: 100, for MJ & some models) |
| `weirdness` | No | number | Weirdness/creativity 0–3000 (default: 0, for MJ & some models) |
| `variety` | No | number | Variation 0–100 (default: 0, for MJ & some models) |
| `resolution` | No | string | Resolution type: `1K`, `2K`, `3K`, `4K` (varies by model) |
| `quality` | No | string | Quality: `medium`, `high` (for GPT Image models) |
| `generateType` | No | string | `text2img` (default) or `img2img` |
| `image` | No | string | Reference image URL (required for `img2img`) |

### Available Models

Fetch the current model catalog from `GET /api-platform/v1/models`. The list below was verified against the API Platform generation service on 2026-08-10.

| Model ID | Name | Notes |
|----------|------|-------|
| `imagen-4-standard` | Imagen 4 Standard | Google Imagen 4 standard tier |
| `imagen-4-ultra` | Imagen 4 Ultra | Google Imagen 4 ultra tier, highest quality |
| `imagen-4-fast` | Imagen 4 Fast | Google Imagen 4 fast tier |
| `nano-banana-2` | Nano Banana 2 | Gemini-based, 1K/2K/4K, supports seed & negative prompt |
| `nano-banana-2-eco` | Nano Banana 2 Eco | 1K/2K/4K, ~80% cheaper |
| `nano-banana-pro` | Nano Banana Pro | Gemini 3 powered 4K, supports seed & negative prompt |
| `nano-banana-pro-lite` | Nano Banana Pro Lite | Lighter pro variant, ~70% off |
| `nano-banana` | Nano Banana | Base Gemini-powered generation |
| `seedream-4.5` | Seedream 4.5 | ByteDance flagship, cinematic aesthetics, 2K/4K |
| `seedream-4.0` | Seedream 4.0 | Proven high quality, default model, 1K/2K/4K |
| `gpt-image-2` | GPT Image 2 | OpenAI latest, photorealistic with strong prompt adherence |
| `gpt-image-2-eco` | GPT Image 2 Eco | Cheaper GPT Image 2 variant |
| `gpt-image-1.5` | GPT Image 1.5 | Earlier GPT Image, supports medium/high quality |
| `gpt-image-4o` | GPT Image 4o | OpenAI 4o, supports medium/high quality |
| `z-image` | Z-Image | Alibaba Tongyi Lab's 6B S3-DiT, photorealistic, low compute |
| `pixmind-2.0` | Pixmind 2.0 | Pixmind proprietary, supports relax/fast speed |
| `mj-v7` | Midjourney V7 | Latest MJ, top artistic quality, supports stylization/weirdness/variety |
| `mj-v6.1` | Midjourney V6.1 | Previous MJ generation |
| `mj-v6` | Midjourney V6 | Earlier MJ generation |
| `mj-niji6` | Midjourney Niji 6 | MJ anime-focused model |
| `wan2.6-image` | Wan 2.6 Image | Alibaba Wan 2.6 image generation |
| `wanx2.1-imageedit` | Wanx 2.1 Image Edit | Specialized for image editing (img2img only) |
| `qwen-image-max` | Qwen Image Max | Qwen VL image generation, text-to-image only |
| `qwen-image-plus` | Qwen Image Plus | Qwen VL image generation, text-to-image only |
| `qwen-image-edit-max` | Qwen Image Edit Max | Specialized for image editing (img2img only) |
| `qwen-image-edit-plus` | Qwen Image Edit Plus | Specialized for image editing (img2img only) |
| `flux-kontext-pro` | Flux Kontext Pro | Black Forest Labs, strong prompt adherence |
| `flux-kontext-max` | Flux Kontext Max | Higher quality Flux variant |

### Model Introductions

**Imagen (Google)** — Google's state-of-the-art photorealistic image models.
- `imagen-4-ultra` — Highest quality tier.
- `imagen-4-standard` — Balanced quality and speed.
- `imagen-4-fast` — Fastest generation tier.

**Seedream (ByteDance)** — Flagship series with cinematic aesthetics and realistic textures.
- `seedream-4.5` — Current flagship, LM Arena Top 10. 2K/4K output.
- `seedream-4.0` — Proven high quality, default model. 1K/2K/4K.

**Midjourney** — Industry-leading artistic and creative image generation.
- `mj-v7` — Latest version, top aesthetic quality. Supports speed control, stylization, weirdness, and variety.
- `mj-v6.1` / `mj-v6` — Previous generations, still capable.
- `mj-niji6` — Anime-styled Niji model.

**OpenAI GPT Image** — Strong instruction following, excellent text rendering.
- `gpt-image-2` / `gpt-image-2-eco` — Latest OpenAI model, photorealistic quality.
- `gpt-image-4o` — 4o generation, supports medium/high quality.
- `gpt-image-1.5` — Earlier generation.

**Nano Banana (Gemini-powered)** — Lightweight models with broad aspect ratio support.
- `nano-banana-2` / `nano-banana-2-eco` — Latest generation with 1K/2K/4K and seed support.
- `nano-banana-pro` / `nano-banana-pro-lite` — Pro variants with seed & negative prompt.
- `nano-banana` — Base Gemini-powered generation.

**Alibaba / Qwen / Wan**
- `qwen-image-max` / `qwen-image-plus` — Qwen VL image generation, text-to-image only.
- `qwen-image-edit-max` / `qwen-image-edit-plus` — Specialized image editing (img2img only).
- `wan2.6-image` — Wan 2.6 image generation.
- `wanx2.1-imageedit` — Specialized image editing (img2img only).
- `z-image` — Tongyi Lab's 6B S3-DiT, photorealistic at low compute.

**Flux (Black Forest Labs)** — Strong prompt adherence and visual fidelity.
- `flux-kontext-pro` — Balanced quality and speed.
- `flux-kontext-max` — Higher quality variant.

**Pixmind Native**
- `pixmind-2.0` — Pixmind proprietary, supports relax/fast speed modes.

## Usage

Use `curl` or the included helper script:

```bash
# Text to image (via curl)
curl -X POST https://aihub-admin.aimix.pro/api-platform/v1/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PIXMIND_API_KEY" \
  -d '{"type": "image", "prompt": "描述文字", "model": "nano-banana-2", "aspectRatio": "16:9"}'

# Or use the helper script
node {baseDir}/image-generate.js --prompt "描述文字" --model nano-banana-2 --aspect-ratio 16:9
```

## Task Status Polling

After generation, poll for results:

```bash
# Via curl
curl https://aihub-admin.aimix.pro/api-platform/v1/tasks/<TASK_ID> \
  -H "Authorization: Bearer $PIXMIND_API_KEY"

# Or use the helper script
node {baseDir}/task-status.js --task-id <TASK_ID> --poll
```

## Response Format

Generate response:
```json
{"code": 1000, "data": {"taskId": 19399, "status": "processing"}}
```

Task status response:
```json
{
  "code": 1000,
  "data": {
    "taskId": 19399,
    "status": "ready",
    "progress": 100,
    "images": ["https://chatmix.top/..."]
  }
}
```

- `data.taskId` — Use this to poll status
- Status values: `processing` → `ready` (success)
- On success: `data.images` contains generated image URLs

## Error Responses

- `code: 400` with `不支持的模型: <model>` — Unsupported model ID. The error message includes the full supported list; pick a valid model from it.
- `code: 1001` with `请输入提示词` — Empty prompt.

## Guidelines

1. Always confirm the prompt with the user before generating
2. Default to `nano-banana-2` (high quality) or `seedream-4.0` unless user specifies otherwise
3. Use `1:1` aspect ratio by default, suggest alternatives when appropriate
4. If user provides a reference image, use `img2img` mode automatically
5. After getting the task ID, poll until completion and return image URLs
6. For image editing tasks, prefer models that support `img2img`: `nano-banana-2`, `gpt-image-2`, `gpt-image-4o`, `mj-v7`, `pixmind-2.0`, `flux-kontext-pro`, `wanx2.1-imageedit`, `qwen-image-edit-max`, `qwen-image-edit-plus`
7. For Midjourney V7, you can also use `stylization`, `weirdness`, and `variety` parameters
8. Check the model's supported aspect ratios before sending the request — not all models support the same ratios
