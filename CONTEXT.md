# Context

Domain vocabulary for the skillforge toolkit. Terms here have one definition; files reference them rather than redefining.

## Terms

**Rule registry**
The single file (`references/rules.md`) that owns every invariant a skill is checked against — word targets, skill types, description rules, required sections, the quality gate, and bulletproofing requirements. Every other file cites the registry instead of keeping its own copy. The validation checklist is the *gate* (run during Phase 6); the registry is the *source* the gate resolves its values against.

**Skill type**
One of four shapes a skill takes — technique, discipline, reference, or workflow. The type determines the word target and whether bulletproofing applies. Enumerated in the [[rule-registry]] (`references/rules.md`, Skill Types).

**Quality gate**
The seven-point pass/fail check (Discoverable, Bounded, Actionable, Verifiable, Lean, Self-consistent, Positioned) every skill must clear before shipping. Named in SKILL.md Success Criteria; owned by the [[rule-registry]].

**Behavioral force**
The degree to which a skill's wording makes an agent actually obey it (as opposed to merely understand it). Driven by five levers — imperative force, positive specification, load-bearing examples, concrete anchors, and position — owned by the [[rule-registry]] (Behavioral-Force Rules) and explained in `references/behavioral-force.md`. Structure makes a skill findable; behavioral force makes it followed.

**Lever**
One of the five wording techniques that produce behavioral force. Each is a rule in the registry and a check in Phase 6, not an optional suggestion.

**Harness**
The runtime an agent runs in — Claude Code, Cursor, Codex CLI, Gemini CLI, Copilot CLI, the Claude Agent SDK, or a custom loop. Harnesses differ in which tools exist and how skills load and trigger.

**Harness-neutral**
A property of a skill: it runs in any [[harness]], naming each harness-specific tool by its generic role plus a fallback rather than assuming it exists. Owned by the [[rule-registry]] (Portability) and mapped in `references/harness-tools.md`. A harness-neutral skill degrades only its *triggering* (manual instead of auto) where a harness lacks a skill system — never its steps.

**Drift**
What happens when the same rule is written in more than one file and the copies fall out of sync. The reason the rule registry exists: one home per rule means no drift.
