import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateFoundation } from "../scripts/validate-foundation.mjs";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

test("foundation satisfies its package contract", async () => {
  const result = await validateFoundation(root);
  assert.equal(result.ok, true, result.errors.join("\n"));
});

test("profile catalog is finite and has unique paths", async () => {
  const catalog = JSON.parse(await readFile(path.join(root, "specs/profile-fields.json"), "utf8"));
  const fields = [
    ...catalog.universal,
    ...Object.values(catalog.modules).flatMap((module) => module.fields)
  ];
  const paths = fields.map((field) => field.path);
  assert.ok(catalog.universal.length >= 60);
  assert.equal(paths.length, new Set(paths).size);
});

test("existing context is an optional source rather than a dependency", async () => {
  const contract = await readFile(path.join(root, "docs/product-contract.md"), "utf8");
  assert.match(contract, /folders, vaults, repositories and Content OS instances may be used as optional evidence sources/);
  assert.match(contract, /accelerators, not dependencies/);
});

test("onboarding contains six interactions and starts with context reuse", async () => {
  const experience = await readFile(path.join(root, "docs/installation-experience.md"), "utf8");
  const matches = experience.match(/^## Interaction [1-6] —/gm) ?? [];
  assert.equal(matches.length, 6);
  assert.match(experience, /Interaction 1 — Existing context and scope/);
});

test("schema excludes operational Content OS state", async () => {
  const catalog = JSON.parse(await readFile(path.join(root, "specs/profile-fields.json"), "utf8"));
  const paths = [
    ...catalog.universal,
    ...Object.values(catalog.modules).flatMap((module) => module.fields)
  ].map((field) => field.path);
  const forbiddenPrefixes = ["calendar.", "tasks.", "publishing_queue.", "campaigns."];
  assert.equal(paths.some((field) => forbiddenPrefixes.some((prefix) => field.startsWith(prefix))), false);
});

test("source catalog supports generic existing context", async () => {
  const catalog = JSON.parse(await readFile(path.join(root, "specs/source-types.json"), "utf8"));
  const ids = catalog.types.map((source) => source.id);
  assert.ok(ids.includes("current_llm_context"));
  assert.ok(ids.includes("local_directory"));
  assert.ok(ids.includes("vault"));
  assert.ok(ids.includes("repository"));
  assert.ok(ids.includes("existing_profile"));
  assert.equal(ids.length, new Set(ids).size);
});

test("protocol questions include examples and reuse context before asking", async () => {
  const protocol = await readFile(path.join(root, "specs/creator-brain-protocol.md"), "utf8");
  const questions = protocol.split(/^### Question /gm).slice(1);
  assert.ok(questions.length >= 10);
  assert.ok(questions.every((section) => section.includes("Example:")));
  assert.match(protocol, /avoid asking for information that approved context can answer/);
});

test("source originals and hidden LLM memory are outside the contract", async () => {
  const sourceSchema = await readFile(path.join(root, "specs/source-schema.md"), "utf8");
  const discovery = await readFile(path.join(root, "specs/context-discovery.md"), "utf8");
  assert.match(sourceSchema, /"retain_originals": false/);
  assert.match(discovery, /Never claim access to hidden model memory/);
});

test("bootstrap routes installation through protocol and output contracts", async () => {
  const bootstrap = await readFile(path.join(root, "BOOTSTRAP.md"), "utf8");
  assert.match(bootstrap, /specs\/creator-brain-protocol\.md/);
  assert.match(bootstrap, /specs\/output-contract\.md/);
  assert.match(bootstrap, /Do not summarize the repository/);
});

test("runtime adapters use one portable core", async () => {
  for (const relativePath of [
    "templates/AGENTS.md",
    "templates/CLAUDE.md",
    "templates/GEMINI.md",
    "templates/.cursor/rules/creator-brain.mdc"
  ]) {
    const content = await readFile(path.join(root, relativePath), "utf8");
    assert.match(content, /CREATOR-CONTEXT\.md/);
    assert.match(content, /CREATOR-GUIDE\.md/);
  }
});

test("structured templates are valid JSON and preserve source privacy", async () => {
  const profile = JSON.parse(await readFile(path.join(root, "templates/profile.json"), "utf8"));
  const sources = JSON.parse(await readFile(path.join(root, "templates/sources.json"), "utf8"));
  const coverage = JSON.parse(await readFile(path.join(root, "templates/coverage.json"), "utf8"));
  const calibration = JSON.parse(await readFile(path.join(root, "templates/calibration.json"), "utf8"));
  assert.deepEqual(profile.fields, {});
  assert.equal(sources.policy.retain_originals, false);
  assert.equal(coverage.status, "draft");
  assert.equal(calibration.status, "pending");
});

test("synthetic demo proves complete applicable field coverage", async () => {
  const profile = JSON.parse(await readFile(path.join(root, "examples/demo-creator/.creator-brain/profile.json"), "utf8"));
  const coverage = JSON.parse(await readFile(path.join(root, "examples/demo-creator/.creator-brain/coverage.json"), "utf8"));
  assert.equal(profile.meta.status, "complete");
  assert.equal(coverage.coverage_percent, 100);
  assert.equal(Object.keys(profile.fields).length, coverage.applicable_fields);
  assert.ok(Object.values(profile.fields).every((field) => field.status === "confirmed"));
});

test("synthetic demo retains provenance but not source originals", async () => {
  const sources = JSON.parse(await readFile(path.join(root, "examples/demo-creator/.creator-brain/sources.json"), "utf8"));
  assert.equal(sources.policy.retain_originals, false);
  assert.ok(sources.sources.every((source) => source.permission === "approved"));
  assert.ok(sources.claims.length > 80);
});

test("synthetic demo adapters route to the portable core", async () => {
  for (const relativePath of ["AGENTS.md", "CLAUDE.md", "GEMINI.md", ".cursor/rules/creator-brain.mdc"]) {
    const content = await readFile(path.join(root, "examples", "demo-creator", relativePath), "utf8");
    assert.match(content, /CREATOR-CONTEXT\.md/);
    assert.match(content, /CREATOR-GUIDE\.md/);
  }
});
