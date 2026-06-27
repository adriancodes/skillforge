---
name: skill-forge
description: >
  Use when creating a new skill, improving an existing skill,
  reviewing skill quality, or the user asks to "create a skill",
  "write a skill", "build a skill", "improve this skill",
  "make a skill for X". Also use when skills produce inconsistent
  or low-quality results, when an agent fails to discover a skill,
  or when a discipline skill gets rationalized around.
---

# Skill Forge

## Overview

Create production-ready agent skills that are discoverable, context-efficient, and reliably followed. A skill's description determines whether it is ever loaded; its body determines what an agent does; its supporting files keep both lean.

## Core Principles

1. **Progressive Disclosure** — Metadata always, body on trigger, references on demand, scripts by execution.
2. **Trigger-Only Descriptions** — Descriptions define WHEN to activate, never HOW the skill works. Agents shortcut workflow summaries.
3. **Imperative Voice** — Verb-first instructions. Never second person ("you should").
4. **Explicit Boundaries** — Every skill states when NOT to use it, what tools to avoid, what failure looks like.
5. **One Job, Not a Profession** — Narrow scope. Broad skills produce generic results.

## Drive Behavior — The Five Levers

A skill only works if the agent obeys it. Apply all five levers to every skill; they are checked in Phase 6. Full guide with before/after rewrites: `references/behavioral-force.md`.

1. **Imperative force.** Command, never observe. "Always X." "Never Y." Verb-first — never "X is often helpful."
2. **Positive specification.** State the action. Pair every prohibition with its replacement: "Never X; do Y instead." Scope boundaries are the one allowed negation.
3. **Load-bearing example.** Show one concrete, complete example of the core behavior. It outweighs paragraphs of description.
4. **Concrete anchors.** Replace vague qualifiers with numbers — "3 sentences or fewer," not "concise."
5. **Position.** Put the binding rule in the first and last fifth of the body, and restate it at the end.

## Harness Adaptation

This skill, and every skill it builds, runs in any agent harness. Tool names below are Claude Code's; map each via `references/harness-tools.md`, and when a harness lacks a named tool use that file's fallback — never skip the step. Build generated skills the same way (Portability rules in `references/rules.md`).

## When to Use

- User asks to "create a skill", "write a skill", "build a skill for X", "make a skill"
- User asks to review or improve an existing skill
- Skills produce inconsistent results across invocations
- An agent fails to discover or invoke a relevant skill
- A discipline-enforcing skill (TDD, code review, verification) is being rationalized around
- Symptoms: "the skill didn't trigger", "the agent ignored the skill", "the skill is too long", "description is wrong"

## Do Not Use When

- The skill needs *quantitative* eval — statistical pass-rates and variance across many runs, or automated description-trigger optimization — use `skill-creator:skill-creator` (ships `eval-viewer/generate_review.py` and a description-optimization loop). Skill-forge runs its own *correctness* eval loop (Phase 7); it defers only the measurement/optimization layer, and the two compose
- The skill ships inside a Claude Code plugin manifest — use `plugin-dev:skill-development` (handles plugin packaging, `${CLAUDE_PLUGIN_ROOT}`, manifest fields). *Packaging is harness-specific; the skill content this skill produces stays harness-neutral.*
- The user wants a one-off slash command, not a triggered skill — write a slash command instead
- The output is a project document, not an agent instruction
- The user wants harness event hooks (Claude Code `settings.json`) — hooks execute outside the agent and are not skills

## Required Context

Gather before drafting — by interviewing the user when any of it is ambiguous (Phase 1), not by assuming:

- Target skill type (technique, discipline, reference, or workflow — defined in Phase 1)
- 3–5 realistic user phrasings that should trigger the skill
- 2–3 adjacent requests that should NOT trigger it
- Existing skills that may collide (search local plugins and built-ins first)
- Whether the skill enforces a discipline under pressure — that changes Phase 5

## Workflow

Follow phases in order. Do not skip phases.

### Phase 1: Clarify Intent, then Scope

**Clarify before scoping.** If the skill's purpose, triggers, boundaries, or definition of success are at all ambiguous, interview the user before drafting. Ask targeted questions until you can restate — and the user confirms — the trigger scenarios, the non-triggers, and the core behavior. Never draft from assumptions. When the user says "just make reasonable choices," proceed, but state every assumption explicitly. (If the harness has an intent-exploration skill — e.g. `superpowers:brainstorming` in Claude Code — use it.)

**Offer a multiple-choice UI for the questions.** Prefer the harness's multi-option question UI (Claude Code: AskUserQuestion — see `references/harness-tools.md`) so the user picks options instead of writing prose; otherwise ask as a numbered list. Give 2–4 concrete options per question, each with a one-line "why", and leave room for a custom answer. Use open-ended questions only when the choices are genuinely unbounded.

Then scope:

1. Identify 3–5 realistic user requests that should trigger this skill.
2. Identify 2–3 requests that should NOT trigger it.
3. Determine the skill type:
   - **Technique** — Concrete repeatable method (e.g., condition-based-waiting)
   - **Discipline** — Enforces rules under pressure (e.g., TDD, code review)
   - **Reference** — API docs, schemas, domain knowledge (e.g., BigQuery tables)
   - **Workflow** — Multi-phase process with decision points (e.g., feature development)
4. Search existing skills for collisions. If one exists, state in "Do Not Use When" when to defer to it.
5. For each example, walk through execution end-to-end. Note resources that would help on repeat invocations.

Conclude with: trigger scenarios, negative boundaries, skill type, planned resources, known collisions.

### Phase 2: Draft SKILL.md Body

Draft against the canonical template in `references/body-template.md`. Hit the word target for the skill type — the authoritative table lives in `references/rules.md` (Word Targets). Hard cap: 2,500 words for any skill; content beyond the target moves to `references/`.

Use imperative voice throughout. No second person in the body. Apply the five behavioral-force levers as you draft (`references/behavioral-force.md`) — they are checked in Phase 6.

### Phase 3: Extract to References (only after drafting)

After drafting, identify sections that exceed the target, dense reference material, or repeated code patterns. Extract these — not before. Most simple skills need no supporting files; single-file SKILL.md is the default.

| Resource | When to Extract | Context Cost |
|----------|----------------|--------------|
| `scripts/` | Same code repeated across invocations; deterministic reliability needed | Near-zero (executed, sometimes read first for inspection) |
| `references/` | Detailed docs, schemas, patterns > 500 words | On-demand only |
| `assets/` | Templates, images, boilerplate copied into output | Zero (copied, not read) |
| `examples/` | Complete, runnable demonstrations | On-demand only |

Reference every supporting file from the body. Unreferenced files are invisible to the agent.

### Phase 4: Write the Description

The description determines whether the skill loads at all. Two rules dominate:

1. **Triggers only, never workflow.** A description that summarizes the process causes agents to skip the body. See the empirical "one review vs two reviews" failure documented in `references/description-guide.md`.
2. **Quoted user phrases plus symptoms.** Include exact strings users say, plus error messages and symptom keywords for keyword search.

The full Description Rules (length cap, required elements) are owned by `references/rules.md`; `references/description-guide.md` explains why each matters.

Skeleton:

```yaml
description: >
  Use when [primary trigger], [secondary trigger],
  or the user asks to "<exact phrase 1>", "<exact phrase 2>".
  Also when [symptom keyword] or [error message string].
```

Verify discoverability before finalizing: imagine 3–5 phrasings a user might use. Read only the description. Would you recall this skill from each phrasing? Iterate until yes.

For automated trigger-rate evaluation across many phrasings, defer to `skill-creator:skill-creator`'s description-optimization loop.

### Phase 5: Bulletproof (Discipline Skills Only)

Skip for technique, reference, and simple workflow skills — overengineering weakens them.

Discipline skills require hardening because agents rationalize around constraints under pressure.

1. Spawn a subagent without the skill loaded (Claude Code: the Agent tool, `subagent_type=general-purpose`; otherwise the harness's subagent mechanism or a separate fresh session — see `references/harness-tools.md`) and give it the discipline's task. Record the rationalizations it uses to cut corners.
2. Build a rationalization table — every excuse gets a direct counter.
3. Create a red flags list — self-check thoughts signaling imminent violation.
4. Close loopholes explicitly — don't just state the rule, forbid specific workarounds.
5. Re-test with the skill loaded under *combined* pressure (time + sunk cost + authority).
6. Iterate until compliance is stable.

The required bulletproofing items are listed in `references/rules.md` (Bulletproofing Requirements); `references/bulletproofing-guide.md` covers the techniques and examples.

### Phase 6: Validate

Load `references/rules.md`, then run every item in `references/validation-checklist.md` — the checklist cites the registry for authoritative values. A single "no" means the skill is not ready.

### Phase 7: Eval and Iterate

Phase 6 validates the *document*; this phase proves the *output*. A skill can pass every structural gate and still ship a script that crashes on the first edge case — so **execute the artifact against adversarial cases; never reason about whether it works.** This is gate #8, Proven — the most-skipped step under time pressure. (Once, authoring skill-forge shipped a CSV→Markdown skill whose `is_number("")` returned `True`, right-aligning an all-blank column; re-reading never caught it, one execution did.)

Run the eval matching what the skill produces:

- **Ships a script or verifiable output** — write 8+ adversarial fixtures, execute the artifact on each, fix every mismatch in the *skill*, re-run all, loop until a clean pass plus two empty probe rounds. The fixture catalog and full loop live in `references/eval-loop.md`. This is the gap-closer.
- **Discipline skill** — already proven by the Phase 5 combined-pressure re-test; do not duplicate.
- **Reference skill** — a fresh agent performs 3 real lookups and applies each.
- **Pure technique/workflow, no artifact** — a fresh agent dry-runs the Phase-1 trigger scenarios with no gaps.

Then fold discoveries back: strengthen triggers, add missing boundaries, extract overflowing sections, document new failure modes. This loop owns *correctness*; defer quantitative pass-rate benchmarking and description-trigger optimization to `skill-creator:skill-creator` — the two compose.

## Tool Guidance

**Prefer:**
- The Skill tool (or platform equivalent) for invoking referenced skills by name
- Subagents for baseline-testing discipline skills without loading the skill under test
- The validation checklist as a literal gate before declaring done

**Avoid:**
- `@filename` force-loading from SKILL.md — consumes context regardless of need
- Cramming content into SKILL.md instead of `references/`, or duplicating a reference file inline — link instead
- Empty directories (only create directories with content)
- Flowcharts for reference material (use tables), code (use blocks), or linear steps (use numbered lists)

**Constraints:**
- No second person in the body
- No workflow summary in the description
- Every supporting file must be referenced from the body, or it doesn't exist

## Success Criteria

The skill is ready when ALL of these hold. These are the eight gates by name; the authoritative gate — with failure-frequency notes — is owned by `references/rules.md` (Quality Gate). Gates 1–7 are checked in Phase 6; gate 8 is proven in Phase 7.

1. **Discoverable** — An agent would find this skill given only the user's natural request
2. **Bounded** — "Do Not Use When" lists adjacent skills and forbidden contexts
3. **Actionable** — Workflow steps are imperative, specific, executable without guessing
4. **Verifiable** — Success criteria are measurable and unambiguous
5. **Lean** — SKILL.md body is within word target, depth lives in `references/`
6. **Self-consistent** — The skill follows the rules it teaches
7. **Positioned** — Collisions with existing skills are explicitly addressed
8. **Proven** — If the skill ships a script or produces verifiable output, that output has been executed against adversarial fixtures and all pass (not merely reasoned about)

If any answer is "no," iterate.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Description summarizes the workflow | Strip to triggers only; move process language to body |
| Missing "Do Not Use When" | Add it; single most common omission |
| Name is ambiguous or non-functional (collides with a common meaning, or doesn't say what it does) | Make it functional and unambiguous; verb-first is the safe default |
| Drafting from assumed intent | Clarify with the user first (Phase 1); restate scope and get confirmation before drafting |
| Supporting files exist but aren't referenced | Add to "Additional Resources" or delete them |
| Resources built before SKILL.md drafted | Draft body first, extract when sections overflow |
| Discipline skill without bulletproofing | Add rationalization table, red flags, loophole closings |
| Skill teaches a structure it doesn't follow | Rewrite the skill against its own template |
| Generated script validated only by reading it | Execute it against adversarial fixtures (Phase 7, gate #8); reasoning ships bugs that one run catches |

## Failure Modes

- **An existing skill already covers this:** Stop. Improve the existing skill or position the new one explicitly against it. Do not silently create overlapping skills.
- **Skill cannot be bounded:** If you cannot state when NOT to use it, the scope is too broad. Split into multiple skills.
- **Description optimization stalls:** Defer to `skill-creator:skill-creator`'s automated optimization loop.
- **Discipline rationalizations keep appearing:** The skill needs structural escalation paths, not louder MUSTs. See `references/bulletproofing-guide.md` Technique 6.
- **Body exceeds the word cap:** Stop adding to the body. Extract to `references/`. If references/ also exceeds a single topic, split the skill itself.
- **Agent loads multiple competing skills simultaneously:** The descriptions overlap. Tighten each description's triggers and add cross-references in "Do Not Use When".

## Additional Resources

- **`references/rules.md`** — The rule registry: single source of truth for every invariant. Change a rule here and nowhere else. Loaded in Phase 6.
- **`references/behavioral-force.md`** — The five levers that make an agent obey a skill, with before/after rewrites. Apply in Phase 2.
- **`references/harness-tools.md`** — Maps Claude Code tool names to other harnesses with fallbacks. Consult when the harness is not Claude Code.
- **`references/body-template.md`** — Canonical SKILL.md body template with skill-type adaptations. The starting point in Phase 2.
- **`references/description-guide.md`** — Description anti-patterns and the "one review vs two reviews" finding. Consult in Phase 4.
- **`references/bulletproofing-guide.md`** — Six techniques for hardening discipline skills. Consult in Phase 5.
- **`references/validation-checklist.md`** — Binary pre-flight checklist, the gate in Phase 6.
- **`references/eval-loop.md`** — The execute-don't-reason eval loop and adversarial-fixture catalog. Run in Phase 7 for gate #8 (Proven).
- **`examples/simple-skill-example.md`** — Complete single-file technique skill. A model for simple skills.
- **`examples/complex-skill-example.md`** — Complete workflow skill using references/, examples/, scripts/. A model for complex skills.

## Cross-Referencing Other Skills

Reference other skills by name with explicit requirement markers:

```markdown
**REQUIRED BACKGROUND:** Understand superpowers:test-driven-development before using this skill.
```

Never force-load with `@` syntax — it consumes context immediately regardless of need.

## Above All

A skill that is found but not obeyed is wasted — and one that is obeyed but ships broken output is worse. Before shipping any skill, drive behavior: **command, don't suggest; specify the action, don't just forbid; show one example; anchor with numbers; put what matters first and last.** Then confirm the skill follows every rule it teaches — self-consistency (gate #6) is the most commonly failed check. Finally, if the skill emits an artifact, **execute it against adversarial cases before declaring done** (gate #8) — reasoning about correctness ships bugs that a single run catches.
