# Pixmind Claw Skills

OpenClaw skills for AI image and video generation via [Pixmind](https://www.pixmind.io/) API.

## Prerequisites

1. Register at [pixmind.io](https://www.pixmind.io/)
2. Go to [pixmind.io/api-keys](https://www.pixmind.io/api-keys) and click **+ Create API Key**

![Create API Key](api-keys.png)

## Install

```bash
clawhub install pixmind-image
clawhub install pixmind-video
```

## Configure

Create a `.env` file in your project root:

```
PIXMIND_API_KEY=your_api_key_here
```

That's it. The skill will auto-load the key on use.

## Skills

### pixmind-image — AI Image Generation

Text-to-image and image-to-image generation.

| Parameter        | Default        | Description                         |
| ---------------- | -------------- | ----------------------------------- |
| `--prompt`       | required       | Image description                   |
| `--model`        | `seedream-4.0` | Model name                          |
| `--aspect-ratio` | `1:1`          | `1:1`, `16:9`, `9:16`, `4:3`, `3:4` |
| `--count`        | `1`            | Number of images (1-4)              |
| `--enhance`      | off            | AI-enhance the prompt               |
| `--type`         | `text2img`     | `text2img` or `img2img`             |
| `--image`        | —              | Reference image URL (for img2img)   |

**Available models:** `seedream-4.0`, `imagen-4-standard`, `imagen-4-ultra`, `imagen-4-fast`, `gemini-2.5-flash`, `gemini-3-pro-image`, `seedream-3.0-t2i`, `seededit-3.0-i2i`

```bash
# Text to image
node scripts/image-generate.js --prompt "a cute cat"

# High quality with specific model
node scripts/image-generate.js --prompt "oil painting of sunset" --model imagen-4-ultra --aspect-ratio 16:9 --count 2

# Image to image
node scripts/image-generate.js --prompt "make it snowy" --type img2img --image https://example.com/photo.jpg
```

### pixmind-video — AI Video Generation

Text-to-video and image-to-video generation.

| Parameter        | Default      | Description                         |
| ---------------- | ------------ | ----------------------------------- |
| `--prompt`       | required     | Video description                   |
| `--model`        | —            | Model name                          |
| `--duration`     | —            | Duration in seconds                 |
| `--aspect-ratio` | —            | `16:9`, `9:16`, `1:1`               |
| `--resolution`   | —            | `1080p`, `720p`                     |
| `--type`         | `text2video` | `text2video` or `img2video`         |
| `--image`        | —            | Reference image URL (for img2video) |

```bash
# Text to video
node scripts/video-generate.js --prompt "ocean waves crashing on rocks" --duration 5 --aspect-ratio 16:9

# Image to video
node scripts/video-generate.js --prompt "camera slowly zooms in" --type img2video --image https://example.com/photo.jpg
```

### Check Task Status

Both skills return a `taskId`. Poll until complete:

```bash
node scripts/task-status.js --task-id 19399 --poll
```

Output on completion:

- **Image:** `data.images` — array of image URLs
- **Video:** `data.videoUrl` — video URL, `data.coverUrl` — cover image URL

## License

MIT
