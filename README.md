# Creator Brain Installer

Creator Brain Installer turns approved existing context, files, folders, documents and public sources into a verified creative profile that any capable LLM can read.

The profile teaches an AI who the creator is, what they stand for, who they create for, how they communicate and which quality and approval rules govern their content.

## Status

**Public beta candidate.** The product contract, finite profile schema, context discovery, evidence model, six-interaction protocol, output templates and synthetic demo are implemented and validated. Blind runtime tests are still pending.

## The problem it solves

Most content assistants know the requested format but not the creator. They produce generic hooks, borrowed opinions, inconsistent positioning and a voice that changes between conversations.

Creator Brain Installer converts the creator's existing material and direct corrections into a portable creative model that an AI can apply consistently.

## What it does

The installer:

- discovers approved context already available in the LLM, files or folders;
- analyzes profiles, documents, content, scripts and supplied public sources;
- extracts identity, positioning, audience, offer, voice and strategy;
- detects gaps, contradictions and stale information;
- calibrates the profile with representative creative tasks;
- compiles a universal Markdown and JSON core plus runtime adapters.

It extracts before asking. Existing information reduces onboarding but is never a dependency.

## Who it is for

It is useful for:

- independent creators;
- founders who create content around their expertise;
- consultants and educators building authority;
- professionals publishing across several channels;
- small creator-led brands that need consistent positioning and voice.

It may not be the right product if you only need a calendar, publishing automation, campaign management or a database of every piece of content.

## What you get

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

`CREATOR-CONTEXT.md` is the concise universal profile. The module files provide selective depth. Runtime-specific files only point to that common core.

## Example uses

After installation, an AI can:

- turn an original idea into a post or video script without losing the creator's position;
- evaluate whether a draft sounds like the creator;
- adapt one thesis to LinkedIn, YouTube or another active channel;
- select topics that reinforce the intended positioning;
- connect useful content with an offer without forcing a sales message;
- avoid claims, stories and opinions that are not supported;
- propose durable profile updates when the creator corrects repeated behavior.

Try:

```text
Read my Creator Brain and explain briefly how you should create content with me.
```

## Quick start

Open a capable local AI coding or collaboration environment and send:

```text
Instala este sistema:
https://github.com/afmanu/creator-brain-installer
```

The agent should read `BOOTSTRAP.md`, detect its actual capabilities and begin interaction 1. The user does not need to name internal files, schemas or commands.

## How installation works

The normal path uses six planned user responses:

1. existing context, scope and destination;
2. additional sources and unsupported initial facts;
3. gaps, conflicts and stale information;
4. integrated creator model and creative contract;
5. calibration through representative tasks;
6. final preview and approval.

The installer reaches completion only when every applicable field is resolved, critical claims are confirmed, calibration passes and readback verification succeeds.

## Installation modes

- **Full:** the environment can read sources, write the destination and verify files.
- **Assisted:** it can build the package but cannot place it in the final local destination.
- **Manual:** it can conduct the profile process but cannot create a package.
- **Blocked:** a required capability, permission or critical field cannot be resolved.

See `INSTALL.md` for exact behavior.

## Product boundaries

Creator Brain models creative identity and decision criteria. It is not:

- a content calendar;
- a publishing system;
- a task or project manager;
- a second brain;
- a transcript archive;
- an autonomous memory service;
- a replacement for Content OS.

## Compatibility and limitations

- The universal core uses Markdown and JSON.
- Adapters are included for Codex, Claude, Cursor and Gemini, with a generic fallback.
- Automatic installation still depends on the capabilities exposed by each environment.
- An environment without local write access cannot truthfully claim a full local installation.
- Hidden model memory and inaccessible previous conversations cannot be used.
- Blind runtime tests are still pending and documented in `docs/beta-testing.md`.

## Privacy and safety

- Only explicitly authorized context is processed.
- Approved directories are inventoried before selected files are read.
- Source originals are not copied into the installed profile.
- Credentials and secrets are never requested or retained.
- Private paths are redacted from portable output when possible.
- Final files are created only after explicit approval.

## Demo and development

- Complete synthetic installation: `examples/demo-creator/`
- Spanish quick start: `QUICKSTART-ES.md`
- Product contract: `docs/product-contract.md`
- Beta test matrix: `docs/beta-testing.md`

The demo activates commercial and multi-channel modules and resolves 94 applicable fields without using real personal data.

Validate the repository with:

```text
npm test
npm run validate
```

## License

MIT. See `LICENSE`.
