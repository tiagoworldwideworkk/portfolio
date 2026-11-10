# ONESTESIA® — Experimental Portfolio Starter

A custom experimental portfolio built with **plain HTML, CSS and JavaScript**. No paid tools, dependencies, build step, templates, accounts, or tracking scripts required. Works with free GitHub Pages hosting.

## 1. Open locally

Double-click `index.html` in Finder. For better editing, open this folder in VS Code and use the Live Server extension (optional).

## 2. Add your artworks

Put your `.webp`, `.jpg`, `.png`, and `.mp4` files into `assets/`.

Open **projects.js** and replace every sample project with your work:

```js
{
  id: '01',
  title: 'My Motion Film',
  category: 'motion',  // motion | film | 3d | identity
  year: '2026',
  subtitle: 'Audiovisual experiments',
  description: 'A few sentences about concept, process, and results.',
  tags: ['AFTER EFFECTS', 'SOUND', 'ART DIRECTION'],
  art: 1,  // fallback visual if there is no image
  image: 'assets/my-film-cover.webp',
  video: 'assets/my-film.mp4',
  link: 'https://vimeo.com/your-video'
}
```

`image` is the thumbnail in the gallery. `video` plays inside the full project view with controls. If you don't want to host large video files, put the video on YouTube/Vimeo and supply a `link` instead. Use an exported still frame as `image`.

**Remove all sample projects before going live.** The built-in project titles/descriptions are mock content, not claims about completed work.

## 3. Add your email

Find `contactEmail: 'yourname@example.com'` in **projects.js** and replace it with your real email. The contact CTA is intentionally inactive until you do that, to avoid accidentally directing visitors to a placeholder address.

## 4. Change the visual identity

In **style.css**, edit these CSS variables at the top:

```css
:root {
  --bg: #11120f;
  --ink: #f0f0e7;
  --accent: #d6fe51;
  --dim: #a0a197;
}
```

The primary typography uses Google Fonts online. It falls back to fonts available on the visitor's device when offline. You can replace them with your own legally licensed fonts.

In **index.html**, edit the hero title, descriptions, About statement, and footer copy.

## 5. Publish free on GitHub Pages

1. Create a free GitHub account if needed.
2. Create a new **public** repository, e.g. `experimental-portfolio`.
3. Upload `index.html`, `style.css`, `script.js`, `projects.js`, and the entire `assets` folder to the repository **root**.
4. Open repository **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**; choose `main` and `/ (root)`; then Save.
6. GitHub will show the published website URL when deployment finishes. A project repo is generally at `https://USERNAME.github.io/experimental-portfolio/`.

**Do not upload the outer ZIP as a single item**; upload the files from inside it.

## Optional free visual workflow

- Figma (free Starter): sketch homepage, grid, typography, and responsive layouts.
- VS Code (free): edit the live code.
- After Effects/Blender: export stills and short compressed video loops from your creative projects.
- GitHub Pages (free for public repositories): host the site.

## Accessibility and performance

- Responsive layouts for phones and desktops.
- Projects open as keyboard-accessible native dialogs; press Escape to close.
- Honors the user's reduced-motion preference.
- Does not embed third-party analytics or collect personal data.
- Best performance: optimize WebP thumbnails (e.g. under 300–600 KB) and avoid hosting huge original video exports directly in your repo.

## What is intentionally not included

- A CMS/editor for non-coders: edit `projects.js` directly.
- Contact form backend: uses a mailto link.
- Actual portfolio photographs or videos: add your own files.
- An automatic generator for visual assets: the abstract placeholder artwork is CSS and should be replaced before publication.