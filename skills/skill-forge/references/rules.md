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

The five levers that decide whether an agent obeys a skill. Apply all five to every skill. `behavioral-force.md` explains and demonstrates each.

- [ ] **Imperative force** — instructions are verb-first commands (Always / Never / `<verb>`), never observations ("is helpful", "consider", "usually")
- [ ] **Positive specification** — behavioral guidance states the action to take; every prohibition is paired with its replacement ("Never X; do Y instead"). Scope boundaries ("Do Not Use When") are the one allowed exception
- [ ] **Load-bearing example** — at least one concrete, complete, runnable example demonstrates the core behavior
- [ ] **Concrete anchors** — vague qualifiers are replaced with measurable anchors where a limit is meant ("3 sentences or fewer", not "concise")
- [ ] **Position** — the most critical instruction sits in the first fifth and the last fifth of the body, and is restated at the end

## Description Rules

The authoritative description checklist. `description-guide.md` explains the reasoning behind each.

- [ ] Starts with "Use when…" or "This skill should be used when…"
- [ ] Written in third person (not "you" or "I")
- [ ] Under 500 characters total (loaded into every conversation, so length is bounded)
- [ ] Contains at least 2 quoted trigger phrases users would say
- [ ] Contains at least 1 symptom, error message, or keyword
- [ ] Does NOT summarize the skill's workflow or process
- [ ] Does NOT describe what the skill does (only when to use it)
- [ ] Specific enough to avoid false triggers
- [ ] Broad enough to catch legitimate variations

## Naming

**Required:** the name is functional and unambiguous — a request for what the skill does reliably matches it, with no semantic collision with an unrelated common meaning (e.g., `writing-skills` collides with writing *ability*; `creating-skills` does not).

**Recommended:** verb-first active voice (`creating-X`, not `X-creator`). It sits closest to how requests are phrased and keeps a library consistent — but it is a convention, not a measured law. A functional, unambiguous noun name satisfies the requirement; verb-first is just the form that most reliably produces one.

## Required Sections

**Required (7):** Overview · When to Use · Do Not Use When · Workflow · Success Criteria · Common Mistakes · Failure Modes

*Technique skills may present When to Use + Do Not Use When as one combined **Scope** section (see Per-Type Recipe). The content of both is required; the two separate headings are not.*

**Conditional (present when applicable):** Required Context · Tool Guidance · Additional Resources · Quick Reference

## Quality Gate

The seven-point gate. All must be "yes" before a skill ships. `SKILL.md` names these in Success Criteria; the authoritative list — and the order of failure frequency — lives here.

1. **Discoverable** — an agent would find this skill given only the user's natural request
2. **Bounded** — states when NOT to use it, and when to stop
3. **Actionable** — workflow steps are imperative, specific, executable without guessing
4. **Verifiable** — success criteria are measurable and unambiguous
5. **Lean** — body within word target, depth in `references/`
6. **Self-consistent** — the skill follows the rules it teaches (most commonly failed)
7. **Positioned** — collisions with existing skills explicitly addressed in "Do Not Use When"

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
