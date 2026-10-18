(function () {
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function store(get, key, value) {
    try {
      if (get) return sessionStorage.getItem(key);
      sessionStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* ---------- Opening countdown (once per visit) ---------- */
  const leader = $("leader");
  function endLeader() {
    if (!leader || leader.classList.contains("done")) return;
    leader.classList.add("done");
    document.body.classList.add("rolling");
    store(false, "leaderSeen", "1");
    setTimeout(() => leader.remove(), 700);
  }
  if (leader) {
    if (reduceMotion || store(true, "leaderSeen")) {
      leader.remove();
      document.body.classList.add("rolling", "no-intro");
    } else {
      const num = $("leaderNum");
      let n = 3;
      const tick = setInterval(() => {
        n -= 1;
        if (n <= 0) { clearInterval(tick); endLeader(); return; }
        num.textContent = n;
        num.parentElement.classList.remove("sweep");
        void num.offsetWidth;
        num.parentElement.classList.add("sweep");
      }, 800);
      leader.querySelector(".leader-frame").classList.add("sweep");
      ["click", "keydown", "touchstart"].forEach((ev) =>
        window.addEventListener(ev, () => { clearInterval(tick); endLeader(); }, { once: true, passive: true })
      );
    }
  }

  /* ---------- Hero reel (muted, looping background) ---------- */
  const heroMedia = $("heroMedia");
  heroMedia.style.backgroundImage = `url("${posterFor({ video: SITE.reel })}")`;
  if (!reduceMotion) {
    const f = document.createElement("iframe");
    f.src = embedUrl(SITE.reel, { autoplay: true, background: true });
    f.title = "Showreel (muted background)";
    f.allow = "autoplay; encrypted-media";
    f.tabIndex = -1;
    f.addEventListener("load", () => setTimeout(() => heroMedia.classList.add("playing"), 1200));
    heroMedia.appendChild(f);
  }
  $("heroSub").textContent = SITE.tagline;

  /* ---------- Player dialog ---------- */
  const screen = $("screen");
  const frame = $("screenFrame");
  function openScreen(video, opts = {}) {
    frame.innerHTML = "";
    screen.classList.toggle("vertical", !!opts.vertical);
    screen.setAttribute("aria-label", opts.title || "Showreel");
    const f = document.createElement("iframe");
    f.src = embedUrl({ ...video, start: video.start || 0 }, { autoplay: true });
    f.title = opts.title || "Showreel";
    f.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    f.allowFullscreen = true;
    frame.appendChild(f);
    screen.showModal();
  }
  function closeScreen() { screen.close(); }
  screen.addEventListener("close", () => { frame.innerHTML = ""; });
  screen.addEventListener("click", (e) => { if (e.target === screen) closeScreen(); });
  $("screenClose").addEventListener("click", closeScreen);
  $("watchReel").addEventListener("click", () => openScreen({ ...SITE.reel, start: 0 }));

  /* ---------- Filmography ---------- */
  const list = $("filmList");
  const monitorImg = $("monitorImg");
  const monitorCap = $("monitorCap");
  function showOnMonitor(film) {
    monitorImg.src = posterFor(film);
    monitorCap.textContent = `${film.title}, ${film.year}`;
  }
  FILMS.forEach((film, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a class="film-row" href="film.html?f=${encodeURIComponent(film.slug)}">
        <span class="film-year">${film.year}</span>
        <span class="film-title">${film.title}</span>
        <span class="film-meta">${film.role}<br>${film.runtime}</span>
        <img class="film-thumb" src="${posterFor(film)}" alt="" loading="lazy">
      </a>`;
    const a = li.firstElementChild;
    a.addEventListener("mouseenter", () => showOnMonitor(film));
    a.addEventListener("focus", () => showOnMonitor(film));
    list.appendChild(li);
    if (i === 0) showOnMonitor(film);
  });

  $("aboutImg").src = posterFor(FILMS[0]);

  /* ---------- Social edits ---------- */
  const strip = $("clipStrip");
  CLIPS.forEach((clip) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="clip" type="button">
        <span class="clip-frame">
          <img src="${posterFor(clip)}" alt="" loading="lazy">
          <span class="clip-platform">${clip.platform}</span>
          <span class="clip-play" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg></span>
        </span>
        <span class="clip-title">${clip.title}</span>
        <span class="clip-meta">${clip.client}<br>${clip.role}${clip.stat ? `<br><span class="clip-stat">${clip.stat}</span>` : ""}</span>
      </button>`;
    li.firstElementChild.addEventListener("click", () =>
      openScreen(clip.video, { vertical: clip.vertical, title: clip.title })
    );
    strip.appendChild(li);
  });

  /* ---------- Credits roll ---------- */
  const roll = $("creditsRoll");
  CREDITS.forEach(([job, production]) => {
    const row = document.createElement("div");
    row.innerHTML = `<dt>${job}</dt><dd>${production}</dd>`;
    roll.appendChild(row);
  });

  /* ---------- End card ---------- */
  const email = $("endEmail");
  email.href = `mailto:${SITE.email}`;
  email.textContent = SITE.email;
  $("cvLink").href = SITE.cv;
  const links = $("endLinks");
  SITE.links.forEach((l) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${l.url}" rel="noopener">${l.label}</a>`;
    links.appendChild(li);
  });
  $("year").textContent = new Date().getFullYear();

  /* ---------- Sample note ---------- */
  const note = $("sampleNote");
  if (store(true, "noteHidden")) note.remove();
  else $("sampleClose").addEventListener("click", () => { note.remove(); store(false, "noteHidden", "1"); });
})();
