# AGENTS.md — Skillforge

This repository is a portable agent skill for **building other agent skills**. It works in any harness, not only Claude Code.

## How to use this skill

1. Read **`skills/skill-forge/SKILL.md`** and follow its workflow.
2. Read files under **`skills/skill-forge/references/`** on demand, when the workflow points to them — do not load them all up front.
3. The skill uses Claude Code tool names as a shared vocabulary. If you are not in Claude Code, map each tool to your harness via **`skills/skill-forge/references/harness-tools.md`**, and use its fallback when a tool is absent. Never skip a step because a named tool is missing.

## When this skill applies

Activate it when the user wants to create, improve, or review an agent skill — e.g. "create a skill", "write a skill", "make a skill for X", or when skills trigger inconsistently or get ignored. Full triggers are in the `description` field of `SKILL.md`.

## Harness-specific loading

- **skills CLI / skills.sh** — `npx skills add adriancodes/skillforge`; works across Claude Code, Cursor, Codex, Gemini, Copilot. (This repo follows the `skills/<name>/SKILL.md` convention the CLI expects.)
- **Claude Code** — installed as a plugin or under `~/.claude/skills/`; auto-triggers.
- **Cursor** — reference `skills/skill-forge/SKILL.md` from a project rule.
- **Codex / generic CLI agents** — you are reading the entry point; route to `SKILL.md`.
- **Gemini CLI** — load `SKILL.md` via `GEMINI.md` or `activate_skill`.
- **Copilot CLI** — install the plugin's `skill` tool, or include `SKILL.md`.
- **No skill system at all** — paste `SKILL.md` into the system prompt; trigger it manually.
