# Elixir UI conventions

Source of truth: semantic CSS variables and `ui-*` component classes in `src/app/globals.css`.

## Foundations

- Use Geist for controls, body copy, captions and utility headings. Use Changa One (`hero-headline`) for promotional display headings and game names.
- Type scale: eyebrow 11/16, caption 12/18, body and buttons 14/20–23, modal utility title 18/25, values 20/28, display 30–48 with tight line height.
- Text roles: `--text-primary` for headings, `--text-secondary` for body copy, `--text-muted` for labels, `--text-accent` for promotional emphasis.
- Eyebrow labels use sentence case with subtle tracking; do not force uppercase.
- Surfaces: existing `--dicey-darker`, `--dicey-dark`, `--dicey-card` and `--dicey-card-elevated`. Purple establishes the theme; lime is the primary action accent.
- Space on a 4px grid: 4, 8, 12, 16, 24, 32. Modal content uses 24px mobile / 32px desktop gutters; related content uses 8–16px and section breaks use 24px.
- Radii: 12px controls and inset panels, 24px modal panels. Close controls are 40px square; primary buttons are at least 48px high including depth.

## Reusable components

- `ui/PrimaryButton`: shared primary CTA, depth, bubbles, disabled appearance and pointer-aware hover. Reused by hero, welcome bonus and level-up bonus.
- `ui/ModalCloseButton`: consistent close icon, size, surface and accessible name.
- `ModalShell`: native dialog, backdrop, focus containment, Escape and focus restoration.
- `.ui-modal-panel`, `.ui-modal-title`, `.ui-eyebrow`, `.ui-body`, `.ui-caption` and `.ui-detail-grid`: shared presentation primitives.

Reuse these components for new UI. Extend the shared component when adding a variant instead of copying button markup or introducing new hex colors. Existing legacy account and game screens can migrate to these primitives when edited; they are not all migrated yet.

## Interaction

Use the shared ease-out curve and 160ms control transitions. Keep visible keyboard focus. Decorative motion must honor reduced motion, and hover effects must be restricted to fine pointers. Offer previews must not imply a bonus has actually been activated.

## Button hierarchy

- Primary (green, `ui/PrimaryButton` or lime fill): the money action, such as Claim. One per row or card.
- Secondary (ghost): `border border-white/20 bg-white/10 text-white`, hover `bg-white/15`. For "see details" actions like View. Never a muted green, which reads as a disabled Claim.
- Navigation (solid white): full-width links to another area, such as VIP Dashboard.
