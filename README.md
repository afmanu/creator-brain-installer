# Creator Brain Installer

Creator Brain Installer is a portable, LLM-guided installer that turns approved existing context, files, folders, documents and public sources into a verified creative profile.

The installed profile helps an AI understand who a creator is, what they stand for, who they create for, how they communicate and which quality and approval rules govern content creation.

## Status

Foundation phase. The product contract and finite profile schema are implemented and validated. The guided installer is not yet available, so this repository must not claim that a link-only installation works.

## Product boundaries

Creator Brain models creative identity and decision criteria. It is not:

- a content calendar;
- a publishing system;
- a task or project manager;
- a second brain;
- a transcript archive;
- an autonomous memory service;
- a replacement for Content OS.

## Design principles

- Extract from authorized existing context before asking questions.
- Remain independent from AI Context Installer, Content OS and every vendor runtime.
- Store a portable Markdown and JSON core.
- Treat runtime-specific files as adapters, never as the source of truth.
- Finish only when every applicable field is resolved and every completion gate passes.
- Never convert an inference into a confirmed fact.

## Planned installed output

```text
my-creator-brain/
├── START-HERE.md
├── CREATOR-CONTEXT.md
├── CREATOR-GUIDE.md
├── AGENTS.md
├── CLAUDE.md
├── GEMINI.md
├── .cursor/rules/creator-brain.mdc
├── modules/
│   ├── POSITIONING.md
│   ├── AUDIENCE.md
│   ├── OFFER.md
│   ├── VOICE.md
│   ├── CONTENT-STRATEGY.md
│   └── KNOWLEDGE-ASSETS.md
└── .creator-brain/
    ├── profile.json
    ├── sources.json
    ├── coverage.json
    ├── calibration.json
    ├── state.md
    └── installation-report.md
```

## Foundation validation

```text
npm test
npm run validate
```

## License

MIT. See `LICENSE`.
