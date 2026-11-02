# Creator profile schema

`profile-fields.json` is the machine-readable completion denominator. This document defines its semantics.

## Field record

Every field definition contains:

- `path`: unique dotted path inside the structured profile;
- `critical`: whether direct confirmation is required before completion;
- `description`: the exact information represented;
- `evidence`: preferred ways to resolve the field.

## Profile value envelope

Installed values are stored in `.creator-brain/profile.json` under a flat `fields` object keyed by the dotted catalog path. Each value uses this shape:

```json
{
  "value": null,
  "status": "missing",
  "source_ids": [],
  "last_verified": null
}
```

Example:

```json
{
  "fields": {
    "voice.tone": {
      "value": "direct and analytical",
      "status": "confirmed",
      "source_ids": ["source-004"],
      "last_verified": "2026-11-02"
    }
  }
}
```

Allowed working statuses:

- `missing`: no usable answer;
- `candidate`: extracted or inferred but not resolved;
- `conflicted`: credible sources disagree;
- `stale`: evidence may no longer describe the creator;
- `confirmed`: explicitly confirmed or directly supplied by the user;
- `accepted_default`: the user accepted a documented safe default;
- `not_applicable`: the user or an activation rule established that the field does not apply.

## Resolution rules

- Critical fields resolve only as `confirmed`, or `not_applicable` when a documented activation rule makes the field inapplicable.
- Non-critical fields resolve as `confirmed`, `accepted_default` or `not_applicable`.
- Extracted facts begin as `candidate` unless they are direct current user statements.
- Inference never becomes `confirmed` without user confirmation.
- A conflict remains open until the user selects, corrects or rejects the competing claims.

## Modules

Universal fields apply to every creator.

Conditional modules activate only when their condition is true:

- `commercial`: the creator connects content with an offer, product, service or commercial action;
- `multi_channel`: the creator wants differentiated behavior across more than one channel;
- `team_brand`: more than one person creates, approves or represents the brand.

An inactive conditional module contributes zero fields to the completion denominator.

## Source authority

When sources disagree, use this order as a starting policy:

```text
current direct user correction
→ current explicit user confirmation
→ current first-party documentation
→ current authored content
→ older first-party material
→ model inference
```

Authority does not remove the requirement to surface material critical conflicts.
