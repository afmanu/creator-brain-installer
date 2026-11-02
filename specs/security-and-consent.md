# Security and consent

## Permission boundaries

The minimal installation request authorizes only read-only inspection of the installer repository and runtime capabilities.

Separate explicit approval is required for:

- reading local files or directories outside already exposed attachments;
- opening supplied external sources when the runtime treats that as a separate action;
- creating resumable installation state;
- writing the final Creator Brain;
- replacing or merging with existing files;
- authenticating, connecting a service or installing software.

## Source boundaries

- Process only sources explicitly supplied or approved.
- Do not discover additional social profiles by identity search.
- Do not sign in to accounts during normal onboarding.
- Do not follow directory links outside approved roots.
- Do not treat project access as permission to read unrelated private material.
- Preserve user exclusions throughout retries and resumed sessions.

## Sensitive information

Never request, retain or reproduce:

- passwords, API keys, tokens, cookies or private keys;
- recovery codes or authentication exports;
- unnecessary private identifiers;
- client-confidential information without a specific, explicit and lawful scope.

If a secret appears, omit it from every artifact and advise the user to revoke or rotate it when appropriate.

## Retention

Default retention is source metadata plus approved claims. Do not copy source originals into the installed profile.

Short creator-owned excerpts may be retained only when the user approves them as voice or quality examples. Record that exception in the source manifest.

## Writes

- Use a new or empty destination in the initial version.
- Preview exact output before final approval.
- Never overwrite unrelated files.
- Write only approved files inside the approved destination.
- Verify by reading files back after creation.

## Truthfulness

Do not claim that a source was read, a runtime was detected, a file was written or a profile was verified unless the action actually succeeded.
