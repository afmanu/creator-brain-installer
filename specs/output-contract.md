# Output contract

## Required tree

```text
destination/
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

`modules/OFFER.md` is still created when the commercial module is inactive, but states that commercial behavior is not active and contains no invented offer.

## Source of truth

`.creator-brain/profile.json` is the structured source of truth. It stores field envelopes under a flat `fields` object keyed by the paths in `profile-fields.json`.

`CREATOR-CONTEXT.md` is the concise default runtime projection. Module files provide selective depth. Runtime adapters contain navigation and safety rules only.

## Required Markdown sections

`CREATOR-CONTEXT.md`:

- identity and current focus;
- positioning and audience;
- voice summary;
- content strategy;
- creative contract;
- active modules;
- provenance notice.

Each module file includes its last verification date and only resolved applicable values.

## Structured files

- `profile.json`: profile metadata, activation decisions and every applicable field envelope;
- `sources.json`: policy, source records and field-level claims;
- `coverage.json`: denominator, resolved fields, conflicts, defaults and gates;
- `calibration.json`: scenarios, choices, output tests and results.

## Validation

Installation passes only when:

- every required path exists;
- JSON files parse;
- profile paths match the finite catalog;
- all applicable fields resolve under their criticality rules;
- no critical conflict remains;
- every adapter references `CREATOR-CONTEXT.md` and `CREATOR-GUIDE.md`;
- no source original or secret was copied;
- the installation report records successful readback.
