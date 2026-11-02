# Context discovery

Context discovery implements the rule: extract before asking.

## Capability detection

Before interaction 1, inspect without modifying state:

- whether the repository can be read;
- whether current conversation, project instructions and attachments are visible;
- whether local files and directories can be listed and read;
- whether user-supplied web links can be opened;
- whether local files can later be written and commands executed.

Never claim access to hidden model memory, previous conversations or private accounts that the runtime does not expose.

## Interaction 1 authorization

Ask the user for:

- existing accessible context locations;
- inclusion and exclusion scope;
- permission to use visible current LLM context;
- creator purpose and public/private boundaries;
- destination and permission for the resumable state file.

An approved directory root authorizes read-only inventory inside that root, subject to explicit exclusions and the safe defaults below. It does not authorize following links outside the root.

## Directory discovery

1. Resolve the exact approved root.
2. Inventory names, relative paths, types and sizes before reading content.
3. Apply explicit exclusions.
4. Apply safe default exclusions.
5. Select files likely to answer profile fields.
6. Read selected supported files only.
7. Record inaccessible and skipped candidates.
8. Extract claims and map them to `profile-fields.json`.
9. Compute remaining gaps before interaction 2.

## Safe default exclusions

Do not inspect by default:

- `.git`, `node_modules`, build outputs, caches and dependency directories;
- `.env` files, credentials, keys, cookies, tokens and authentication exports;
- finance, health, family, client-confidential or private-conversation folders unless the user explicitly includes a specific item for a defined purpose;
- binary files that cannot contribute to the profile;
- symbolic links or shortcuts that leave the approved root.

The user may broaden ordinary content scope, but the installer still never requests or stores secrets.

## Current LLM context

Use only information actually visible in the current session or project. Record it as `current_llm_context`. Do not imply that hidden memory was searched.

## Large sources

When a directory or profile is too large for reliable processing:

- prioritize current first-party summaries, approved examples and representative recent content;
- record the sampling rule;
- ask for a targeted export only if a critical field cannot otherwise resolve;
- never claim exhaustive analysis when sampling was used.

## Discovery result

Before interaction 2, the installer must know:

- sources inventoried, processed, inaccessible and excluded;
- fields with candidate evidence;
- fields already directly confirmed;
- critical conflicts and stale claims;
- the smallest additional source request needed.
