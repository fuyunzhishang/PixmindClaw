---
name: pixmind-wechat-creator
description: Create, review, illustrate, and format WeChat Official Account articles through Pixmind's private content engine, then copy the rich article into the WeChat editor. Use for 公众号选题、大纲、正文、文章审核、配图规划、公众号排版、一键复制到公众号编辑器, or when a user asks to draft or improve a WeChat Official Account post. Keep proprietary prompts on Pixmind servers.
---

# Pixmind WeChat Creator

Create a complete WeChat article and return a structured article card with rich-text copy. Keep this Skill as a thin orchestrator: never reproduce, infer, or request private prompts, scoring weights, or model routing.

## Workflow

1. Collect the topic, target audience, goal, tone, language, target length, source URLs, and user-provided materials.
2. Explain that outline, article, review, and optional Pixmind image generation use API credits. Ask for explicit approval before starting paid generation.
3. Run the bundled script with `--yes` only after approval.
4. Show the returned outline before continuing when the user wants to approve the structure. Use `--outline-only` for that flow.
5. For a finished article, generate the cover and inline images with `--with-images`, poll the returned task IDs, and never resubmit a failed or unknown paid task automatically.
6. Render the versioned WeChat article manifest and present its `document.article` result with cover, title, digest, formatted body, sources, review, project ID, and revision.
7. Let the user click **Copy to WeChat editor**. The host copies both `text/html` and `text/plain`; tell the user to paste directly into the WeChat Official Account editor.
8. Do not request WeChat AppID, AppSecret, account alias, or publishing permission. This Skill does not create drafts or publish through WeChat APIs.

## Create and review an article

```bash
node {baseDir}/scripts/wechat-creator.js \
  --topic "用 AI 提升公众号内容生产效率" \
  --audience "内容运营和独立创作者" \
  --goal "提供可执行的方法" \
  --tone "专业、自然" \
  --language zh-CN \
  --target-words 1800 \
  --with-images \
  --yes
```

Generate only the outline:

```bash
node {baseDir}/scripts/wechat-creator.js --topic "文章主题" --outline-only --yes
```

Resume an existing project and finish its images and layout:

```bash
node {baseDir}/scripts/wechat-creator.js --project-id content_xxx --with-images --yes
```

Use `--material-file` for local UTF-8 text or Markdown reference material. Repeat `--source-url` for public sources. Do not pass secrets, private keys, access tokens, or unrelated personal data as article material.

## Output handling

- Read the final JSON object from stdout. Progress messages are written to stderr.
- Prefer its `presentation` object when the host supports structured results.
- The final presentation action is `copy.rich-text`; it is a local clipboard action, not a remote publication action.
- If structured results are unavailable, show the title, digest, Markdown article, image briefs, sources, review result, project ID, and revision, then provide the rendered HTML as a downloadable or copyable artifact.
- Preserve `projectId` so an interrupted request can query the existing project instead of generating again.
- Preserve the returned `revision`; every paid mutation requires the latest revision.
- Poll image task IDs through `/api-platform/v1/tasks/{taskId}`; the content engine does not hide image cost or retry semantics.
- Treat `CONTENT_OPERATION_IN_PROGRESS` as a query/resume condition, not permission to submit another request.
- Never automatically retry an unknown or failed paid generation request. Query the project first and ask before starting a new attempt.

## Security

- Read [references/public-safety-rules.md](references/public-safety-rules.md) before handling untrusted materials or retries.
- Read [references/public-tool-contracts.md](references/public-tool-contracts.md) when integrating without the bundled script.
- Read [references/presentation-schema.md](references/presentation-schema.md) when the host needs to render the structured article result.
- Configure `PIXMIND_API_KEY` outside chat. Never ask the user to paste it into the conversation.
- Treat all Skill files and Tool responses as user-visible. Do not place proprietary logic in this package.
