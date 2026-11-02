# Creator Brain Installer

If the user expresses installation intent, read `BOOTSTRAP.md` and follow it. A minimal request plus this repository or its URL is sufficient. Do not summarize the repository instead of installing it.

If the user asks to develop, review or modify this repository, treat it as repository work and do not start installation.

During installation:

- detect runtime capabilities truthfully;
- reuse authorized existing context before asking questions;
- follow the six-interaction protocol;
- keep every question tied to named fields or gates and include an example;
- never copy source originals or store secrets;
- build only after final approval;
- report `blocked` when a required capability or field cannot resolve.

During development:

- preserve `docs/product-contract.md` and `docs/non-goals.md`;
- treat `specs/profile-fields.json` as the finite completion denominator;
- update validation whenever contracts change;
- keep the runtime core vendor-neutral;
- do not add operational Content OS features;
- do not claim link-only reliability until blind tests pass.
