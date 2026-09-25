# Messi — The Tribute

A single-page fan tribute to Lionel Messi's career, built with **React + Vite + TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **Recharts**.

Sections: Hero (animated goal counter) · Career timeline · Trophy cabinet (filterable) · Stats dashboard · Records · Greatest moments carousel · Footer.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Customize

| What | Where |
| --- | --- |
| All stats, trophies, timeline, records, moments, footer quote | `src/data/messi.ts` (each block has a comment naming its source) |
| "Last updated" date in the footer | `LAST_UPDATED` in `src/data/messi.ts` |
| Colours & fonts | `@theme` block in `src/index.css` |
| Chart colours | `SERIES` in `src/components/StatsDashboard.tsx` |
| One component per section | `src/components/*.tsx` |

### Swapping in photos

No photos, crests or logos are included. Every image slot is a clearly marked placeholder.
To add a photo you have the rights to use, put it in `public/images/` and set `image` on the
matching entry in `moments` (e.g. `image: '/images/2022-final.jpg'`). The `imageAlt` text is used as its alt text.

## Accessibility

- Semantic landmarks, headings and a skip link; carousel and filters are keyboard-operable.
- Every chart has a "View as table" fallback.
- `prefers-reduced-motion` is respected: Framer Motion uses `reducedMotion="user"`, parallax and
  count-up animations are skipped, and CSS transitions are cut.

Stats verified on 2026-09-25. This is an unofficial fan project, not affiliated with Lionel Messi or any club, federation or brand.
