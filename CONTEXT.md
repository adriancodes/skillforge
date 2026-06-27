# Context

Domain vocabulary for the skillforge toolkit. Terms here have one definition; files reference them rather than redefining.

## Terms

**Rule registry**
The single file (`references/rules.md`) that owns every invariant a skill is checked against — word targets, skill types, description rules, required sections, the quality gate, bulletproofing requirements, and eval-loop requirements. Every other file cites the registry instead of keeping its own copy. The validation checklist is the *gate* (run during Phases 6–7); the registry is the *source* the gate resolves its values against.

**Skill type**
One of four shapes a skill takes — technique, discipline, reference, or workflow. The type determines the word target and whether bulletproofing applies. Enumerated in the [[rule-registry]] (`references/rules.md`, Skill Types).

**Quality gate**
The eight-point pass/fail check (Discoverable, Bounded, Actionable, Verifiable, Lean, Self-consistent, Positioned, Proven) every skill must clear before shipping. Gates 1–7 check the document (Phase 6); gate 8, Proven, checks the output via the [[eval-loop]] (Phase 7). Named in SKILL.md Success Criteria; owned by the [[rule-registry]].

**Eval loop**
The Phase 7 step that proves a skill's *output* works, as distinct from the quality gate's checks on the *document*. Its core rule: execute the generated artifact against adversarial fixtures and fix until clean — never reason about correctness. Owned by the [[rule-registry]] (Eval Loop Requirements) and explained in `references/eval-loop.md`. Owns *correctness*; quantitative pass-rate benchmarking and description-trigger optimization are deferred to `skill-creator`. Satisfies gate #8 (Proven).

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
