# Example: Simple Technique Skill

This demonstrates a minimal, well-formed skill — within the simple-technique word target, no supporting directories needed.

```
rotate-pdf/
└── SKILL.md
```

## SKILL.md Content

```markdown
---
name: rotate-pdf
description: >
  Use when the user asks to "rotate a PDF", "fix PDF orientation",
  "turn PDF pages", or has a PDF displaying sideways or upside down.
---

# Rotate PDF

## Overview

Rotate PDF pages to correct orientation using Python's pypdf library. Handles single-page, multi-page, and selective page rotation.

## When to Use

- User has a PDF displaying in wrong orientation
- User asks to rotate specific pages or all pages
- PDF scanned sideways or upside down

## Do Not Use When

- Task involves editing PDF content (text, images) — use a PDF editor skill
- Task is merging or splitting PDFs — different operation
- File is not a PDF

## Workflow

1. Confirm the target PDF path and desired rotation (90, 180, or 270 degrees).
2. Determine scope: all pages or specific page numbers.
3. Execute the rotation script: `python3 scripts/rotate_pdf.py <input> <output> <degrees> [pages]`
4. Verify the output file opens correctly.
5. Report the result to the user.

## Success Criteria

- Output PDF exists and is valid
- Rotated pages display in correct orientation
- Non-targeted pages remain unchanged
- Original file preserved (output written to new path)

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Overwriting the original file | Always write to a new output path |
| Rotating wrong direction | Confirm: 90 = clockwise, 270 = counter-clockwise |
| Forgetting 0-indexed pages | pypdf uses 0-based indexing; user says "page 1", code uses index 0 |

## Failure Modes

- **Encrypted PDF:** Stop and inform user — decryption required first.
- **Corrupted PDF:** Report the error; do not attempt repair.
```

## Why This Works

- **591 words** — within simple skill target
- **No references/ needed** — everything fits in SKILL.md
- **Clear boundaries** — "Do Not Use When" prevents misapplication
- **Concrete success criteria** — agent knows when it's done
- **Failure modes** — agent knows when to stop
- **Description** — trigger-focused, includes user phrases, no workflow summary
