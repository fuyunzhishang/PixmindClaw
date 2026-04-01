---
name: pixmind-image
description: Generate AI images using Pixmind API
metadata: {
  "openclaw": {
    "requires": { "env": ["PIXMAND_API_KEY"] },
    "primaryEnv": "PIXMAND_API_KEY"
  }
}
---

# Pixmind Image Generation

Use this skill to generate images using the Pixmind AI API.

## Authentication

- **AppKey**: `app_7867c26ab713fb03aec0774ed28f5802`
- **ApiKey**: Set via `PIXMAND_API_KEY` environment variable

## API Endpoint

```
POST /open-api/v1/image/generate
```

## Request Parameters

> **TODO**: Please provide the complete API parameters from Swagger documentation.

Current known parameters:
- `appKey`: Application key
- `apiKey`: User API key (from environment)

### Please specify:
1. Image prompt parameter name (e.g., `prompt`, `text`, `description`)
2. Optional parameters:
   - Image size (width, height)
   - Number of images to generate
   - Style presets
   - Model selection
   - Any other parameters

## Usage

When user asks to generate an image:
1. Get the user's prompt/description
2. Ask for any missing required parameters
3. Call the Pixmind API
4. Return the generated image URL(s) to the user

## Response Handling

The API should return:
- Image URL(s)
- Generation status
- Any error messages
