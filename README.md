# Rory Toal — portfolio

A film portfolio site: showreel, three featured films (each with its own page), a strip of social media edits, about, credits and contact. Plain HTML, CSS and JavaScript, so there's no build step. Push to GitHub and it's live on GitHub Pages.

**This is a sample build.** The films, bio and credits are placeholders, and the footage comes from Blender Studio's open movies (Creative Commons Attribution).

## How it's organised

```
index.html            homepage: reel, films, social edits, about, credits, contact
film.html             one template for every film (film.html?f=static)
assets/js/films.js    THE PROGRAMME: films, social clips, the reel, contact links
assets/js/main.js     homepage behaviour
assets/js/film.js     film page behaviour
assets/css/style.css  the look
assets/rory-toal-cv.pdf
```

## Adding or changing a film

Open `assets/js/films.js`, copy one of the film blocks, and edit it. The homepage list and the film's own page update themselves. Films can come from YouTube or Vimeo:

```js
video: { source: "vimeo", id: "123456789" },
poster: "assets/img/my-film.jpg"   // needed for Vimeo; optional for YouTube
```

Host the films on Vimeo or YouTube, not in this repository. GitHub isn't built to serve video.

## Adding a social clip

In the same file, copy a block in `CLIPS`. Clips can be YouTube Shorts, Vimeo, Instagram Reels or TikToks. Set `vertical: true` for 9:16 clips so the player opens portrait, and give Instagram/TikTok clips a `poster` image (a screenshot is fine).

## Going live under Rory's account

1. Rory creates a GitHub account.
2. He creates a repository named `<his-username>.github.io` and uploads these files (or this repo is transferred to him).
3. Settings → Pages → Deploy from branch → `main`, folder `/ (root)`.
4. The site appears at `https://<his-username>.github.io`.
5. Before sharing it: replace the placeholder content, delete the `footageCredit` lines, and remove the `<meta name="robots" content="noindex">` line from both HTML files so search engines can find it.

## Checklist before launch

- [ ] Real films, posters and showreel in `films.js`
- [ ] Bio, education, kit and credits in `index.html` / `films.js`
- [ ] Real CV at `assets/rory-toal-cv.pdf`
- [ ] Email and social links in `films.js`
- [ ] Remove the sample note from `index.html`
- [ ] Remove `noindex` from both HTML files
