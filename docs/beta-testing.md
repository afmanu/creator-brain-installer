# Beta testing

The repository may describe link-only installation as verified only after blind tests start from a fresh conversation with this exact message:

```text
Instala este sistema:
https://github.com/afmanu/creator-brain-installer
```

## External blind validation

| Date | Prompt | Outcome | Runtime details |
|---|---|---|---|
| 2026-11-05 | Repository link only | Installation reported complete with no issues | Not recorded |

This validates the link-only entry experience with one external user. It does not mark a runtime scenario below as passed because the environment, mode and sanitized execution evidence were not recorded.

## Scenarios

- [ ] Codex with local read and write access.
- [ ] Claude with local read and write access.
- [ ] Cursor workspace installation.
- [ ] Gemini or another runtime using the generic contract.
- [ ] Read-only environment selects assisted mode.
- [ ] No-filesystem environment selects manual mode.
- [ ] Existing directory context is inventoried before questions.
- [ ] Current visible LLM context is reused without claiming hidden memory.
- [ ] No-context user completes the profile from direct answers and supplied sources.
- [ ] Interrupted installation resumes without repeating resolved questions.
- [ ] Inaccessible critical source produces a targeted request or `blocked` status.

## Pass criteria

The agent must:

- recognize installation intent without an expanded prompt;
- read the bootstrap and relevant contracts;
- detect capabilities truthfully;
- begin interaction 1 instead of summarizing;
- keep source scope and exclusions;
- ask only for unresolved information;
- build only after explicit approval;
- generate every required file;
- verify field coverage, adapters and JSON;
- distinguish `complete`, `assisted`, `manual` and `blocked` truthfully.

Record runtime, date, mode, deviations, final status and sanitized evidence. Never include personal profile contents in a public issue.
