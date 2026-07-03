# Skill Forge

**A skill that builds skills.** Skill Forge is an agent-agnostic skill for authoring *other* agent skills that are discoverable, reliably followed, and actually change agent behavior — not just well-formatted. It runs in any agent harness — Claude Code, Cursor, Codex, Gemini CLI, Copilot, or a custom loop — and the skills it builds are harness-neutral too.

Most hand-written skills fail in one of two ways: an agent never loads them (bad description), or it loads them and ignores them (weak instructions). Skill Forge encodes the practices that fix both, and gates every skill it produces against them.

---

## What makes it different

- **One home for every rule.** Word limits, required sections, the quality gate, and bulletproofing requirements live in a single rule registry (`references/rules.md`). Nothing drifts.
- **Behavioral-force levers, enforced.** Five levers that decide whether an agent *obeys* a skill — imperative force, positive specification, load-bearing examples, concrete anchors, and position — are rules it checks, not advice it mentions.
- **Clarify intent before building.** It interviews you (with a multiple-choice UI) until the scope, triggers, and success criteria are confirmed — so it builds what you meant, not what it guessed.
- **A real validation gate.** Every generated skill is run against an eight-point quality gate before it ships.
- **An eval loop that runs the output.** Skills that emit a script or verifiable output are *executed* against adversarial fixtures and fixed until clean — not merely reasoned about. Reasoning ships bugs that one run catches; this loop (gate #8, "Proven") is why.
- **Bulletproofing for discipline skills.** Rules that must hold under pressure get a rationalization table, red flags, and an escalation path — with anti-bloat and "deliver, don't lecture" guidance baked in.

---

## Install

### Option A — skills CLI / skills.sh (recommended, works across agents)

From your project root:

```bash
npx skills add adriancodes/skillforge
```

Installs directly from the GitHub repo — no prior registration — and your agent (Claude Code, Cursor, Codex, Gemini, Copilot, …) picks up `SKILL.md` on the next session. Start a new session and ask to "create a skill", or invoke `/skill-forge` where supported.

### Option B — Claude Code plugin

In Claude Code:

```
/plugin marketplace add adriancodes/skillforge
/plugin install skill-forge@skillforge
```

Then start a new session. Skill Forge will trigger on requests like "create a skill" or you can invoke it with `/skill-forge`.

### Option C — manual (personal skill)

```bash
git clone https://github.com/adriancodes/skillforge.git
cp -r skillforge/skills/skill-forge ~/.claude/skills/skill-forge
```

Start a new session and it's available.

### Option D — load directly in any other harness

Skillforge is harness-neutral. Point your agent at [`AGENTS.md`](AGENTS.md) (the cross-tool entry point), or load [`skills/skill-forge/SKILL.md`](skills/skill-forge/SKILL.md) directly — into a Cursor rule, `GEMINI.md`, the Copilot `skill` tool, or your system prompt. Tool names map to your harness via [`skills/skill-forge/references/harness-tools.md`](skills/skill-forge/references/harness-tools.md), which also gives a fallback for any tool your harness lacks. In a harness with no skill system, it's a markdown instruction doc you include deliberately — every step still works; only auto-triggering is manual.

---

## Usage

Trigger it naturally or explicitly:

```
/skill-forge
Build me a skill that enforces conventional commit messages.
```

Skill Forge will:

1. **Clarify intent** — ask targeted (multiple-choice) questions about scope, triggers, and what "done" looks like, then restate it back for confirmation. (Say *"just make reasonable choices"* to skip the questions; it will state its assumptions instead.)
2. **Scope and classify** — pick the skill type (technique, discipline, reference, or workflow) and its build recipe.
3. **Draft** against the canonical template, applying the five behavioral-force levers.
4. **Bulletproof** if it's a discipline skill.
5. **Validate** against the eight-point quality gate.
6. **Eval** — execute the generated artifact against adversarial fixtures and fix until clean (gate #8, "Proven").

---

## What's inside

The skill lives at [`skills/skill-forge/`](skills/skill-forge/):

| File | Purpose |
|------|---------|
| `SKILL.md` | The workflow: clarify → scope → draft → extract → bulletproof → validate → eval |
| `references/rules.md` | The rule registry — single source of truth for every checked invariant |
| `references/behavioral-force.md` | The five levers that make an agent obey a skill, with before/after rewrites |
| `references/body-template.md` | The canonical SKILL.md template + per-type adaptations |
| `references/description-guide.md` | How to write a description that triggers (and the anti-patterns that don't) |
| `references/bulletproofing-guide.md` | Hardening discipline skills against rationalization |
| `references/validation-checklist.md` | The pre-flight gate, run before any skill ships |
| `references/eval-loop.md` | The execute-don't-reason eval loop + adversarial-fixture catalog (gate #8) |
| `references/harness-tools.md` | Maps Claude Code tool names to other harnesses, with a fallback for each |

[`CONTEXT.md`](CONTEXT.md) documents the project's own vocabulary (rule registry, behavioral force, eval loop, drift, harness-neutral).

---

## Testing a skill you build

Correctness is checked automatically by the built-in eval loop (gate #8). The methods below go further — measuring *lift* and *reliability* across runs, which is where a quantitative harness like `skill-creator` complements Skill Forge:

- **Lift** — build it with vs. without Skill Forge; compare blind.
- **Reliability** — generate it 3× and check the outputs are consistent.
- **Downstream** — pick a behavior the base model *doesn't* do by default (a made-up convention works), then test the generated skill with vs. without it. Lift is only measurable where the baseline fails.
- **Discoverability** — fire realistic phrasings (and near-misses) at the description and confirm it triggers on the right ones only.

---

## License

MIT — see [LICENSE](LICENSE).
