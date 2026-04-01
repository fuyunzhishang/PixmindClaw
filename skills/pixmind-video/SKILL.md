---
name: pixmind-video
description: Generate AI videos using Pixmind API
metadata: {
  "openclaw": {
    "requires": { "env": ["PIXMAND_API_KEY"] },
    "primaryEnv": "PIXMAND_API_KEY"
  }
}
---

# Pixmind Video Generation

Use this skill to generate videos using the Pixmind AI API.

## Authentication

- **AppKey**: `app_7867c26ab713fb03aec0774ed28f5802`
- **ApiKey**: Set via `PIXMAND_API_KEY` environment variable

## API Endpoint

> **TODO**: Please provide the video generation endpoint.

Expected format:
```
POST /open-api/v1/video/generate
```

## Request Parameters

> **TODO**: Please provide the complete video generation API parameters.

### Please specify:
1. Video generation endpoint
2. Input parameter name (text prompt or image reference)
3. Video duration
4. Resolution settings
5. Any other required/optional parameters

## Usage

When user asks to generate a video:
1. Get the user's prompt or reference image
2. Ask for any missing required parameters
3. Call the Pixmind API
4. Return the generated video URL to the user
