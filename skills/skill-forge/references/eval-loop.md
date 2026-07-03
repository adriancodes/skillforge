# The Eval Loop

Run in Phase 7. The eval loop proves the skill's *output* works — distinct from Phase 6, which validates the skill *document*. A skill can pass every structural gate and still ship a script that crashes on the first edge case. This loop closes that gap.

## Core Principle

**Execute the artifact against adversarial cases; never reason about whether it works.**

This is the whole lesson, and it was learned the hard way. In a head-to-head against an eval-driven tool, skill-forge authored a cleaner, better-scoped CSV→Markdown skill — and shipped this bug anyway:

```python
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

# is_number("") raises ValueError? No — float("") raises, so this returns False.
# But the real shipped bug was the inverse pattern:
def is_number(s):
    return s.strip().replace(",", "").lstrip("-").replace(".", "").isdigit() or s == ""
# is_number("") == True  →  an all-blank column is classified numeric and right-aligned.
```

No amount of re-reading the code surfaced it. **One execution against an all-blank column did.** The competing tool ran its output, caught the bug in iteration 1, and fixed it in iteration 2. skill-forge reasoned about quality and shipped the defect. Reasoning loses to execution every time output is verifiable.

## The Loop

Apply when the skill ships a script or produces verifiable output (a table, a parser result, generated code, a transformed file).

1. **Enumerate adversarial fixtures.** List the inputs a naive implementation gets wrong (catalog below). Write each as a concrete input plus its expected output. Aim for 8+ fixtures, not 2 happy paths.
2. **Execute the artifact on every fixture.** Run the actual script, or have a fresh agent follow the skill's instructions to produce the output. Record actual vs. expected for each — verbatim, not "looks right."
3. **Fix every mismatch in the skill.** A failure means the skill's script or its instructions are wrong — fix the skill, not the fixture. Fixing the fixture to match buggy output is the cardinal sin.
4. **Re-run all fixtures after each fix.** Fixing one edge case routinely breaks another (handling embedded delimiters re-breaks empty fields). Never declare a fix done on a partial re-run.
5. **Loop until a clean pass, then probe once more.** After all fixtures pass, run one round asking "what input shape did I not test?" New fixtures → keep going. Two consecutive rounds that find nothing new → done.
6. **Declare coverage and judgment calls honestly.** State two things in the skill's Failure Modes: any input class left untested (performance at scale, a format variant), and any non-obvious semantic decision the artifact makes on an ambiguous spec (sort order, tie-breaking, type coercion). Execution proves the output does not crash; it cannot prove the output is what the user *meant*. Silent truncation reads as "covered everything"; a silent judgment call reads as "the only interpretation" — both mislead.

## Adversarial Fixture Catalog

For any skill that processes data or generates structured output, test these shapes — each is a defect the head-to-head or its kin actually produced:

| Shape | Example | Naive failure |
|-------|---------|---------------|
| Empty / blank | `""`, all-blank column | misclassified type; phantom output |
| Single element | one row, one field | off-by-one in headers/separators |
| Delimiter in data | `"a,b"` inside a CSV cell | phantom columns |
| Embedded newline | `"line1\nline2"` in a cell | row split into two |
| Ragged input | rows of differing length | index error or dropped data |
| Special / escape chars | literal `|` in a Markdown cell | broken table structure |
| Unicode / BOM | leading `﻿`, emoji width | mojibake; misaligned columns |
| Boundary numbers | `-0`, `1e10`, `(1,234)` accounting negatives | wrong type/alignment |
| Type ambiguity | `""` is not a number; `"01"` is a string ID | wrong alignment/coercion |

This is a starting set. Add fixtures specific to the skill's domain.

## Eval Method by Skill Type

The eval differs by what the skill produces. Run the row that matches.

| Skill produces | Eval method | Iterate until |
|----------------|-------------|---------------|
| Script or verifiable output | The loop above: adversarial fixtures → execute → fix | All fixtures pass; 2 probe rounds add nothing |
| Discipline (behavior under pressure) | Already covered by Phase 5's combined-pressure subagent re-test — do not duplicate it here | Compliance stable under combined pressure |
| Reference / lookup | Fresh agent performs 3 real lookups and applies each | All 3 retrieved and applied correctly |
| Pure technique/workflow, no artifact | Fresh agent dry-runs the Phase-1 trigger scenarios | Agent applies the skill with no gaps or deviation |

## Boundary vs. skill-creator

These tools do different jobs; running both is the strongest pipeline, and neither replaces the other.

- **skill-forge's eval loop = correctness.** Does *this* artifact produce the right output on hard cases? Qualitative, always-on, zero infrastructure, harness-neutral. Run it on every skill that emits an artifact.
- **skill-creator = measurement and optimization.** *How reliably* does the skill perform across many runs (pass-rates, variance), and does its description trigger correctly (trigger-rate optimization)? Benchmark harness, browser review, automated description tuning.

Defer to skill-creator for statistical pass-rate benchmarking and description-trigger optimization. Keep correctness here — it requires no harness and must never be skipped.

## Stop Condition

Done when: every adversarial fixture passes on a full re-run, AND two consecutive probe rounds surface no new failing case, AND any untested input class is named in Failure Modes. Anything short of all three means iterate.
