---
name: pixmind-video
description: Generate AI videos via Pixmind API (text-to-video and image-to-video)
homepage: https://www.pixmind.io
metadata: {"openclaw": {"requires": {"env": ["PIXMIND_API_KEY"]}, "primaryEnv": "PIXMIND_API_KEY"}}
---

# Pixmind Video Generation Skill

Generate AI videos using [Pixmind](https://www.pixmind.io). Supports text-to-video and image-to-video generation.

> **Note:** The API endpoint `aihub-admin.aimix.pro` is the official Pixmind API gateway. Result URLs on `chatmix.top` are Pixmind's CDN for generated content.

## When to use

- User asks to generate or create a video
- User wants to animate an existing image into a video
- User requests video content from a text description

## Prerequisites

1. Register at [pixmind.io](https://www.pixmind.io/)
2. Create an API key at [pixmind.io/api-keys](https://www.pixmind.io/api-keys)
3. Set env `PIXMIND_API_KEY` with your key

## API Details

**Endpoint**: `POST https://aihub-admin.aimix.pro/open-api/v1/video/generate`
**Auth**: Header `X-API-Key: {API_KEY}` (from env `PIXMIND_API_KEY`)

## Request Body (JSON)

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `prompt` | Yes | string | Video description / prompt |
| `model` | No | string | Model name |
| `duration` | No | number | Video duration in seconds |
| `aspectRatio` | No | string | Aspect ratio: `16:9`, `9:16`, `1:1` |
| `resolution` | No | string | Resolution: `1080p`, `720p` |
| `generateType` | No | string | `text2video` (default) or `img2video` |
| `imageUrl` | No | string | Reference image URL (required for `img2video`) |

## Usage

Use `curl` or the included helper script:

```bash
# Text to video (via curl)
curl -X POST https://aihub-admin.aimix.pro/open-api/v1/video/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $PIXMIND_API_KEY" \
  -d '{"prompt": "ocean waves", "duration": 5, "aspectRatio": "16:9"}'

# Or use the helper script
node {baseDir}/video-generate.js --prompt "描述文字" --duration 5 --aspect-ratio 16:9
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
{"code": 1000, "data": {"taskId": 19401, "status": "processing"}}
```

Task status response:
```json
{
  "code": 1000,
  "data": {
    "taskId": 19401,
    "status": "ready",
    "progress": 100,
    "videoUrl": "https://chatmix.top/...",
    "coverUrl": "https://chatmix.top/..."
  }
}
```

- `data.taskId` — Use this to poll status
- Status values: `processing` → `ready` (success)
- On success: `data.videoUrl` contains the video URL, `data.coverUrl` has the cover image

## Guidelines

1. Always confirm the prompt and duration with the user before generating
2. Default to `text2video` mode unless user provides a reference image
3. Use `16:9` aspect ratio by default for video content
4. If user provides a reference image, automatically use `img2video` mode
5. Video generation takes longer than images — use `--poll` with appropriate interval
6. After getting the task ID, poll until completion and return video URL
