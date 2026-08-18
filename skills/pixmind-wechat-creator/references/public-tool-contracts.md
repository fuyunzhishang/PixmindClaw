# Public tool contracts

HTTP base URL: `https://aihub-admin.aimix.pro/api-platform/v1`.

MCP Streamable HTTP endpoint: `POST /mcp`.

Authenticate with `Authorization: Bearer <PIXMIND_API_KEY>`. Keep the key outside model context and chat.

## Content endpoints used by this Skill

- `POST /content/projects`: accept `clientRequestId` and `brief`; return a project at revision 1.
- `GET /content/projects/{projectId}`: return the owned project's public artifacts and status.
- `POST /content/projects/{projectId}/outline`: accept `expectedRevision` and `idempotencyKey`.
- `POST /content/projects/{projectId}/article`: require an existing outline.
- `POST /content/projects/{projectId}/review`: require an existing article.
- `POST /content/projects/{projectId}/images`: create paid cover and inline image tasks; poll each through `/tasks/{taskId}`.
- `POST /content/projects/{projectId}/render`: validate public image URLs and create the versioned article manifest.

Every successful mutation increments `revision`. Always query the project after an interrupted or unknown request before deciding whether another paid mutation is necessary.

## Public project fields

`projectId`, `revision`, `status`, `currentStep`, `brief`, `outline`, `article`, `review`, `images`, `manifest`, `error`, `createdAt`, and `updatedAt` are public.

## Optional publisher service

The backend retains account, draft, and publish endpoints for separately approved server integrations. This Skill does not call those endpoints. Its normal completion path is `content_render_wechat` followed by the local `copy.rich-text` action.

The service never returns internal prompts, prompt versions, model routing, scoring weights, provider errors, or chain-of-thought.

## Stable errors

- `CONTENT_AUTH_REQUIRED`
- `CONTENT_PROJECT_NOT_FOUND`
- `CONTENT_BRIEF_INVALID`
- `CONTENT_REVISION_INVALID`
- `CONTENT_REVISION_CONFLICT`
- `CONTENT_IDEMPOTENCY_KEY_INVALID`
- `CONTENT_IDEMPOTENCY_CONFLICT`
- `CONTENT_OPERATION_IN_PROGRESS`
- `CONTENT_OUTLINE_REQUIRED`
- `CONTENT_ARTICLE_REQUIRED`
- `CONTENT_OUTPUT_REJECTED`
- `CONTENT_GENERATION_FAILED`
- `CREDITS_INSUFFICIENT`
