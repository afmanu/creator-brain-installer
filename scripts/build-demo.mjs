import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const destination = path.join(root, "examples", "demo-creator");
const internal = path.join(destination, ".creator-brain");

const catalog = JSON.parse(await readFile(path.join(root, "specs", "profile-fields.json"), "utf8"));
const activatedModules = ["commercial", "multi_channel"];
const applicable = [
  ...catalog.universal,
  ...activatedModules.flatMap((name) => catalog.modules[name].fields)
];

const values = {
  "scope.creator_type": "individual_creator",
  "scope.creator_purpose": ["Create rigorous AI education", "Turn first-party experience into recognizable content", "Connect useful content with a consulting offer"],
  "scope.target_channels": ["linkedin", "youtube"],
  "scope.content_languages": ["Spanish"],
  "scope.excluded_domains": ["family", "health", "personal finance", "private client information"],
  "scope.public_private_boundary": "Use only approved professional experience and public creator identity; private life stays outside the profile.",
  "identity.preferred_name": "Sofía",
  "identity.public_identity": "Sofía Vega, AI systems educator and consultant",
  "identity.professional_summary": "Sofía designs practical AI workflows for small professional teams and explains how to use them responsibly.",
  "identity.roles": ["consultant", "educator", "creator"],
  "identity.expertise_areas": ["AI workflow design", "LLM-assisted knowledge work", "human approval systems"],
  "identity.lived_experience": ["Implemented AI workflows with small consulting teams", "Trained non-technical professionals"],
  "identity.credentials_and_proof": ["Three documented client implementations", "Two years teaching applied AI workshops"],
  "identity.current_focus": "Reliable AI workflows that reduce repetitive work without removing human judgment.",
  "positioning.category": "Applied AI systems for small professional teams",
  "positioning.statement": "Sofía helps small professional teams turn scattered AI experiments into reliable workflows with clear human control.",
  "positioning.audience_promise": "Every piece should leave the audience with a clearer decision or a practical workflow they can adapt.",
  "positioning.unique_angle": "Combines implementation experience, plain-language teaching and explicit approval boundaries.",
  "positioning.authority_topics": ["workflow design", "LLM operating rules", "AI adoption for small teams"],
  "positioning.core_beliefs": ["Prompts are not systems", "Human approval should match risk", "Useful AI work must be verifiable"],
  "positioning.rejected_beliefs": ["Every task needs an autonomous agent", "More tools automatically create better systems"],
  "positioning.differentiation": "Focuses on small, inspectable workflows instead of automation theatre or generic productivity advice.",
  "positioning.desired_perception": ["rigorous", "practical", "clear", "honest about limitations"],
  "positioning.claim_boundaries": "Do not claim guaranteed productivity gains or universal results; qualify findings by context and evidence.",
  "audience.primary": "Founders and operations leads in small professional-service teams beginning to systematize AI use.",
  "audience.secondary": ["independent consultants", "innovation leads"],
  "audience.awareness_stage": "They use general AI tools but lack repeatable processes, evaluation and governance.",
  "audience.problems": ["Inconsistent outputs", "Repeated prompting", "No shared quality standard", "Unclear approval boundaries"],
  "audience.aspirations": ["Reliable workflows", "Faster delivery", "Team-wide consistency", "Controlled experimentation"],
  "audience.objections": ["AI systems sound too technical", "Documentation will slow the team", "The tools change too quickly"],
  "audience.language": ["workflow", "process", "quality check", "approval", "repeatable"],
  "audience.misconceptions": ["A longer prompt is a complete system", "Autonomy is always more advanced"],
  "audience.desired_transformation": "Move from individual AI experimentation to a shared, testable workflow.",
  "audience.trust_barriers": ["Overstated claims", "Hidden implementation complexity", "Examples without real constraints"],
  "voice.summary": "Direct, analytical and practical, with calm confidence and explicit limitations.",
  "voice.personality": ["curious", "rigorous", "constructive", "opinionated when evidence supports it"],
  "voice.tone": "Conversational and precise; critical of weak practices without attacking people.",
  "voice.register": "Professional plain Spanish with technical terms explained when they affect the decision.",
  "voice.rhythm": "Short opening, compact paragraphs and a deliberate progression from problem to mechanism to action.",
  "voice.vocabulary": { "preferred": ["sistema", "criterio", "evidencia", "verificación"], "avoid": ["revolucionario", "mágico", "sin esfuerzo"] },
  "voice.characteristic_patterns": ["Starts from an observed failure", "Names the missing system component", "Ends with an actionable test"],
  "voice.storytelling_style": "Uses brief professional situations to reveal a decision or system principle.",
  "voice.humor_and_emotion": "Light dry humor is acceptable; manufactured outrage and fear are not.",
  "voice.explanation_depth": "Assume familiarity with common AI tools but explain architecture, risk and evaluation concepts.",
  "voice.hook_preferences": ["Concrete observation", "Counterintuitive system lesson", "Specific failure pattern"],
  "voice.structure_preferences": ["Observation", "Why it happens", "System principle", "Practical next step"],
  "voice.prohibited_patterns": ["Fake certainty", "Invented personal stories", "Engagement bait", "Unsupported numerical claims"],
  "voice.approved_samples": ["A prompt gives you an answer. A system tells you what happens when the answer is wrong."],
  "voice.rejected_samples": ["This insane AI hack will 10x your business overnight."],
  "strategy.content_objectives": ["Build authority", "Teach practical systems", "Generate qualified consulting conversations"],
  "strategy.success_signals": ["Readers apply the workflow", "Qualified questions reference the idea", "The content is saved or shared for operational use"],
  "strategy.content_pillars": ["AI workflow architecture", "Human approval and quality", "Practical implementation lessons"],
  "strategy.supporting_topics": ["prompt design", "knowledge organization", "tool evaluation"],
  "strategy.core_narratives": ["From prompts to systems", "Autonomy must follow risk", "Verification is part of creation"],
  "strategy.content_mix": { "education": 50, "opinion": 20, "case": 20, "commercial": 10 },
  "strategy.preferred_formats": ["LinkedIn text post", "YouTube explainer", "Short talking-head video"],
  "strategy.channel_roles": { "linkedin": "Develop and test professional ideas", "youtube": "Teach complete systems with examples" },
  "strategy.originality_policy": "Use external material for evidence and contrast, but build the thesis from Sofía's experience and cite distinctive external ideas.",
  "strategy.research_and_evidence_policy": "Verify current technical claims with primary sources and distinguish fact, inference and opinion.",
  "strategy.publication_boundaries": ["No client-identifying details", "No unverified product claims", "No publication without separate approval"],
  "strategy.repurposing_rules": "Preserve the source thesis and evidence while rebuilding structure, depth and hook for each channel.",
  "knowledge.frameworks": ["Risk-matched approval ladder", "Prompt-to-workflow canvas", "Evidence-before-automation checklist"],
  "knowledge.stories": ["A workshop where a shared rubric fixed inconsistent AI drafts"],
  "knowledge.cases_and_results": ["A syntheticized consulting case reducing repeated review loops through a shared quality contract"],
  "knowledge.opinions": ["Most teams need a better workflow before they need another model", "A system without a failure path is a demo"],
  "knowledge.recurring_questions": ["Which tool should we choose?", "How much autonomy is safe?", "How do we keep outputs consistent?"],
  "knowledge.reusable_assets": ["Workflow canvas", "Approval ladder diagram", "Quality rubric"],
  "knowledge.trusted_sources": ["Official product documentation", "Primary research", "Direct implementation evidence"],
  "knowledge.evidence_limits": "Do not generalize from a single implementation or present synthetic examples as client results.",
  "creative_contract.initiative_level": "Recommend a strong angle and improve weak structure without waiting, while exposing material assumptions.",
  "creative_contract.clarification_policy": "Ask only when audience, claim or approval ambiguity would materially change the output; otherwise proceed with a declared reversible assumption.",
  "creative_contract.autonomy_and_approvals": { "allowed": ["outline", "draft", "variants", "quality review"], "requires_approval": ["profile change", "external access", "publication", "client claim"] },
  "creative_contract.uncertainty_handling": "Label uncertainty, separate evidence from inference and propose the smallest verification step.",
  "creative_contract.editing_policy": "Preserve the thesis and evidence; explain material reframing instead of silently changing the creator's position.",
  "creative_contract.feedback_policy": "Treat repeated feedback as a proposed profile diff, never as automatic memory.",
  "creative_contract.privacy_and_retention": "Retain source metadata and approved claims only; never retain private originals or normal conversation content.",
  "creative_contract.prohibited_actions": ["Invent experience", "Claim publication", "Use excluded private context", "Present inference as fact"],
  "creative_contract.quality_bar": "Every draft needs a clear audience problem, defensible thesis, creator advantage, evidence boundary and purposeful ending.",
  "quality.representative_tasks": ["Create a LinkedIn post from a workshop insight", "Adapt the thesis into a YouTube outline"],
  "quality.success_criteria": ["On-positioning", "On-voice", "Evidence-safe", "Channel-appropriate", "Actionable"],
  "quality.failure_modes": ["Generic AI advice", "Invented case", "Hype language", "Audience dilution", "Unapproved commercial claim"],
  "quality.calibration_choices": ["Recommend one angle", "Prefer declared assumptions for reversible choices", "Use conversational CTAs"],
  "quality.validation_results": { "linkedin_draft": "pass", "youtube_adaptation": "pass", "claim_boundary": "pass", "approval_boundary": "pass" },
  "offer.summary": ["AI workflow audit", "Applied AI systems sprint"],
  "offer.buyer_problem": "The team has scattered AI usage but no reliable shared workflow.",
  "offer.promised_transformation": "A documented and tested workflow with explicit inputs, quality checks and human approvals.",
  "offer.mechanism": "Audit current work, design the minimum workflow, test representative cases and train the team.",
  "offer.proof": ["Approved syntheticized cases", "Documented implementation artifacts"],
  "offer.content_relationship": "Teach the underlying system completely; mention the offer only when implementation support is a natural next step.",
  "offer.calls_to_action": ["Invite the reader to describe their current process", "Offer an audit conversation when context is commercial"],
  "offer.commercial_boundaries": ["No urgency manipulation", "No guaranteed ROI", "No sales CTA on personal or purely educational stories"],
  "channels.variations": { "linkedin": "Compact professional argument", "youtube": "Complete explanation with visual examples and implementation sequence" },
  "channels.consistency_rules": ["Same thesis", "Same evidence boundaries", "Same calm direct voice"],
  "channels.adaptation_rules": "Rebuild the expression for channel behavior; never shorten by deleting the mechanism or expand by adding unsupported claims."
};

for (const field of applicable) {
  if (!(field.path in values)) {
    throw new Error(`Missing synthetic value for ${field.path}`);
  }
}

function sourceIds(pathName) {
  if (pathName.startsWith("audience.")) return ["source-audience", "source-user"];
  if (pathName.startsWith("voice.") || pathName.startsWith("strategy.") || pathName.startsWith("knowledge.")) return ["source-content", "source-user"];
  if (pathName.startsWith("quality.") || pathName.startsWith("channels.")) return ["source-calibration", "source-user"];
  if (pathName.startsWith("creative_contract.") || pathName.startsWith("scope.")) return ["source-user"];
  return ["source-profile", "source-user"];
}

const fields = Object.fromEntries(applicable.map((field) => [field.path, {
  value: values[field.path],
  status: "confirmed",
  source_ids: sourceIds(field.path),
  last_verified: "2026-11-02"
}]));

const sources = [
  { id: "source-user", type: "direct_user_statement", label: "Synthetic onboarding answers", locator: "synthetic:user", scope: { included: ["creator onboarding"], excluded: [] }, permission: "approved", access: "conversation", access_status: "processed", authority: "user_confirmation", freshness: "current", retention: "approved_claim", processed_at: "2026-11-02T12:00:00Z", notes: "Synthetic fixture" },
  { id: "source-profile", type: "existing_profile", label: "Synthetic professional profile", locator: "synthetic:profile", scope: { included: ["identity", "positioning", "offer"], excluded: [] }, permission: "approved", access: "read_only", access_status: "processed", authority: "first_party_current", freshness: "current", retention: "metadata_and_approved_claims", processed_at: "2026-11-02T12:00:00Z", notes: "Original not retained" },
  { id: "source-content", type: "authored_content", label: "Synthetic approved content sample", locator: "synthetic:content", scope: { included: ["voice", "strategy", "knowledge"], excluded: [] }, permission: "approved", access: "read_only", access_status: "processed", authority: "first_party_current", freshness: "current", retention: "metadata_and_approved_claims", processed_at: "2026-11-02T12:00:00Z", notes: "Original not retained" },
  { id: "source-audience", type: "professional_document", label: "Synthetic audience brief", locator: "synthetic:audience", scope: { included: ["audience"], excluded: [] }, permission: "approved", access: "read_only", access_status: "processed", authority: "first_party_current", freshness: "current", retention: "metadata_and_approved_claims", processed_at: "2026-11-02T12:00:00Z", notes: "Original not retained" },
  { id: "source-calibration", type: "calibration_output", label: "Synthetic calibration session", locator: "synthetic:calibration", scope: { included: ["quality", "channels"], excluded: [] }, permission: "approved", access: "generated", access_status: "processed", authority: "user_confirmation", freshness: "current", retention: "approved_result_only", processed_at: "2026-11-02T12:00:00Z", notes: "Approved choices only" }
];

const claims = applicable.map((field, index) => ({
  id: `claim-${String(index + 1).padStart(3, "0")}`,
  field_path: field.path,
  value: values[field.path],
  source_ids: sourceIds(field.path),
  capture_method: field.path.startsWith("quality.") || field.path.startsWith("channels.") ? "calibrated" : "extracted",
  authority: "user_confirmation",
  confidence: "high",
  freshness: "current",
  status: "confirmed",
  conflicts_with: [],
  confirmed_at: "2026-11-02T12:00:00Z"
}));

const criticalCount = applicable.filter((field) => field.critical).length;
const gates = {
  scope_confirmed: true,
  context_discovery_complete: true,
  source_consent_complete: true,
  coverage_complete: true,
  critical_fields_confirmed: true,
  conflicts_closed: true,
  creator_model_confirmed: true,
  creative_contract_confirmed: true,
  calibration_complete: true,
  representative_tests_passed: true,
  final_preview_approved: true,
  readback_verified: true
};

await mkdir(path.join(destination, "modules"), { recursive: true });
await mkdir(path.join(destination, ".cursor", "rules"), { recursive: true });
await mkdir(internal, { recursive: true });

async function copy(relativeSource, relativeDestination = relativeSource) {
  const content = await readFile(path.join(root, relativeSource), "utf8");
  await writeFile(path.join(destination, relativeDestination), content, "utf8");
}

await copy("templates/START-HERE.md", "START-HERE.md");
await copy("templates/AGENTS.md", "AGENTS.md");
await copy("templates/CLAUDE.md", "CLAUDE.md");
await copy("templates/GEMINI.md", "GEMINI.md");
await copy("templates/.cursor/rules/creator-brain.mdc", ".cursor/rules/creator-brain.mdc");
await copy("core/creator-guide.md", "CREATOR-GUIDE.md");

const context = `# Creator context

Profile ID: demo-sofia-vega
Last verified: 2026-11-02
Status: complete

## Identity and current focus

Sofía Vega is an AI systems educator and consultant focused on reliable workflows for small professional teams.

## Positioning and audience

She helps founders and operations leads move from scattered AI experiments to shared, testable workflows with explicit human approval.

## Voice

Direct, analytical and practical. Use calm confidence, compact paragraphs and explicit limitations. Avoid hype, fake certainty and invented experience.

## Content strategy

Build authority through practical education, implementation lessons and evidence-safe opinion. LinkedIn develops compact professional arguments; YouTube teaches complete systems.

## Creative contract

Recommend a strong angle, expose material assumptions, verify current technical claims and require separate approval for external action or publication.

## Active modules

- commercial
- multi_channel

## Provenance

Compiled from the synthetic structured profile. Consult \`.creator-brain/sources.json\` for field-level provenance. Source metadata does not authorize reopening a source.
`;

const moduleFiles = {
  "POSITIONING.md": `# Positioning\n\nLast verified: 2026-11-02\n\nCategory: Applied AI systems for small professional teams.\n\nPromise: practical workflows with clear human control.\n\nDifferentiation: inspectable implementation over automation theatre.\n\n## Claim boundaries\n\nNo guaranteed productivity gains, universal outcomes or unsupported numerical claims.\n`,
  "AUDIENCE.md": `# Audience\n\nLast verified: 2026-11-02\n\nPrimary audience: founders and operations leads in small professional-service teams who use AI but lack shared, repeatable processes.\n\nThey want reliable workflows and fear hidden complexity, weak evidence and overstatement.\n`,
  "OFFER.md": `# Offer\n\nLast verified: 2026-11-02\nModule status: active\n\nOffers: AI workflow audit and applied AI systems sprint.\n\nContent teaches the full principle and mentions implementation support only when it is a natural next step.\n\n## Commercial boundaries\n\nNo urgency manipulation, guaranteed ROI or sales CTA on purely personal stories.\n`,
  "VOICE.md": `# Voice\n\nLast verified: 2026-11-02\n\nDirect, analytical and practical. Start from a concrete failure, explain the missing mechanism and end with an actionable test.\n\n## Approved examples\n\n“A prompt gives you an answer. A system tells you what happens when the answer is wrong.”\n\n## Prohibited patterns\n\nFake certainty, invented stories, engagement bait and unsupported claims.\n`,
  "CONTENT-STRATEGY.md": `# Content strategy\n\nLast verified: 2026-11-02\n\nPillars: AI workflow architecture, human approval and quality, and implementation lessons.\n\nCore narratives: from prompts to systems; autonomy follows risk; verification is part of creation.\n\n## Research and originality\n\nUse primary sources for current technical claims. Distinguish fact, inference and opinion. Attribute distinctive external ideas.\n`,
  "KNOWLEDGE-ASSETS.md": `# Knowledge and assets\n\nLast verified: 2026-11-02\n\nFrameworks: risk-matched approval ladder, prompt-to-workflow canvas and evidence-before-automation checklist.\n\nReusable assets: workflow canvas, approval ladder diagram and quality rubric.\n\n## Evidence limits\n\nDo not generalize from one implementation or present synthetic examples as client results.\n`
};

await writeFile(path.join(destination, "CREATOR-CONTEXT.md"), context, "utf8");
for (const [name, content] of Object.entries(moduleFiles)) {
  await writeFile(path.join(destination, "modules", name), content, "utf8");
}

await writeFile(path.join(internal, "profile.json"), JSON.stringify({
  meta: { schema_version: "0.1.0", profile_id: "demo-sofia-vega", created_at: "2026-11-02T12:00:00Z", last_verified: "2026-11-02", status: "complete" },
  modules: { commercial: "active", multi_channel: "active", team_brand: "inactive" },
  fields
}, null, 2) + "\n", "utf8");

await writeFile(path.join(internal, "sources.json"), JSON.stringify({
  schema_version: "0.1.0",
  policy: { scope: "explicitly_authorized_only", retain_originals: false, default_retention: "metadata_and_approved_claims" },
  sources,
  claims
}, null, 2) + "\n", "utf8");

await writeFile(path.join(internal, "coverage.json"), JSON.stringify({
  schema_version: "0.1.0",
  applicable_fields: applicable.length,
  resolved_fields: applicable.length,
  coverage_percent: 100,
  critical_fields: criticalCount,
  confirmed_critical_fields: criticalCount,
  activated_modules: activatedModules,
  inactive_modules: ["team_brand"],
  missing_fields: [],
  open_conflicts: [],
  stale_fields: [],
  accepted_defaults: [],
  not_applicable_fields: [],
  gates,
  status: "complete"
}, null, 2) + "\n", "utf8");

await writeFile(path.join(internal, "calibration.json"), JSON.stringify({
  schema_version: "0.1.0",
  scenarios: [
    { id: "uncertainty", result: "pass", choice: "Label the limitation and propose verification" },
    { id: "initiative", result: "pass", choice: "Recommend one angle with a declared assumption" }
  ],
  output_tests: [
    { id: "linkedin_draft", result: "pass" },
    { id: "claim_boundary", result: "pass" },
    { id: "approval_boundary", result: "pass" }
  ],
  channel_tests: [{ id: "linkedin_to_youtube", result: "pass" }],
  resolved_choices: values["quality.calibration_choices"],
  status: "complete"
}, null, 2) + "\n", "utf8");

await writeFile(path.join(internal, "state.md"), `# Creator Brain installation state

Installer version: 0.4.0-beta.0
Destination: synthetic/demo-creator
Runtime: generic-test-runtime
Mode: full
State: complete
Current interaction: 6
Last checkpoint: 2026-11-02T12:00:00Z

Coverage: 100%
Activated modules: commercial, multi_channel
Open critical conflicts: none
Next action: use the installed Creator Brain
`, "utf8");

await writeFile(path.join(internal, "installation-report.md"), `# Installation report

Installer version: 0.4.0-beta.0
Destination: synthetic/demo-creator
Runtime: generic-test-runtime
Mode: full
Completed: 2026-11-02T12:00:00Z
Status: complete

## Profile

Coverage: 100% (${applicable.length}/${applicable.length})
Activated modules: commercial, multi_channel
Calibration: complete

## Sources

Five synthetic sources processed. No source original retained.

## Readback verification

Required files, structured JSON, field coverage, adapter routes and completion gates passed.
`, "utf8");

await writeFile(path.join(destination, "README.md"), `# Synthetic Creator Brain demo

This fictional installation demonstrates existing-context reuse, complete field coverage, source provenance, calibration and portable runtime adapters.

It contains no real personal information or source originals.
`, "utf8");

console.log(`Built synthetic demo with ${applicable.length} applicable fields and ${criticalCount} critical fields.`);
