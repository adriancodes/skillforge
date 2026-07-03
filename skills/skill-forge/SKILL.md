---
name: skill-forge
description: >
  Use when creating a new skill, improving an existing skill,
  reviewing skill quality, or the user asks to "create a skill",
  "write a skill", "improve this skill". Also use when skills
  produce inconsistent or low-quality results, when an agent
  fails to discover a skill, or when a discipline skill gets
  rationalized around.
---

# Skill Forge

## Overview

Create production-ready agent skills that are discoverable, context-efficient, and reliably followed. The root virtue is predictability: the agent takes the same *process* every run, not produces identical output. A skill's description determines whether it is ever loaded; its body determines what an agent does; its supporting files keep both lean.

## Core Principles

1. **Progressive Disclosure** — metadata always, body on trigger, references on demand, scripts by execution.
2. **Trigger-Only Descriptions** — descriptions say WHEN to activate, never HOW the skill works; agents shortcut workflow summaries.
3. **Every Sentence Earns Its Load** — delete any sentence the model already obeys by default (the no-op test, Phase 3).
4. **Explicit Boundaries** — every skill states when NOT to use it and what failure looks like.
5. **One Job, Not a Profession** — narrow scope; broad skills produce generic results.

## Drive Behavior — The Six Levers

A skill only works if the agent obeys it. Apply all six to every skill; Phase 6 checks them. Before/after rewrites: `references/behavioral-force.md`, loaded while drafting.

1. **Imperative force** — command, never observe. "Always X," never "X is often helpful."
2. **Positive specification** — pair every prohibition with its replacement: "Never X; do Y instead."
3. **Load-bearing example** — one complete example of the core behavior outweighs paragraphs.
4. **Concrete anchors** — numbers, not qualifiers: "3 sentences or fewer," not "concise."
5. **Position** — the binding rule sits in the first and last fifth of the body.
6. **Leading words** — a pretrained term (*adversarial*, *tight*, *red/green*) repeated as a token, never re-explained.

## Harness Adaptation

This skill, and every skill it builds, runs in any agent harness. Tool names are Claude Code's; map them via `references/harness-tools.md` and use its fallbacks — never skip a step because a tool is missing. Generated skills follow the Portability rules in `references/rules.md`.

## When to Use

- User asks to "create a skill", "write a skill", "improve this skill", or to review skill quality
- Skills produce inconsistent results, fail to be discovered, or get ignored
- A discipline skill (TDD, code review, verification) is being rationalized around
- Deciding whether a skill should be model-invoked or user-invoked
- Symptoms: "the skill didn't trigger", "the skill is too long", "description is wrong"

## Do Not Use When

- Quantitative eval — statistical pass-rates across many runs, or automated description-trigger optimization — use `skill-creator:skill-creator`; skill-forge owns the *correctness* loop (Phase 7)
- Claude Code plugin packaging — use `plugin-dev:skill-development`
- A one-off slash command, not a triggered skill — write a slash command instead
- A project document, not an agent instruction
- Harness event hooks — they execute outside the agent and are not skills

## Required Context

Gather before drafting — interview the user when ambiguous (Phase 1), never assume:

- Skill type (technique, discipline, reference, or workflow — defined in Phase 1)
- Invocation axis: model-invoked (agent discovers it) or user-invoked (human-only) — `references/rules.md`, Invocation
- 3–5 realistic phrasings that should trigger the skill (model-invoked only), and 2–3 adjacent requests that should NOT
- Existing skills that may collide (search local plugins and built-ins first)
- Whether the skill enforces a discipline under pressure — that changes Phase 5

## Workflow

Follow phases in order. Do not skip phases.

### Phase 1: Clarify Intent, then Scope

**Clarify before scoping.** When purpose, triggers, boundaries, or success are ambiguous, interview the user until the trigger scenarios, non-triggers, and core behavior can be restated and confirmed. Never draft from assumptions; on "just make reasonable choices," proceed but state every assumption explicitly. Prefer the harness's multi-option question UI (`references/harness-tools.md`), 2–4 concrete options with a one-line "why" each; otherwise a numbered list.

Then scope:

1. Choose the invocation axis (`references/rules.md` → Invocation). Model-invoked is the default; user-invoked (`disable-model-invocation: true`) fits skills that only fire by explicit request, and Phase 4 then collapses to one line.
2. Identify 3–5 realistic user requests that should trigger this skill, and 2–3 that should NOT.
3. Determine the skill type: **Technique** (concrete repeatable method) · **Discipline** (enforces rules under pressure) · **Reference** (docs, schemas, domain knowledge) · **Workflow** (multi-phase process with decision points)
4. Search existing skills for collisions. If one exists, state in "Do Not Use When" when to defer to it.
5. Walk each trigger example end-to-end; note resources that would help on repeat invocations.

Conclude with: invocation axis, trigger scenarios, negative boundaries, skill type, planned resources, known collisions.

### Phase 2: Draft SKILL.md Body

Draft against the canonical template in `references/body-template.md`, hitting the word target for the skill type — the authoritative table is `references/rules.md` (Word Targets); hard cap 2,500 words, content beyond the target moves to `references/`.

Write imperative voice throughout; no second person in the body. Apply the six levers while drafting. End every workflow step on a checkable, demanding completion criterion (`references/body-template.md` → Writing Workflow Steps).

### Phase 3: Prune, then Extract (only after drafting)

Two passes, in order:

1. **No-op pass.** Test every sentence: does it change agent behavior versus the model's default? Delete failing sentences whole — never trim words from them (examples in `references/rules.md`, Pruning).
2. **Extraction pass.** Move overflow beyond the word target, dense reference material, and repeated code into supporting directories (`references/body-template.md`, Supporting Directories). Single-file SKILL.md is the default; most simple skills need no supporting files.

Reference every supporting file from the body with a pointer that states *when* to load it. An unreferenced file is invisible; a weakly worded pointer is a variance bug (`references/body-template.md` → Writing Context Pointers).

### Phase 4: Write the Description

User-invoked skill? Set `disable-model-invocation: true`, write a one-line human-facing description, and skip the rest of this phase.

For model-invoked skills the description determines whether the skill loads at all. Two rules dominate:

1. **Triggers only, never workflow.** A process summary makes agents skip the body — see the empirical "one review vs two reviews" failure in `references/description-guide.md`, which also holds the skeleton template to copy.
2. **Quoted user phrases plus symptoms.** Include exact strings users say, plus error messages and symptom keywords. Cover each distinct request branch; cap synonym rewrites of one branch at the 2 strongest (`references/rules.md` → Description Rules).

Verify discoverability before finalizing: imagine 3–5 user phrasings, read only the description, and confirm each would recall this skill; iterate until yes. Defer automated trigger-rate evaluation to `skill-creator:skill-creator`.

### Phase 5: Bulletproof (Discipline Skills Only)

Skip for technique, reference, and simple workflow skills — overengineering weakens them. Discipline skills need hardening because agents rationalize around constraints under pressure.

1. Spawn a subagent *without* the skill loaded (mechanism: `references/harness-tools.md`) and give it the discipline's task. Record every rationalization it uses to cut corners.
2. Build a rationalization table — every excuse gets a direct counter — plus a red flags list of self-check thoughts.
3. Close loopholes explicitly: forbid specific workarounds, not just the rule.
4. Re-test with the skill loaded under *combined* pressure (time + sunk cost + authority); iterate until compliance is stable.

Required items: `references/rules.md` (Bulletproofing Requirements); techniques: `references/bulletproofing-guide.md`, loaded at phase start.

### Phase 6: Validate

Load `references/rules.md`, then run every item in `references/validation-checklist.md`. A single "no" means the skill is not ready.

### Phase 7: Eval and Iterate

Phase 6 validates the *document*; this phase proves the *output*. A skill can pass every structural gate and still ship a script that crashes on the first edge case — so **execute the artifact against adversarial cases; never reason about whether it works.** This is gate #8, Proven — the most-skipped step under time pressure.

Run the eval matching what the skill produces — the per-type methods, adversarial fixture catalog, and stop condition live in `references/eval-loop.md`; load it before writing any fixture. Anchor: artifact-producing skills need 8+ adversarial fixtures executed to a clean full re-run plus two empty probe rounds; discipline skills are already proven by Phase 5's re-test; reference and pure-workflow skills get a fresh-agent dry-run of the Phase-1 scenarios.

Fold discoveries back: strengthen triggers, add missing boundaries, document new failure modes. This loop owns *correctness*; defer pass-rate benchmarking and description-trigger optimization to `skill-creator:skill-creator`.

## Tool Guidance

**Avoid:**
- `@filename` force-loading from SKILL.md — consumes context regardless of need
- Duplicating reference material inline — link instead
- Flowcharts for reference material (use tables), code (use blocks), or linear steps (use numbered lists)
- Empty directories (only create directories with content)

**Constraints:**
- No second person in the body
- No workflow summary in the description
- Cross-reference skills by name with requirement markers ("**REQUIRED BACKGROUND:** superpowers:test-driven-development"); never `@` force-load
- Every supporting file must be referenced from the body, or it doesn't exist

## Success Criteria

All eight gates must be "yes" before shipping; the authoritative list is `references/rules.md` (Quality Gate). Gates 1–7 are checked in Phase 6; gate 8 in Phase 7.

1. **Discoverable** — found from the user's natural request alone
2. **Bounded** — "Do Not Use When" lists adjacent skills and forbidden contexts
3. **Actionable** — steps are imperative, specific, executable without guessing
4. **Verifiable** — success criteria are measurable and unambiguous
5. **Lean** — body within word target; every sentence passes the no-op test
6. **Self-consistent** — the skill follows the rules it teaches
7. **Positioned** — collisions with existing skills explicitly addressed
8. **Proven** — verifiable output executed against adversarial fixtures, all passing

If any answer is "no," iterate.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Description summarizes the workflow | Strip to triggers only |
| Missing "Do Not Use When" | Add it — the single most common omission |
| Drafting from assumed intent | Interview first (Phase 1); confirm scope before drafting |
| Sentence restates the model's default | Delete it whole (no-op test) |
| Discipline skill without bulletproofing | Rationalization table, red flags, loophole closings |
| Skill breaks the rules it teaches | Rewrite against its own template |
| Script validated only by reading | Execute against adversarial fixtures (gate #8) |

## Failure Modes

- **An existing skill already covers this:** Stop. Improve it or position the new skill explicitly against it — never silently overlap.
- **Skill cannot be bounded:** Scope too broad; split into multiple skills.
- **Rationalizations keep appearing:** Add structural escalation paths, not louder MUSTs (`references/bulletproofing-guide.md`, Technique 6).
- **Body exceeds the cap:** Stop adding; extract to `references/`, and split the skill if references/ outgrows one topic.
- **Stale layers (sediment) in an existing skill:** Re-run the Phase 3 passes before adding anything new.
- **Competing skills load together:** Descriptions overlap; tighten triggers and cross-reference in "Do Not Use When".

## Additional Resources

- **`references/rules.md`** — the rule registry, single source of truth. Load in Phase 6 and for any authoritative value.
- **`references/behavioral-force.md`** — the six levers, before/after rewrites. Load while drafting (Phase 2).
- **`references/harness-tools.md`** — tool mapping and fallbacks. Load when the harness is not Claude Code.
- **`references/body-template.md`** — body template, step and pointer guidance, extraction table. Load at Phase 2 start.
- **`references/description-guide.md`** — description skeleton and anti-patterns. Load in Phase 4.
- **`references/bulletproofing-guide.md`** — six hardening techniques. Load in Phase 5.
- **`references/validation-checklist.md`** — the binary gate. Load in Phase 6.
- **`references/eval-loop.md`** — fixture catalog and stop condition. Load in Phase 7 before writing any fixture.
- **`examples/simple-skill-example.md`** — model single-file technique skill.
- **`examples/complex-skill-example.md`** — model workflow skill using references/, examples/, scripts/.

## Above All

A skill that is found but not obeyed is wasted — and one that is obeyed but ships broken output is worse. Before shipping any skill, drive behavior: **command, don't suggest; specify the action, don't just forbid; show one example; anchor with numbers; put what matters first and last; name behaviors with words the model already knows.** Then confirm the skill follows every rule it teaches — self-consistency (gate #6) is the most commonly failed check. Finally, if the skill emits an artifact, **execute it against adversarial cases before declaring done** (gate #8) — reasoning about correctness ships bugs that a single run catches.
