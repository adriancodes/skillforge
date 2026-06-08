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

## Description Quality

- [ ] Every rule in `references/rules.md` (Description Rules) holds

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

- [ ] All five levers in `references/rules.md` (Behavioral-Force Rules) hold: imperative force, positive specification, a load-bearing example, concrete anchors, and front/end positioning

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

## Portability

- [ ] Every Portability rule in `references/rules.md` (Portability) holds — harness-specific tools named with a generic role + fallback, no hard harness-only dependency, runs as a plain instruction document

## Seven-Point Quality Gate

- [ ] All seven gates in `references/rules.md` (Quality Gate) answer "yes"

A single "no" means iterate. The registry notes the most commonly failed gate — #6, Self-consistent: skills that teach a structure they don't follow.
