# Installation modes

## Full

Use when the runtime can read this repository, inspect approved sources, write an approved destination and read files back.

The agent conducts all six interactions, creates the complete output and verifies it locally.

## Assisted

Use when the runtime can analyze sources and generate artifacts but cannot place them in the user's final local destination.

The agent creates or presents the complete package in its available workspace, verifies what it can and gives an exact transfer instruction. It must distinguish package validation from final local placement.

## Manual

Use when the runtime can read instructions but cannot create a file package.

The agent conducts the profile process and presents clearly separated file contents for the user or another local agent. It must not claim installation or readback verification.

## Blocked

Use when the repository cannot be read, the user cannot provide the required source or destination access, or a critical completion gate cannot resolve.

Name the exact missing capability and the smallest handoff that would allow continuation, such as opening the repository in a local coding agent or attaching an export.

## Mode rules

- A runtime name does not prove a capability; detect actual tools.
- Do not downgrade truthfulness to preserve a smooth experience.
- Resuming in a more capable runtime uses the saved state and does not repeat confirmed questions.
- Authentication, dependency installation and service connections require separate explicit approval.
