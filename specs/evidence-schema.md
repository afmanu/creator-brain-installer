# Evidence schema

Evidence connects approved sources to profile fields. It prevents the compiled profile from hiding uncertainty or provenance.

## Claim record

```json
{
  "id": "claim-001",
  "field_path": "voice.tone",
  "value": "direct, analytical and practical",
  "source_ids": ["source-004", "source-007"],
  "capture_method": "extracted",
  "authority": "first_party_current",
  "confidence": "high",
  "freshness": "current",
  "status": "candidate",
  "conflicts_with": [],
  "confirmed_at": null
}
```

## Capture methods

- `direct`: supplied by the user;
- `extracted`: explicitly stated in an approved source;
- `pattern_observed`: derived from repeated source behavior;
- `inferred`: model interpretation requiring confirmation;
- `calibrated`: resolved through a user-evaluated test.

## Authority

- `user_correction`;
- `user_confirmation`;
- `first_party_current`;
- `first_party_historical`;
- `third_party`;
- `model_inference`.

Authority and confidence are different. Repetition across many old posts may produce high pattern confidence but still be stale relative to a current user correction.

## Claim rules

- Direct current user statements may enter the profile as `confirmed`.
- Extracted or observed claims enter as `candidate`.
- Inferred claims always require confirmation.
- Critical conflicts must list every competing claim.
- A claim from an inaccessible or unauthorized source is invalid.
- One source may support many fields and one field may have many claims.
- The compiled Markdown includes only resolved profile values, not raw candidate claims.
