# Canonical SKILL.md Body Template

Copy and adapt this template when creating new skills. Every section exists for a specific reason — omit only with explicit justification.

## Template

```markdown
---
name: kebab-case-skill-name
description: >
  Use when [triggering condition 1], [triggering condition 2],
  or the user asks to "exact phrase 1", "exact phrase 2".
  Also when [symptom or error keyword].
---

# Skill Name

## Overview

[Core principle in 1–2 sentences. What problem does this skill solve and why does it matter?]

## When to Use

- [Trigger scenario A — specific user request or situation]
- [Trigger scenario B — symptom or error message]
- [Trigger scenario C — context that signals this skill applies]

## Do Not Use When

- [Exclusion A — what this skill is NOT for]
- [Exclusion B — adjacent task that requires a different skill]
- [Exclusion C — condition where applying this skill would be harmful]

## Required Context

[What the agent must gather or verify before starting the workflow. Pre-flight checks.]

- [Input 1 — files, logs, or information needed]
- [Input 2 — state that must be true before proceeding]

## Workflow

1. [First step — imperative voice, specific action]
2. [Second step — what to do with the gathered context]
3. [Third step — core execution of the skill's purpose]
4. [Fourth step — validation or verification]
5. [Fifth step — summarize results, communicate to user]

## Tool Guidance

**Prefer:**
- [Tool A — and why it's appropriate here]

**Avoid:**
- [Tool B — and why it's inappropriate or dangerous here]

**Constraints:**
- [Safety rule — e.g., "never force-push without user confirmation"]

## Success Criteria

- [Condition 1 — measurable definition of done]
- [Condition 2 — quality bar that must be met]

## Quick Reference

| Scenario | Action |
|----------|--------|
| [Common case 1] | [What to do] |
| [Common case 2] | [What to do] |

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| [Error pattern 1] | [Correct approach] |
| [Error pattern 2] | [Correct approach] |

## Failure Modes

- **[Condition A]:** Stop and escalate to the user. [Why this can't be handled automatically.]
- **[Condition B]:** Ask for more context. [What's missing and why it matters.]
- **[Condition C]:** Known limitation. [What the skill cannot do and what alternatives exist.]

## Additional Resources

- **`references/detailed-guide.md`** — [What it contains and when to consult it]
- **`examples/working-example.sh`** — [What it demonstrates]
- **`scripts/utility.sh`** — [What it does — can be executed without reading]
```

## Section Rationale

| Section | Why It Exists | Source |
|---------|---------------|--------|
| Overview | Quick relevance check — should the agent keep reading? | All approaches |
| When to Use | Confirms the description match; adds keyword surface area | All approaches |
| Do Not Use When | Prevents misapplication — most commonly missing section | Codex |
| Required Context | Pre-flight checks prevent wasted work | Gemini, Codex |
| Workflow | The core value of the skill — procedural, not advisory | All approaches |
| Tool Guidance | Prevents unsafe or inefficient tool choices | Codex |
| Success Criteria | Defines "done" — prevents premature completion | Codex, Gemini |
| Quick Reference | Scannable lookup for repeat use | Opus |
| Common Mistakes | Preemptive error correction | Opus |
| Failure Modes | Teaches the agent when to STOP — prevents overreach | Codex |
| Additional Resources | Makes supporting files discoverable | Opus, Gemini |

## Adapting the Template

### For Simple Technique Skills

Merge or remove sections:
- Combine "When to Use" and "Do Not Use When" into a single "Scope" section
- Remove "Required Context" if no pre-flight checks needed
- Remove "Tool Guidance" if no specific tool constraints
- Keep "Quick Reference" as the primary reference surface

### For Discipline-Enforcing Skills

Add sections (see `references/bulletproofing-guide.md`):
- **Rationalization Table** after "Common Mistakes"
- **Red Flags** after "Failure Modes"
- **Foundational Principle** in "Overview" (e.g., "Violating the letter IS violating the spirit.")

### For Reference/API Skills

Adjust emphasis:
- "Workflow" becomes "Lookup Procedure" — how to find and apply information
- "Quick Reference" becomes the primary content — tables, syntax, examples
- Most detailed content lives in `references/` files
- "Common Mistakes" focuses on misuse of the API/reference
