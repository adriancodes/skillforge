# The Rule Registry

Single source of truth for every invariant a skill is checked against. **Change a rule here and nowhere else.**

`SKILL.md` and `references/validation-checklist.md` cite this file for authoritative values. The guides (`description-guide.md`, `bulletproofing-guide.md`, `body-template.md`) explain *why* each rule exists — they must not restate the rules themselves. If a number or list appears in two files, this one wins.

Phase 6 loads this file alongside the validation checklist; the checklist's items resolve their values here.

## Word Targets

By skill type. Content beyond the target moves to `references/`.

| Skill Type | SKILL.md Target |
|-----------|-----------------|
| Simple technique | 500–800 words |
| Standard workflow | 1,000–1,500 words |
| Complex domain | 1,500–2,000 words |
| Discipline (with bulletproofing) | 1,500–2,500 words |

**Hard cap:** 2,500 words for any skill. No SKILL.md body exceeds this.

## Skill Types

Four types. Each maps to a word target above and, for discipline, to the Bulletproofing Requirements below.

| Type | One-line |
|------|----------|
| Technique | Concrete repeatable method |
| Discipline | Enforces rules under pressure |
| Reference | API docs, schemas, domain knowledge |
| Workflow | Multi-phase process with decision points |

## Per-Type Recipe

Everything a type needs, in one row. Build to the row for the chosen type. The word-tier column names a row in Word Targets above — the numbers live there only.

| Type | Word tier | Section changes | Bulletproofing | Primary guide |
|------|-----------|-----------------|----------------|---------------|
| Technique | Simple technique | Merge When/Do-Not into one Scope section; keep Quick Reference | No | `body-template.md` → Simple Technique |
| Workflow | Standard workflow → Complex domain | Full template, all required sections | No | `body-template.md` |
| Reference | Complex domain | Workflow becomes Lookup Procedure; Quick Reference is primary content | No | `body-template.md` → Reference/API |
| Discipline | Discipline | Add Rationalization Table, Red Flags, Foundational Principle | **Yes** — all Bulletproofing Requirements | `bulletproofing-guide.md` |

## Behavioral-Force Rules

The six levers that decide whether an agent obeys a skill. Apply all six to every skill. `behavioral-force.md` explains and demonstrates each.

- [ ] **Imperative force** — instructions are verb-first commands (Always / Never / `<verb>`), never observations ("is helpful", "consider", "usually")
- [ ] **Positive specification** — behavioral guidance states the action to take; every prohibition is paired with its replacement ("Never X; do Y instead"). Scope boundaries ("Do Not Use When") are the one allowed exception
- [ ] **Load-bearing example** — at least one concrete, complete, runnable example demonstrates the core behavior
- [ ] **Concrete anchors** — vague qualifiers are replaced with measurable anchors where a limit is meant ("3 sentences or fewer", not "concise")
- [ ] **Position** — the most critical instruction sits in the first fifth and the last fifth of the body, and is restated at the end
- [ ] **Leading words** — each behavioral concept is named with a compact term the model already holds from pretraining (*adversarial*, *tight*, *red/green*) and repeated as that term, never re-explained; a leading word too weak to change behavior ("be thorough") is replaced with a stronger word ("relentless"), not with a longer sentence

## Invocation

Choose the invocation axis in Phase 1, before drafting. Each choice spends a different load; pick the cheaper one for how the skill actually fires.

- **Model-invoked** (default) — the skill keeps a trigger `description`, so the agent fires it autonomously and other skills can reach it by name. Costs *context load*: the description is loaded into every conversation whether or not the skill fires. Choose when the agent must discover the skill from a natural user request.
- **User-invoked** — set `disable-model-invocation: true` in frontmatter. Only the human typing the skill's name can fire it; zero context load, but the human must remember it exists (*cognitive load*). Choose when the skill only ever fires by explicit request (release rituals, personal checklists, meta-tools). The `description` becomes a human-facing one-liner; the Description Rules below do not apply. *Portability:* the flag is a Claude Code extension, not part of the open Agent Skills spec — in harnesses without it the skill stays model-invoked, so keep even the one-liner accurate as a trigger.
- **Router skill** — when user-invoked skills multiply past easy recall, add one skill that names each and when to reach for it, so the human remembers one name instead of many.

## Description Rules

The authoritative description checklist for **model-invoked** skills (user-invoked skills carry a one-line human-facing summary instead — see Invocation). `description-guide.md` explains the reasoning behind each.

- [ ] Starts with "Use when…" or "This skill should be used when…"
- [ ] Written in third person (not "you" or "I")
- [ ] Under 500 characters total (loaded into every conversation, so length is bounded)
- [ ] Contains 2–4 quoted trigger phrases users would say, covering distinct request branches — synonym rewrites of a single branch are capped at the 2 strongest
- [ ] Contains at least 1 symptom, error message, or keyword
- [ ] Does NOT summarize the skill's workflow or process
- [ ] Does NOT describe what the skill does (only when to use it)
- [ ] Specific enough to avoid false triggers
- [ ] Broad enough to catch legitimate variations

## Naming

**Spec constraints** (open Agent Skills spec, agentskills.io/specification): 1–64 characters; lowercase letters, numbers, and hyphens only; no leading or trailing hyphen; no consecutive hyphens; the name matches the parent directory name.

**Required:** the name is functional and unambiguous — a request for what the skill does reliably matches it, with no semantic collision with an unrelated common meaning (e.g., `writing-skills` collides with writing *ability*; `creating-skills` does not).

**Recommended:** verb-first active voice (`creating-X`, not `X-creator`). It sits closest to how requests are phrased and keeps a library consistent — but it is a convention, not a measured law. A functional, unambiguous noun name satisfies the requirement; verb-first is just the form that most reliably produces one.

## Frontmatter Fields

Per the open Agent Skills spec (agentskills.io/specification). Required: `name` (Naming above) and `description` (Description Rules above — skill-forge's 500-character cap sits inside the spec's 1,024 ceiling). Optional — include only when applicable:

- `license` — license name, or the name of a bundled license file
- `compatibility` — environment requirements (system packages, network access, intended product), max 500 characters. Declare it whenever a generated skill's scripts need specific tooling (git, Python 3.x, docker); most skills omit it
- `metadata` — arbitrary string key-value map (author, version); use reasonably unique key names
- `allowed-tools` — space-separated pre-approved tools. Experimental; support varies by harness

## Steps and Pointers

Rules for workflow steps and file references. `body-template.md` (Writing Workflow Steps, Writing Context Pointers) demonstrates each.

- [ ] Every workflow step ends on a **checkable completion criterion** — the agent can tell done from not-done ("all fixtures pass on a full re-run", not "tests look good")
- [ ] Criteria that gate thoroughness are **exhaustive** ("every modified file accounted for", not "produce a change list")
- [ ] Every context pointer states *when* to load its target, not only what the target contains
- [ ] A must-have file behind an unreliable pointer is fixed by sharpening the pointer's wording first; the material is inlined only if sharpening fails
- [ ] File references use relative paths and stay one level deep from SKILL.md — no nested reference chains (open-spec rule)

## Pruning

Run in Phase 3 after drafting, and again whenever reviewing an existing skill.

- [ ] **No-op test** — every sentence changes agent behavior versus the model's default; failing sentences are deleted whole, never trimmed ("handle edge cases carefully" fails; "test the empty string — it classifies as numeric" passes)
- [ ] **Relevance** — every line still bears on what the skill does today; stale accumulated layers (sediment) are removed, not written around
- [ ] **Single source of truth** — each rule, number, and list lives in exactly one file; other files point to it, never restate it

## Required Sections

**Required (7):** Overview · When to Use · Do Not Use When · Workflow · Success Criteria · Common Mistakes · Failure Modes

*Technique skills may present When to Use + Do Not Use When as one combined **Scope** section (see Per-Type Recipe). The content of both is required; the two separate headings are not.*

**Conditional (present when applicable):** Required Context · Tool Guidance · Additional Resources · Quick Reference

## Quality Gate

The eight-point gate. All must be "yes" before a skill ships. `SKILL.md` names these in Success Criteria; the authoritative list — and the order of failure frequency — lives here.

1. **Discoverable** — an agent would find this skill given only the user's natural request
2. **Bounded** — states when NOT to use it, and when to stop
3. **Actionable** — workflow steps are imperative, specific, executable without guessing
4. **Verifiable** — success criteria are measurable and unambiguous
5. **Lean** — body within word target, depth in `references/`
6. **Self-consistent** — the skill follows the rules it teaches (most commonly failed)
7. **Positioned** — collisions with existing skills explicitly addressed in "Do Not Use When"
8. **Proven** — if the skill ships a script or produces verifiable output, that output has been *executed* against adversarial fixtures and all pass — not merely reasoned about (see Eval Loop Requirements)

## Bulletproofing Requirements

Discipline skills only. `bulletproofing-guide.md` explains the techniques; this is the checklist run in Phase 6.

- [ ] Rationalization table with 5+ entries from actual baseline testing
- [ ] Red flags list with specific self-check thoughts
- [ ] At least 3 explicit loophole closings (specific workarounds forbidden)
- [ ] Foundational principle stated early in the skill
- [ ] Tested under combined pressure (not single-axis)
- [ ] Escalation path for genuine (not rationalized) exceptions
- [ ] Each rationalization stated once (in the Rationalization Table); other sections reference it, never re-argue it
- [ ] Includes a "deliver, don't lecture" instruction — state the rule once, then produce the compliant output and default to the safe pattern silently
- [ ] **Re-tested after adding all bulletproofing — agent still complies**

## Eval Loop Requirements

Run in Phase 7. Proves the skill's *output* works, not just that the document is well-formed. `eval-loop.md` explains the technique and holds the adversarial-fixture catalog; this is the checklist. The eval method is type-conditional — satisfy the row matching what the skill produces.

- [ ] **Script or verifiable output** — 8+ adversarial fixtures written (empty/blank, single element, delimiter-in-data, embedded newline, ragged, special chars, unicode/BOM, boundary numbers, type ambiguity); artifact **executed** against every fixture; all pass on a full re-run; failures fixed in the *skill*, never by editing the fixture to match buggy output
- [ ] **Discipline skill** — covered by the Bulletproofing Requirements re-test above; not re-run here
- [ ] **Reference skill** — a fresh agent performs 3 real lookups and applies each correctly
- [ ] **Pure technique/workflow, no artifact** — a fresh agent dry-runs the Phase-1 trigger scenarios with no gaps or deviation
- [ ] Iterated until a clean pass **plus** two consecutive probe rounds that surface no new failing case
- [ ] Any input class left untested — and any non-obvious semantic decision the artifact makes on an ambiguous spec (sort order, tie-breaking, type coercion) — is named in the skill's Failure Modes (no silent coverage caps, no silent judgment calls)

**Division of labor:** this loop owns *correctness* (does this artifact produce the right output on hard cases — qualitative, always-on, no harness). Quantitative pass-rate benchmarking and description-trigger optimization belong to `skill-creator:skill-creator`.

## Portability (Harness-Neutral)

Every skill must work in any agent harness, not only Claude Code. `references/harness-tools.md` holds the tool-mapping authors and generated skills cite.

- [ ] Harness-specific tools are named with their generic role and a fallback ("use the harness's multi-option question UI; otherwise ask as a numbered list"), never assumed to exist
- [ ] No hard dependency on a harness-only mechanism (plugin packaging, `settings.json` hooks, `${CLAUDE_PLUGIN_ROOT}`) inside the skill body; if one is referenced, it is marked as that harness's path with a neutral alternative
- [ ] The skill's instructions still execute when loaded as a plain instruction document (manual trigger), degrading only the *triggering*, never the steps
- [ ] Any harness-specific helper the skill leans on is mapped in `references/harness-tools.md`

## Other Constants

- Inline code examples: under 50 lines; longer examples move to `examples/`
- One excellent example per concept (no multi-language dilution)
- Cross-references to other skills: by name only, never `@` force-loading
