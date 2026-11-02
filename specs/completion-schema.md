# Completion schema

The installer may report `complete` only when all gates pass.

## Gates

1. `scope_confirmed`: creator purpose, source boundaries and exclusions are confirmed.
2. `context_discovery_complete`: every authorized context location was inventoried or recorded as inaccessible.
3. `source_consent_complete`: every processed source has explicit scope and retention rules.
4. `coverage_complete`: coverage is exactly 100 percent.
5. `critical_fields_confirmed`: every applicable critical field is confirmed.
6. `conflicts_closed`: no critical conflict or stale critical field remains.
7. `creator_model_confirmed`: identity, positioning, audience, voice and strategy were reviewed together.
8. `creative_contract_confirmed`: autonomy, approvals, uncertainty, privacy and quality rules are confirmed.
9. `calibration_complete`: required creator scenarios and output tests were completed.
10. `representative_tests_passed`: each activated use case has at least one passing representative test.
11. `final_preview_approved`: the user approved exact destination and output.
12. `readback_verified`: required files, JSON and adapter links passed post-write validation.

## Status

- `draft`: work is incomplete and can continue.
- `blocked`: a required field, permission, capability or approval cannot be resolved in the current flow.
- `complete`: every gate passes.

Interaction count never overrides these gates. If the planned onboarding ends with an unresolved critical requirement, the truthful outcome is `blocked`.
