# Coverage schema

Coverage proves profile completeness; it does not estimate subjective quality with a vague score.

## Denominator

```text
applicable fields = universal fields + fields from activated conditional modules
```

Inactive modules contribute no fields. Their activation decision must still be recorded.

## Resolution

```text
coverage percent = resolved applicable fields / applicable fields × 100
```

Critical fields follow the stricter resolution rule in `profile-schema.md`.

## Required coverage record

```json
{
  "schema_version": "0.1.0",
  "applicable_fields": 0,
  "resolved_fields": 0,
  "coverage_percent": 0,
  "critical_fields": 0,
  "confirmed_critical_fields": 0,
  "activated_modules": [],
  "inactive_modules": [],
  "missing_fields": [],
  "open_conflicts": [],
  "stale_fields": [],
  "accepted_defaults": [],
  "not_applicable_fields": [],
  "status": "draft"
}
```

`coverage_percent` reaches 100 only when every applicable field resolves. A 100 percent value cannot override an open critical conflict or another completion gate.
