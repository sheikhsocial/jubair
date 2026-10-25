# Jubair Md Ariful Islam (王子) · Jiangsu Provincial Scholarship Defense

Category A scholarship defense for the School of International Education, Huai'an University.
11 slides, two formats from the same content and photos:

| Format | File | Best for |
|---|---|---|
| Animated web deck | `index.html` | Presenting from a browser or a link (staggered reveals, count-up score, animated bars, slow photo zoom) |
| PowerPoint | `pptx/Jubair_Jiangsu_Scholarship_Defense_Premium.pptx` | The classroom PC (fade transitions, speaker notes) |

## Present the web deck
Open `index.html` (double-click) or serve it. **→ / Space** next · **←** back · **F** fullscreen · **N** speaker notes · tap/swipe on touch screens.
Deep links work: `index.html#4` opens slide 4. Printing to PDF (Ctrl+P, "Background graphics" on) gives a flat copy.

## Publish on GitHub Pages
1. Create a repo and push this folder.
2. Settings → Pages → Source: **GitHub Actions** (the included workflow deploys on every push to `main`).
3. Share `https://<user>.github.io/<repo>/`.

> Pages on a free account needs a **public** repo. The HSK image is cropped to the score tables only (no certificate number, ID photo or admission-ticket numbers). Do not commit the original JPGs or the application form (passport and student ID).

## Rebuild
```bash
pip install pillow && python tools/prep_images.py ./originals     # crops photos into assets/img
npm i pptxgenjs react react-dom react-icons sharp
node pptx/build_deck.js                                            # writes the .pptx (+ fade transitions)
```
Edit text in `index.html` (web) and `pptx/build_deck.js` (PowerPoint). Speaker notes live in the `NOTES` array and in each slide's `addNotes`.
