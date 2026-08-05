# Agustin Portfolio

Personal portfolio for Winston Agustin.

This site is plain HTML, CSS, and JavaScript. No build step.

## What’s here

- `index.html` for the page structure.
- `style.css` for the visual style.
- `data.js` for the content.
- `main.js` for rendering and live GitHub project loading.

## Notes

- GitHub projects are pulled automatically, sorted by recently updated, and show star counts.
- Icons are loaded from Iconify.
- The hero image is chosen at random from the uploaded portraits.
- The resume links to the local PDF in the repo.

## Automation

GitHub Actions refreshes `projects.json` on a schedule and commits the updated snapshot back to the repo, so the portfolio stays current without manual edits.

## Local run

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.
