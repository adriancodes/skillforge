# Skill Validation Checklist

Run every item before finalizing a skill. A single "no" means the skill is not ready.

**Run with `references/rules.md` loaded.** Items below that concern word targets, description rules, required sections, the quality gate, or bulletproofing resolve their authoritative values from the rule registry — they are not restated here, so the gate and the rules can never disagree.

## Structure

- [ ] Skill lives in its own directory: `skill-name/SKILL.md`
- [ ] SKILL.md has valid YAML frontmatter with `---` delimiters
- [ ] Frontmatter contains `name` field (letters, numbers, hyphens only)
- [ ] Frontmatter contains `description` field
- [ ] Every file referenced in SKILL.md body actually exists
- [ ] No empty directories (only create directories with content)
- [ ] Name follows `references/rules.md` (Naming) — functional and unambiguous; verb-first recommended, not required

## Invocation

- [ ] The invocation axis was chosen deliberately in Phase 1 (`references/rules.md` → Invocation): model-invoked by default; user-invoked (`disable-model-invocation: true`) when the skill only fires by explicit request
- [ ] A user-invoked skill carries a one-line human-facing description — Description Quality below then does not apply

## Description Quality

- [ ] Every rule in `references/rules.md` (Description Rules) holds (model-invoked skills only)

## Body: Sections

- [ ] Every Required Section in `references/rules.md` (Required Sections) is present
- [ ] Each Conditional Section is present when its trigger applies (Required Context for pre-flight inputs; Tool Guidance for tool constraints; Additional Resources when references/, examples/, or scripts/ exist; Quick Reference for many options)

## Writing Style

- [ ] Imperative/infinitive voice throughout ("Parse the file", not "You should parse")
- [ ] No second person ("you", "your") anywhere in the body
- [ ] Objective, instructional language — focuses on WHAT to do, not WHO does it
- [ ] Bullet points and numbered steps, not dense paragraphs
- [ ] Code examples well-commented explaining WHY, not WHAT

## Behavioral Force

- [ ] All six levers in `references/rules.md` (Behavioral-Force Rules) hold: imperative force, positive specification, a load-bearing example, concrete anchors, front/end positioning, and leading words

## Steps and Pointers

- [ ] Every rule in `references/rules.md` (Steps and Pointers) holds — each workflow step ends on a checkable completion criterion, and each context pointer states when to load its target

## Pruning

- [ ] Every rule in `references/rules.md` (Pruning) holds — the sentence-level no-op pass was run, stale lines removed, each meaning lives in exactly one file

## Word Count

- [ ] SKILL.md body is within the word target for its skill type (`references/rules.md` → Word Targets)
- [ ] No SKILL.md body exceeds the hard cap (`references/rules.md` → Word Targets)
- [ ] Content beyond target moved to `references/`

## Progressive Disclosure

- [ ] Core concepts and essential workflow in SKILL.md
- [ ] Detailed patterns, schemas, API docs in `references/`
- [ ] Complete, runnable demonstrations in `examples/`
- [ ] Reusable utilities in `scripts/` (executable and documented)
- [ ] Output resources in `assets/` (templates, images, boilerplate)
- [ ] Every supporting resource referenced explicitly in SKILL.md body

## Code Examples

- [ ] One excellent example per concept (not multi-language dilution)
- [ ] Examples are complete and runnable as-is
- [ ] Examples comment the WHY, not the WHAT
- [ ] Inline examples under 50 lines; longer examples in `examples/`
- [ ] No fill-in-the-blank templates; no contrived scenarios

## Discoverability (Keyword Optimization)

- [ ] Error messages and symptoms in "When to Use" section
- [ ] Synonyms for key concepts used throughout
- [ ] Tool names and CLI commands mentioned where relevant
- [ ] User-phrasing variations in description and body

## Cross-References

- [ ] Other skills referenced by name only (not file path)
- [ ] Required skills marked with "REQUIRED BACKGROUND:" prefix
- [ ] No `@` force-loading of external files
- [ ] Dependencies clearly stated as required vs. optional

## Bulletproofing (Discipline Skills Only)

- [ ] Every item in `references/rules.md` (Bulletproofing Requirements) is satisfied — including the final re-test after hardening

## Boundaries

- [ ] "Do Not Use When" section is present and specific
- [ ] Failure modes documented with clear escalation guidance
- [ ] Success criteria are measurable and unambiguous
- [ ] Skill scope is narrow — one job, not a whole profession

## Eval Loop (Phase 7)

- [ ] Every item in `references/rules.md` (Eval Loop Requirements) is satisfied for the matching skill type — for artifact-producing skills, the output was **executed** against adversarial fixtures and all pass

## Portability

- [ ] Every Portability rule in `references/rules.md` (Portability) holds — harness-specific tools named with a generic role + fallback, no hard harness-only dependency, runs as a plain instruction document

## Eight-Point Quality Gate

- [ ] All eight gates in `references/rules.md` (Quality Gate) answer "yes" — including #8 Proven, satisfied by the Eval Loop above

A single "no" means iterate. The registry notes the most commonly failed gate — #6, Self-consistent: skills that teach a structure they don't follow.
