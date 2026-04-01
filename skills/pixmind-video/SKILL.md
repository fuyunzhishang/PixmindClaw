---
name: pixmind-video
description: Generate AI videos via Pixmind API (text-to-video and image-to-video)
metadata: {"openclaw": {"requires": {"env": ["PIXMIND_API_KEY"]}, "primaryEnv": "PIXMIND_API_KEY"}}
---

# Pixmind Video Generation Skill

Generate AI videos using the Pixmind platform. Supports text-to-video and image-to-video generation.

## When to use

- User asks to generate or create a video
- User wants to animate an existing image into a video
- User requests video content from a text description

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

## Usage with exec tool

Use the helper script at `{baseDir}/../../scripts/video-generate.js`:

```bash
# Text to video
node {baseDir}/../../scripts/video-generate.js \
  --prompt "描述文字" \
  --duration 5 \
  --aspect-ratio 16:9 \
  --resolution 1080p

# Image to video
node {baseDir}/../../scripts/video-generate.js \
  --prompt "camera slowly zooms in" \
  --type img2video \
  --image https://example.com/photo.jpg
```

## Task Status Polling

After generation, poll for results:

```bash
node {baseDir}/../../scripts/task-status.js \
  --task-id <TASK_ID> \
  --poll
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
