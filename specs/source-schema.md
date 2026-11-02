# Source manifest schema

The source manifest records what was authorized and processed without copying source originals into the installed Creator Brain.

## Manifest

```json
{
  "schema_version": "0.1.0",
  "policy": {
    "scope": "explicitly_authorized_only",
    "retain_originals": false,
    "default_retention": "metadata_and_approved_claims"
  },
  "sources": [],
  "claims": []
}
```

## Source record

```json
{
  "id": "source-001",
  "type": "local_directory",
  "label": "Creator documents",
  "locator": "redacted-or-portable-reference",
  "scope": {
    "included": ["Profile", "Scripts"],
    "excluded": ["Clients", "Finance"]
  },
  "permission": "approved",
  "access": "read_only",
  "access_status": "processed",
  "authority": "first_party_current",
  "freshness": "current",
  "retention": "metadata_and_approved_claims",
  "processed_at": "2026-11-02T00:00:00Z",
  "notes": null
}
```

`locator` must not expose an unnecessary private absolute path in portable output. Use a user-approved label, relative reference or redacted path when possible.

## Permission values

- `proposed`: discovered but not authorized;
- `approved`: explicitly authorized within recorded scope;
- `denied`: explicitly excluded;
- `revoked`: previously approved and later withdrawn.

## Access status

- `pending`;
- `inventoried`;
- `processed`;
- `inaccessible`;
- `skipped_sensitive`;
- `excluded`.

Inaccessible or excluded sources may be recorded, but cannot support profile claims.
