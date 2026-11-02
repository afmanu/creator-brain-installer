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
