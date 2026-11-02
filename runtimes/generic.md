# Generic runtime

Use this adapter when no more specific runtime applies.

## Detection

Check actual capabilities for repository reading, visible conversation context, attachments, local file access, web access, commands and writes.

## Behavior

- Read `BOOTSTRAP.md` and follow the canonical protocol.
- Use visible current context only; do not claim hidden memory.
- Prefer portable Markdown and JSON.
- If files cannot be written, use assisted or manual mode.
- Never invent tool results or installation success.

Automatic instruction-file discovery is optional. Explicitly reading `CREATOR-CONTEXT.md` and `CREATOR-GUIDE.md` is the universal fallback after installation.
