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

- `seedream-4.0` — Default, high quality
- `imagen-4-standard` — Google Imagen 4 standard
- `imagen-4-ultra` — Google Imagen 4 ultra (highest quality)
- `imagen-4-fast` — Google Imagen 4 fast
- `gemini-2.5-flash` — Gemini flash model
- `gemini-3-pro-image` — Gemini Pro image model
- `seedream-3.0-t2i` — Seedream 3.0 text-to-image
- `seededit-3.0-i2i` — Seedream 3.0 image editing

## Usage

Use `curl` or the included helper script:

```bash
# Text to image (via curl)
curl -X POST https://aihub-admin.aimix.pro/open-api/v1/image/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $PIXMIND_API_KEY" \
  -d '{"prompt": "描述文字", "model": "seedream-4.0", "aspectRatio": "16:9"}'

# Or use the helper script
node {baseDir}/pixmind-api.js --prompt "描述文字" --model seedream-4.0 --aspect-ratio 16:9
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
