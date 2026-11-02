import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const requiredFiles = [
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "GEMINI.md",
  "BOOTSTRAP.md",
  "INSTALL.md",
  "QUICKSTART-ES.md",
  "LICENSE",
  "package.json",
  "docs/product-contract.md",
  "docs/non-goals.md",
  "docs/installation-experience.md",
  "docs/schema-review.md",
  "specs/profile-schema.md",
  "specs/profile-fields.json",
  "specs/coverage-schema.md",
  "specs/completion-schema.md",
  "specs/source-types.json",
  "specs/source-schema.md",
  "specs/evidence-schema.md",
  "specs/context-discovery.md",
  "specs/security-and-consent.md",
  "specs/creator-brain-protocol.md",
  "specs/setup-state-machine.md",
  "specs/output-contract.md",
  "runtimes/generic.md",
  "runtimes/codex.md",
  "runtimes/claude.md",
  "runtimes/cursor.md",
  "runtimes/gemini.md",
  "core/creator-guide.md",
  "templates/START-HERE.md",
  "templates/CREATOR-CONTEXT.md",
  "templates/AGENTS.md",
  "templates/CLAUDE.md",
  "templates/GEMINI.md",
  "templates/.cursor/rules/creator-brain.mdc",
  "templates/modules/POSITIONING.md",
  "templates/modules/AUDIENCE.md",
  "templates/modules/OFFER.md",
  "templates/modules/VOICE.md",
  "templates/modules/CONTENT-STRATEGY.md",
  "templates/modules/KNOWLEDGE-ASSETS.md",
  "templates/profile.json",
  "templates/sources.json",
  "templates/coverage.json",
  "templates/calibration.json",
  "templates/state.md",
  "templates/installation-report.md"
];

const requiredPrefixes = [
  "scope.",
  "identity.",
  "positioning.",
  "audience.",
  "voice.",
  "strategy.",
  "knowledge.",
  "creative_contract.",
  "quality."
];

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function validateFoundation(root = defaultRoot) {
  const errors = [];

  for (const relativePath of requiredFiles) {
    if (!(await exists(path.join(root, relativePath)))) {
      errors.push(`Missing required file: ${relativePath}`);
    }
  }

  let catalog;
  let sourceTypes;
  try {
    catalog = JSON.parse(await readFile(path.join(root, "specs/profile-fields.json"), "utf8"));
    sourceTypes = JSON.parse(await readFile(path.join(root, "specs/source-types.json"), "utf8"));
  } catch (error) {
    errors.push(`Invalid machine-readable schema: ${error.message}`);
    return { ok: false, errors };
  }

  if (catalog.schema_version !== "0.1.0") {
    errors.push("Unexpected profile schema version");
  }

  if (!Array.isArray(catalog.universal) || catalog.universal.length === 0) {
    errors.push("Universal field catalog must be non-empty");
  }

  const modules = catalog.modules ?? {};
  const expectedModules = ["commercial", "multi_channel", "team_brand"];
  for (const name of expectedModules) {
    if (!modules[name] || !Array.isArray(modules[name].fields) || !modules[name].activation_condition) {
      errors.push(`Invalid conditional module: ${name}`);
    }
  }

  const allFields = [
    ...(catalog.universal ?? []),
    ...Object.values(modules).flatMap((module) => module.fields ?? [])
  ];
  const seen = new Set();

  for (const field of allFields) {
    if (!field.path || typeof field.path !== "string") {
      errors.push("Every field requires a string path");
      continue;
    }
    if (seen.has(field.path)) {
      errors.push(`Duplicate field path: ${field.path}`);
    }
    seen.add(field.path);
    if (typeof field.critical !== "boolean") {
      errors.push(`Field critical flag must be boolean: ${field.path}`);
    }
    if (!field.description || field.description.length < 20) {
      errors.push(`Field description is incomplete: ${field.path}`);
    }
    if (!Array.isArray(field.evidence) || field.evidence.length === 0) {
      errors.push(`Field evidence routes are missing: ${field.path}`);
    }
  }

  for (const prefix of requiredPrefixes) {
    if (!(catalog.universal ?? []).some((field) => field.path.startsWith(prefix))) {
      errors.push(`Universal domain is missing: ${prefix}`);
    }
  }

  const forbiddenPrefixes = ["calendar.", "tasks.", "publishing_queue.", "campaigns."];
  for (const field of allFields) {
    if (forbiddenPrefixes.some((prefix) => field.path.startsWith(prefix))) {
      errors.push(`Operational Content OS field is forbidden: ${field.path}`);
    }
  }

  const productContract = await readFile(path.join(root, "docs/product-contract.md"), "utf8");
  const nonGoals = await readFile(path.join(root, "docs/non-goals.md"), "utf8");
  const experience = await readFile(path.join(root, "docs/installation-experience.md"), "utf8");
  const protocol = await readFile(path.join(root, "specs/creator-brain-protocol.md"), "utf8");
  const discovery = await readFile(path.join(root, "specs/context-discovery.md"), "utf8");
  const sourceSchema = await readFile(path.join(root, "specs/source-schema.md"), "utf8");
  const stateMachine = await readFile(path.join(root, "specs/setup-state-machine.md"), "utf8");
  const bootstrap = await readFile(path.join(root, "BOOTSTRAP.md"), "utf8");
  const outputContract = await readFile(path.join(root, "specs/output-contract.md"), "utf8");

  if (!productContract.includes("accelerators, not dependencies")) {
    errors.push("Product independence is not explicit");
  }
  if (!nonGoals.includes("schedule or publish content")) {
    errors.push("Operational publishing boundary is not explicit");
  }
  const interactionCount = experience.match(/^## Interaction [1-6] —/gm)?.length ?? 0;
  if (interactionCount !== 6) {
    errors.push(`Expected six interactions, found ${interactionCount}`);
  }

  const protocolInteractionCount = protocol.match(/^## Interaction [1-6] —/gm)?.length ?? 0;
  if (protocolInteractionCount !== 6) {
    errors.push(`Protocol must define six interactions, found ${protocolInteractionCount}`);
  }
  const protocolQuestions = protocol.split(/^### Question /gm).slice(1);
  if (protocolQuestions.length === 0 || protocolQuestions.some((section) => !section.includes("Example:"))) {
    errors.push("Every protocol question must include an example");
  }
  if (!discovery.includes("extract before asking") || !discovery.includes("current_llm_context")) {
    errors.push("Context discovery does not implement reusable LLM context");
  }
  if (!sourceSchema.includes('"retain_originals": false')) {
    errors.push("Source retention boundary is missing");
  }
  if (!bootstrap.includes("specs/creator-brain-protocol.md") || !bootstrap.includes("specs/output-contract.md")) {
    errors.push("Bootstrap does not route through protocol and output contracts");
  }
  if (!outputContract.includes("CREATOR-CONTEXT.md") || !outputContract.includes(".creator-brain/profile.json")) {
    errors.push("Output contract is incomplete");
  }
  const requiredStates = ["intent_detected", "context_discovered", "sources_processed", "calibration_complete", "verified", "complete"];
  for (const state of requiredStates) {
    if (!stateMachine.includes(state)) {
      errors.push(`State machine is missing: ${state}`);
    }
  }

  if (sourceTypes.schema_version !== "0.1.0" || !Array.isArray(sourceTypes.types)) {
    errors.push("Invalid source type catalog");
  } else {
    const ids = sourceTypes.types.map((source) => source.id);
    if (ids.length !== new Set(ids).size) {
      errors.push("Source type IDs must be unique");
    }
    for (const requiredType of ["current_llm_context", "local_directory", "existing_profile", "content_system", "direct_user_statement"]) {
      if (!ids.includes(requiredType)) {
        errors.push(`Source type is missing: ${requiredType}`);
      }
    }
  }

  for (const relativePath of ["templates/profile.json", "templates/sources.json", "templates/coverage.json", "templates/calibration.json"]) {
    try {
      JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
    } catch (error) {
      errors.push(`Invalid JSON template ${relativePath}: ${error.message}`);
    }
  }

  for (const relativePath of ["templates/AGENTS.md", "templates/CLAUDE.md", "templates/GEMINI.md", "templates/.cursor/rules/creator-brain.mdc"]) {
    const adapter = await readFile(path.join(root, relativePath), "utf8");
    if (!adapter.includes("CREATOR-CONTEXT.md") || !adapter.includes("CREATOR-GUIDE.md")) {
      errors.push(`Runtime adapter does not point to the universal core: ${relativePath}`);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    summary: {
      universalFields: catalog.universal.length,
      criticalUniversalFields: catalog.universal.filter((field) => field.critical).length,
      conditionalModules: Object.keys(modules).length,
      conditionalFields: Object.values(modules).reduce((total, module) => total + module.fields.length, 0),
      totalDefinedFields: allFields.length,
      sourceTypes: sourceTypes.types.length,
      protocolQuestions: protocolQuestions.length
    }
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await validateFoundation();
  if (!result.ok) {
    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
  } else {
    console.log("Creator Brain package validation passed.");
    console.log(JSON.stringify(result.summary, null, 2));
  }
}
