# Setup state machine

## States

```text
intent_detected
→ capabilities_detected
→ interaction_1_context_scope
→ context_discovered
→ interaction_2_sources
→ sources_processed
→ interaction_3_gaps
→ factual_coverage_complete
→ interaction_4_creator_model
→ creator_model_confirmed
→ interaction_5_calibration
→ calibration_complete
→ interaction_6_preview
→ build_approved
→ files_created
→ verified
→ complete
```

Any state may move to `blocked` with a structured reason.

## State record

```text
Installer version:
Destination:
Runtime:
Mode:
State:
Current interaction:
Last checkpoint:

Capabilities:
Approved source roots:
Excluded source paths:
Sources inventoried:
Sources processed:
Activated modules:
Coverage:
Open critical conflicts:
Approvals:
Recovery notes:
Next action:
```

## Transition rules

- `capabilities_detected` requires truthful read, write, command and web capability results.
- `context_discovered` requires completion or explicit inaccessibility for every approved context location.
- `sources_processed` requires a source manifest and claim extraction pass.
- `factual_coverage_complete` requires 100 percent factual field resolution and no critical factual conflict.
- `creator_model_confirmed` requires integrated review and behavioral field confirmation.
- `calibration_complete` requires resolved calibration fields and passing representative tests.
- `build_approved` requires explicit approval of destination and exact output.
- `verified` requires post-write readback against the output contract.
- `complete` requires every gate in `completion-schema.md`.

## Resume

Read `.creator-brain/state.md`, confirm that the destination and approved source scope still match, and continue from the first incomplete gate. Do not repeat resolved questions or reprocess unchanged sources.

If state and files disagree, inspect and report the difference before writing.

## Idempotency

- Re-running discovery over unchanged sources must not create duplicate source or claim IDs.
- Reapplying an already confirmed answer must not reset its status.
- Final compilation from the same resolved profile must produce semantically equivalent output.
- A failed write must not be reported as a completed installation.
