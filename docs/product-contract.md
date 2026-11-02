# Product contract

## Purpose

Creator Brain Installer builds a portable and verified creative profile from user-approved evidence and direct confirmation.

The profile must let a capable LLM:

- understand the creator's public identity and current focus;
- preserve positioning, audience fit and voice;
- use the creator's knowledge, evidence and approved stories;
- generate and evaluate content against explicit criteria;
- respect privacy, claim and approval boundaries;
- explain which profile evidence informed a content decision.

## Minimum installation request

The finished product must recognize this as complete installation intent:

```text
Instala este sistema:
https://github.com/afmanu/creator-brain-installer
```

The repository will contain every remaining instruction. The user must not need to name internal files, schemas, runtimes or commands.

## Independence

The product must work without AI Context Installer, Content OS, Obsidian, a database, a vector store or an MCP server.

Existing profiles, LLM context, folders, vaults, repositories and Content OS instances may be used as optional evidence sources. They are accelerators, not dependencies.

## Input contract

The installer may use only context that is both accessible in the current runtime and explicitly authorized by the user. Supported source classes will include:

- current conversation, project instructions and attached files;
- user-approved local files and directories;
- CVs, bios, brand guides, portfolios and professional documents;
- authored posts, scripts, newsletters, videos and transcripts;
- public profiles, websites and repositories supplied by the user;
- existing AI instructions or structured profiles;
- approved and rejected content examples.

The installer inventories authorized context before asking the user to repeat information.

## Output contract

Every installation produces:

- a concise universal `CREATOR-CONTEXT.md`;
- focused human-readable modules;
- a structured profile, source manifest, coverage report and calibration record;
- a creator guide and installation report;
- runtime adapters that point to the same universal core.

Runtime adapters contain no unique profile facts.

## Human control

The user must explicitly approve:

- source scope and exclusions;
- corrections to critical conflicts;
- the proposed creator model and collaboration contract;
- the final preview and destination;
- any later profile update.

Installation intent alone authorizes read-only capability detection and planning, not writes, authentication, external account access or publication.

## Completion

Installation is complete only when every gate in `specs/completion-schema.md` passes. If a critical field or permission remains unresolved, the status is `blocked`, never `complete`.

## Evolution

Updates are deliberate and diff-based:

```text
new evidence or correction
→ proposed field changes
→ user review
→ structured profile update
→ Markdown and adapter recompilation
→ validation
```

Conversation content is never stored automatically.
