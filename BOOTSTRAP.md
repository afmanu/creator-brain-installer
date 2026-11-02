# Bootstrap

This is the canonical installation entrypoint.

## Installation intent

Treat a request to install, configure or create a Creator Brain, accompanied by this repository or its URL, as complete installation intent.

Do not ask the user to name internal files, schemas, runtimes or commands. Do not summarize the repository unless analysis was explicitly requested.

Installation intent authorizes read-only inspection of this repository and runtime capabilities. It does not authorize reading unrelated user files, opening external accounts, writing installation state or creating the final output.

## Required references

Read before acting:

1. `docs/product-contract.md`
2. `docs/non-goals.md`
3. `specs/setup-state-machine.md`
4. `specs/creator-brain-protocol.md`
5. `specs/profile-schema.md`
6. `specs/profile-fields.json`
7. `specs/context-discovery.md`
8. `specs/source-schema.md`
9. `specs/evidence-schema.md`
10. `specs/security-and-consent.md`
11. `specs/coverage-schema.md`
12. `specs/completion-schema.md`
13. `specs/output-contract.md`
14. The matching file in `runtimes/`, falling back to `runtimes/generic.md`.

## Automatic start

1. Detect whether repository, conversation context, attachments, local files, web links, commands and local writes are available.
2. Do not modify state during detection.
3. Select `full`, `assisted`, `manual` or `blocked` mode using `INSTALL.md`.
4. Explain the detected mode and only the limitations relevant to the user.
5. Start interaction 1 from `specs/creator-brain-protocol.md`. Do not ask whether the user is ready.

## Protocol execution

- Use the exact six-interaction order.
- Adapt questions to evidence already available.
- Include an example with every question.
- Maintain resumable state after the user approves the initial write.
- Map every answer and extracted claim to `specs/profile-fields.json`.
- Activate conditional modules only when their documented condition is true.
- Recalculate coverage after every interaction.
- Never advance past a failed exit gate.

## Context discovery

The first interaction asks for existing context in any accessible form, not for a specific prior product. Current LLM context, files, folders, vaults, repositories, documents, profiles and content systems are optional sources.

Inventory approved directories before reading selected files. Respect explicit exclusions and safe defaults. Never imply access to hidden memory or earlier conversations that are not visible.

## Build

After interaction 6 approval:

1. Create only the files in `specs/output-contract.md` inside the approved new or empty destination.
2. Compile `CREATOR-CONTEXT.md` and module Markdown from resolved fields only.
3. Copy `core/creator-guide.md` to `CREATOR-GUIDE.md` without changing its operating rules.
4. Generate runtime adapters from `templates/` so every adapter points to the same universal core.
5. Write structured profile, source, coverage and calibration records.
6. Do not copy source originals.
7. Read back every required file, parse every JSON file and verify every completion gate.
8. Write the installation report last.

## Handoff

Report:

- destination and installation mode;
- exact files created;
- activated modules and channels;
- coverage and calibration status;
- skipped, excluded or inaccessible sources;
- warnings and blocked checks;
- first prompt: `Lee mi Creator Brain y explícame brevemente cómo debes crear contenido conmigo.`

Never convert a partial, unverified or blocked installation into a success claim.
