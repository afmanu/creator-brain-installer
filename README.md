# Creator Brain Installer

Creator Brain Installer is a portable, LLM-guided installer that turns approved existing context, files, folders, documents and public sources into a verified creative profile.

The installed profile helps an AI understand who a creator is, what they stand for, who they create for, how they communicate and which quality and approval rules govern content creation.

## Status

Local beta candidate. The product contract, finite profile schema, context-discovery policy, evidence model, six-interaction protocol, output templates and runtime entrypoints are implemented and validated. Blind runtime tests are still pending, so link-only installation remains a beta claim that must be verified in each supported environment.

## Quick start

Open a capable local AI coding or collaboration environment and send:

```text
Instala este sistema:
https://github.com/afmanu/creator-brain-installer
```

The agent should read `BOOTSTRAP.md`, detect its capabilities and begin interaction 1. Environments without local write access must use the assisted or manual handoff described in `INSTALL.md`.

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

## Installed output

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

## Validation

```text
npm test
npm run validate
```

## License

MIT. See `LICENSE`.
