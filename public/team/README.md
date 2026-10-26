# Founder photos

Drop two square images here. The site picks them up automatically — no code
change needed. `src/lib/site.ts` → `team[].photo` points at these paths.

| File | Person | Which photo |
| --- | --- | --- |
| `tayef.png` | Md Tayef | green cap, green background |
| `sanju.jpeg` | Purna Deb Paul (Sanju) | black turtleneck, blue background |

Square crop, 800×800 or larger. `.jpg` or `.png` both work — if you use `.png`,
update the extension in `site.ts` to match.

If a file is missing the card falls back to an initials monogram rather than
breaking, so a half-finished set is safe to deploy.
