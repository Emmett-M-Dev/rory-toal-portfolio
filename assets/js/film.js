(function () {
  const $ = (id) => document.getElementById(id);
  const slug = new URLSearchParams(location.search).get("f");
  const index = FILMS.findIndex((f) => f.slug === slug);

  if (index === -1) {
    $("film").innerHTML = `
      <div class="missing">
        <h1>That film isn't in the programme</h1>
        <p>The link may be out of date. <a href="./#films">See all films</a>.</p>
      </div>`;
    document.title = "Film not found, Rory Toal";
    $("year").textContent = new Date().getFullYear();
    return;
  }

  const film = FILMS[index];
  document.title = `${film.title} (${film.year}), Rory Toal`;

  /* Player: show the poster first, load the video only when asked */
  $("posterImg").src = posterFor(film);
  $("posterImg").alt = `Still from ${film.title}`;
  $("playText").textContent = `Play ${film.title}, ${film.runtime}`;
  $("playBtn").addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.src = embedUrl(film.video, { autoplay: true });
    f.title = film.title;
    f.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    f.allowFullscreen = true;
    $("player").replaceChildren(f);
    f.focus();
  });

  $("title").textContent = film.title;
  $("logline").textContent = film.logline;
  $("synopsis").textContent = film.synopsis;

  const facts = [
    ["Year", film.year], ["Runtime", film.runtime], ["My role", film.role],
    ["Genre", film.genre], ["Format", film.format]
  ];
  $("facts").innerHTML = facts
    .filter(([, v]) => v)
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("");

  const laurels = $("laurels");
  if (film.festivals && film.festivals.length) {
    laurels.innerHTML = film.festivals.map((f) => `<li>${f}</li>`).join("");
  } else laurels.remove();

  if (film.footageCredit) $("footageCredit").textContent = film.footageCredit;
  else $("footageCredit").remove();

  $("filmCredits").innerHTML = film.credits
    .map(([job, name]) => `<div><dt>${job}</dt><dd>${name}</dd></div>`)
    .join("");

  /* Previous / next, wrapping round the list */
  const prev = FILMS[(index - 1 + FILMS.length) % FILMS.length];
  const next = FILMS[(index + 1) % FILMS.length];
  $("prevFilm").href = `film.html?f=${prev.slug}`;
  $("prevFilm").innerHTML = `<span>Previous</span>${prev.title}`;
  $("nextFilm").href = `film.html?f=${next.slug}`;
  $("nextFilm").innerHTML = `<span>Next</span>${next.title}`;

  $("year").textContent = new Date().getFullYear();
})();
