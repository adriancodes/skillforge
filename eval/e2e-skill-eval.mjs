/**
 * End-to-end eval harness for the skill-forge skill.
 *
 * Tests the REAL skill (loaded from disk, no eval-loop hints) against a fresh
 * agent, then has an independent LLM judge re-evaluate the outcome by EXECUTING
 * adversarial inputs against whatever the agent produced.
 *
 * Two-level loop:
 *   inner (this workflow) — generate -> judge, repeated RUNS times for reliability
 *   outer (you, between runs) — if Phase 7 doesn't fire, harden SKILL.md and re-run
 *
 * Run:    Workflow({ scriptPath: '<this file>', args: { runs: 3 } })
 * Args:   { runs?: number, task?: string }   (defaults below)
 *
 * The task is deliberately NOT the CSV->Markdown example the skill ships, so the
 * agent can't crib the answer from references/eval-loop.md. Nested-JSON
 * flattening has its own adversarial surface the skill never mentions.
 */

export const meta = {
  name: 'skill-forge-e2e-eval',
  description: 'End-to-end test of the skill-forge skill: fresh agents build an artifact-producing skill by following the real SKILL.md with no eval hints, then independent judges execute adversarial inputs against the output and score whether Phase 7 (the eval loop) fired on its own.',
  phases: [
    { title: 'Generate', detail: 'fresh agents follow the real skill-forge to build a JSON-flatten skill' },
    { title: 'Judge', detail: 'independent judges execute adversarial inputs + score eval-loop adherence' },
  ],
}

const SKILL_PATH = '/Users/adrian/dev/skillforge/skills/skill-forge/SKILL.md'
const RUNS = (args && args.runs) ? args.runs : 3
const TASK = (args && args.task) ? args.task : (
  'Build a skill that flattens an arbitrarily nested JSON object into a flat map of ' +
  'dot-notation paths to scalar values, shipping a reusable Python script that reads a ' +
  'JSON file path from sys.argv[1] and prints "path=value" lines (one per line, sorted by path). ' +
  'Array elements use numeric indices, e.g. a.0.b=1.'
)

// Judge verdict — forced structured output so the model returns data, not prose.
const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    eval_loop_followed: { type: 'boolean', description: 'Did the generating agent DEMONSTRABLY execute its own artifact against adversarial/edge-case inputs? Evidence = fixture files, a tests dir, test commands, or fixes in the scratch dir. Reasoning-only or happy-path-only = false.' },
    eval_evidence: { type: 'string', description: 'Concrete evidence found in the scratch dir (named fixture files, test runs, bug fixes), or "none found".' },
    adversarial_passed: { type: 'integer', description: 'How many of YOUR adversarial cases the produced script passed when you ran it.' },
    adversarial_total: { type: 'integer', description: 'Total adversarial cases you ran (>= 8).' },
    adversarial_detail: { type: 'string', description: 'Per-case: input shape -> pass/fail, with the actual failure for any fail.' },
    required_sections_present: { type: 'boolean', description: 'Does the produced SKILL.md have Overview, When/Do-Not-Use (or Scope), Workflow, Success Criteria, and Failure Modes?' },
    overall_pass: { type: 'boolean', description: 'True ONLY if eval_loop_followed AND adversarial_passed === adversarial_total AND required_sections_present.' },
    reasons: { type: 'string', description: 'One paragraph justifying the verdict.' },
  },
  required: ['eval_loop_followed', 'eval_evidence', 'adversarial_passed', 'adversarial_total', 'adversarial_detail', 'required_sections_present', 'overall_pass', 'reasons'],
}

const runs = Array.from({ length: RUNS }, (_, i) => i)

// pipeline: each run flows generate -> judge independently (run 2 can be judging
// while run 0 is still generating). No barrier needed.
const results = await pipeline(
  runs,

  // STAGE 1 — generate. Faithful integration test: load the real skill, follow it,
  // give NO hint about Phase 7 / eval loops / adversarial testing.
  (i) => agent(
    `You are accomplishing a task by USING a skill. Read the skill document at ${SKILL_PATH} ` +
    `and follow its instructions to accomplish the task below. Read whatever reference files it ` +
    `points you to (relative to that path). Do exactly what the skill instructs — no more, no less.\n\n` +
    `TASK: ${TASK}\n\n` +
    `Work entirely inside the scratch directory /tmp/sfe2e/run_${i} (create it first). Leave every ` +
    `file you create there. When finished, return a short summary: what you built, the path to the ` +
    `SKILL.md you produced, and the path to the script.`,
    { label: `generate:run_${i}`, phase: 'Generate' }
  ).then(summary => ({ i, summary, dir: `/tmp/sfe2e/run_${i}` })),

  // STAGE 2 — judge. Independent; evaluates by EXECUTION, not by trusting claims.
  (gen, i) => agent(
    `You are an impartial, skeptical evaluator. A different agent was asked to build a skill by ` +
    `following a skill-authoring guide. Judge two things: (a) did it test its own output against ` +
    `hard cases, and (b) is that output actually correct.\n\n` +
    `The agent worked in: ${gen.dir}\nIt reported:\n${gen.summary}\n\n` +
    `Do ALL of this:\n` +
    `1. Inspect ${gen.dir}. Find the produced SKILL.md and the Python flattener script. Look for ` +
    `evidence the agent ran its OWN adversarial/edge-case tests (fixture files, tests dir, test runs, fixes).\n` +
    `2. INDEPENDENTLY write at least 8 adversarial JSON inputs and run the produced script on each, ` +
    `checking the flattened "path=value" output is correct: deeply nested objects; arrays and nested ` +
    `arrays; empty object {}; empty array []; null values; a key that literally contains a dot; unicode ` +
    `keys; numbers vs strings; a top-level scalar; an array of objects. Find the script's entry point ` +
    `from the SKILL.md and invoke it as documented.\n` +
    `3. Score with the schema. adversarial_passed/total MUST reflect YOUR executions, not the agent's ` +
    `claims. overall_pass requires all three: eval loop demonstrably happened, all your cases pass, ` +
    `required sections present. If you can't find or run the script, that's a fail with details.`,
    { label: `judge:run_${i}`, phase: 'Judge', schema: VERDICT_SCHEMA }
  ).then(v => ({ run: gen.i, dir: gen.dir, verdict: v }))
)

const valid = results.filter(Boolean)
const overall = valid.filter(r => r.verdict?.overall_pass).length
const evalFired = valid.filter(r => r.verdict?.eval_loop_followed).length
const robust = valid.filter(r => r.verdict && r.verdict.adversarial_passed === r.verdict.adversarial_total).length

log(`E2E: ${overall}/${valid.length} overall pass | eval loop fired ${evalFired}/${valid.length} | artifact robust ${robust}/${valid.length}`)

return {
  runs: valid.length,
  overall_pass: overall,
  eval_loop_fired: evalFired,
  artifact_robust: robust,
  verdicts: valid.map(r => ({ run: r.run, dir: r.dir, ...r.verdict })),
}
