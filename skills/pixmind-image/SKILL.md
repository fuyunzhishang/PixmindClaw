---
name: pixmind-image
description: Generate or edit AI images via Pixmind API (text-to-image and image-to-image)
homepage: https://www.pixmind.io
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

1. Register at [pixmind.io](https://www.pixmind.io/)
2. Create an API key at [pixmind.io/api-keys](https://www.pixmind.io/api-keys)
3. Set env `PIXMIND_API_KEY` with your key

## API Details

**Endpoint**: `POST https://aihub-admin.aimix.pro/open-api/v1/image/generate`
**Auth**: Header `X-API-Key: {API_KEY}` (from env `PIXMIND_API_KEY`)

## Request Body (JSON)

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `prompt` | Yes | string | Image description / prompt |
| `model` | No | string | Model name (default: `seedream-4.0`) |
| `aspectRatio` | No | string | Aspect ratio: `1:1`, `16:9`, `9:16`, `4:3`, `3:4` (default: `1:1`) |
| `sampleCount` | No | number | Number of images 1-4 (default: 1) |
| `enhancePrompt` | No | boolean | AI-enhance the prompt (default: false) |
| `generateType` | No | string | `text2img` (default) or `img2img` |
| `image` | No | string | Reference image URL (required for `img2img`) |

### Available Models

**Seedream (ByteDance)**
- `seedream-4.5` — Latest flagship model. Unified architecture for generation and editing, cinematic aesthetics, realistic textures, native 4K support (4096x4096). LM Arena Top 10.
- `seedream-4.0` — High quality generation model, good balance of quality and speed. Default model.

**Google Imagen**
- `imagen-4-ultra` — Highest quality Imagen 4 variant, best for photorealistic outputs.
- `imagen-4-standard` — Standard quality Imagen 4, good balance.
- `imagen-4-fast` — Fastest Imagen 4 variant, optimized for speed.

**OpenAI**
- `gpt-image-2` — Latest GPT image model, strong instruction following and text rendering in images.
- `gpt-image-2-eco` — Cost-effective variant of GPT Image 2.
- `gpt-image-4o` — GPT-4o powered image generation.
- `gpt-image-1.5` — Earlier GPT image model.

**Midjourney**
- `mj-v7` — Latest Midjourney v7, top artistic quality and aesthetic.
- `mj-v6.1` — Midjourney v6.1, excellent for creative and artistic images.
- `mj-v6` — Midjourney v6, strong composition and lighting.
- `mj-niji6` — Midjourney Niji 6, specialized for anime and illustration styles.

**Alibaba / Qwen**
- `qwen-image-max` — Qwen VL image generation, highest quality variant.
- `qwen-image-plus` — Qwen VL image generation, balanced quality and speed.
- `qwen-image-edit-max` — Qwen image editing model, max quality for img2img tasks.
- `qwen-image-edit-plus` — Qwen image editing model, balanced variant.
- `wan2.6-image` — Wan 2.6 image generation, Alibaba's diffusion model.
- `wanx2.1-imageedit` — Wanx 2.1 image editing, specialized for image-to-image tasks.

**Flux (Black Forest Labs)**
- `flux-kontext-max` — Flux Kontext max quality, strong prompt adherence and visual fidelity.
- `flux-kontext-pro` — Flux Kontext pro, balanced quality and generation speed.

**Nano Banana**
- `nano-banana-2` — Latest Nano Banana 2, lightweight but capable.
- `nano-banana-2-eco` — Nano Banana 2 economy variant, lowest cost.
- `nano-banana-pro` — Nano Banana Pro, higher quality variant.
- `nano-banana-pro-lite` — Nano Banana Pro lite, lighter-weight pro version.
- `nano-banana` — Base Nano Banana model.

**Other**
- `pixmind-2.0` — Pixmind's proprietary image model.
- `z-image` — Alibaba Tongyi Lab's 6B-parameter efficient diffusion transformer (S3-DiT), open-source, photorealistic quality with low computational cost.

## Usage

Use `curl` or the included helper script:

```bash
# Text to image (via curl)
curl -X POST https://aihub-admin.aimix.pro/open-api/v1/image/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $PIXMIND_API_KEY" \
  -d '{"prompt": "描述文字", "model": "seedream-4.0", "aspectRatio": "16:9"}'

# Or use the helper script
node {baseDir}/image-generate.js --prompt "描述文字" --model seedream-4.0 --aspect-ratio 16:9
```

## Task Status Polling

After generation, poll for results:

```bash
# Via curl
curl https://aihub-admin.aimix.pro/open-api/v1/task/<TASK_ID> \
  -H "X-API-Key: $PIXMIND_API_KEY"

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

## Guidelines

1. Always confirm the prompt with the user before generating
2. Default to `seedream-4.0` model unless user specifies otherwise
3. Use `1:1` aspect ratio by default, suggest alternatives when appropriate
4. If user provides a reference image, use `img2img` mode automatically
5. After getting the task ID, poll until completion and return image URLs
6. Suggest prompt enhancement for vague or short prompts
