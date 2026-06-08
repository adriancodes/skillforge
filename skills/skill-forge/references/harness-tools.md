# Harness Adaptation

Skillforge works in any agent harness, not just Claude Code. The skill is written with Claude Code tool names as the shared vocabulary; this file maps each to its equivalent elsewhere, and gives the fallback when a harness lacks the feature.

**Rule for every harness:** if a named tool exists, use it. If it does not, use the fallback in the last column — never skip the step.

## Tool mapping

| Skillforge says (Claude Code) | What it means | Cursor / Codex / generic | Gemini CLI | Copilot CLI | Fallback if absent |
|-------------------------------|---------------|--------------------------|------------|-------------|--------------------|
| AskUserQuestion tool | Present 2–4 pickable options + custom | (no native UI) | (no native UI) | (no native UI) | Ask the question in plain text as a numbered list; let the user reply with a number |
| Agent tool (`subagent_type=…`) | Spawn a fresh subagent for a task | task/sub-agent API if present | `run_shell_command` to launch a fresh session | sub-agent if present | Open a separate clean chat/session and paste the task; treat its reply as the subagent result |
| Skill tool | Load another skill by name | read that skill's SKILL.md file directly | `activate_skill` | `skill` tool | Read the other skill's `SKILL.md` and follow it inline |
| Description auto-trigger | Harness loads the skill when a request matches its description | manual: include the skill in rules/context | metadata-activated | auto-discovered | Paste `SKILL.md` into the system prompt / instructions file (see below) |
| Progressive disclosure (metadata → body → references) | Read deeper files only when needed | same — just `read_file` on demand | same | same | Any harness with file reading does this natively; read references when the workflow points to them |
| `@file` force-load | Inline a file's contents always | avoid; read on demand instead | avoid | avoid | Read the file when the step needs it — the anti-pattern is universal |

## How the skill loads in each harness

- **Claude Code** — install as a plugin or drop in `~/.claude/skills/`; it auto-triggers on its description.
- **Claude Agent SDK** — register the skill directory; same auto-trigger model.
- **Cursor** — reference `SKILL.md` from a project rule, or paste it into `.cursor/rules`.
- **OpenAI Codex CLI / generic CLI agents** — point the agent at `AGENTS.md` (repo root); it routes to `SKILL.md`.
- **Gemini CLI** — expose the skill via `activate_skill`, or load `SKILL.md` through `GEMINI.md`.
- **GitHub Copilot CLI** — install via the plugin's `skill` tool, or include `SKILL.md` in the instructions.
- **Any other harness** — concatenate `SKILL.md` into the system prompt. The references load on demand whenever the agent can read files; if it cannot, append the references the workflow names.

## The honest ceiling

A harness with no concept of "load a skill when a trigger matches" cannot auto-discover skillforge — there, it is a markdown instruction document the user includes deliberately. Everything in the workflow still applies; only the *triggering* is manual. Features the harness genuinely lacks (subagents, a question UI) fall back to the last column above; the steps are never dropped.
