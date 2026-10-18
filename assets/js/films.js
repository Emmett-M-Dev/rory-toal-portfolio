/*
  THE PROGRAMME
  -------------
  Every film on the site comes from this list. To add a film, copy one
  block, change the details, and save. The homepage list and the film's
  own page both update automatically. Order here = order on the site.

  video.source : "youtube" or "vimeo"
  video.id     : the ID from the video's URL
                 youtube.com/watch?v=THIS_PART   or   vimeo.com/THIS_PART
  poster       : optional image path. If left out, the YouTube thumbnail is used
                 (Vimeo films need a poster image, e.g. "assets/img/thaw.jpg").

  SAMPLE BUILD: every film below is a placeholder. The footage is from
  Blender Studio's open movies (Creative Commons Attribution), credited
  on each film's page via the `footageCredit` field. Delete that field
  once real films go in.
*/

const SITE = {
  name: "Rory Toal",
  tagline: "Director and editor",
  email: "rory@example.com",
  reel: { source: "youtube", id: "R6MlUcmOul8", start: 150 },
  links: [
    { label: "Vimeo", url: "#" },
    { label: "IMDb", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Instagram", url: "#" }
  ],
  cv: "assets/rory-toal-cv.pdf"
};

const FILMS = [
  {
    slug: "static",
    title: "Static",
    year: 2026,
    runtime: "12 min",
    role: "Writer, director",
    genre: "Science fiction",
    format: "Digital, 2.39:1",
    logline: "A crew of engineers tries to rewrite one bad memory before it rewrites them.",
    synopsis: "Shot over four nights in a disused warehouse with a crew of nine, Static was my graduation film. I wanted to make something on a student budget that still felt big, so most of the scale comes from practical light, smoke and sound rather than effects.",
    festivals: ["Official selection, sample festival 2026", "Best student short (placeholder)"],
    credits: [
      ["Written and directed by", "Rory Toal"],
      ["Producer", "Name Surname"],
      ["Director of photography", "Name Surname"],
      ["Editor", "Rory Toal"],
      ["Sound design", "Name Surname"]
    ],
    video: { source: "youtube", id: "R6MlUcmOul8" },
    footageCredit: "Placeholder footage: Tears of Steel, Blender Foundation (CC BY)"
  },
  {
    slug: "thaw",
    title: "Thaw",
    year: 2025,
    runtime: "8 min",
    role: "Director, editor",
    genre: "Fantasy, animation",
    format: "Digital, 2.39:1",
    logline: "A shepherd girl and her dog follow the end of winter up a mountain.",
    synopsis: "A short about letting a season go. Placeholder copy: this is where Rory describes what the film is, how it was made, and what he was responsible for on it.",
    festivals: [],
    credits: [
      ["Directed by", "Rory Toal"],
      ["Editor", "Rory Toal"],
      ["Music", "Name Surname"]
    ],
    video: { source: "youtube", id: "WhWc3b3KhnY" },
    footageCredit: "Placeholder footage: Spring, Blender Studio (CC BY)"
  },
  {
    slug: "last-wash",
    title: "Last Wash",
    year: 2025,
    runtime: "12 min",
    role: "Editor",
    genre: "Dark comedy",
    format: "Digital, 2.39:1",
    logline: "A sheep on the edge meets a salesman who offers him every other life.",
    synopsis: "Placeholder copy. For films where Rory wasn't the director, this is a good spot to say exactly what his part was: the edit, the colour, the sound, and anything he's proud of in it.",
    festivals: ["Placeholder festival laurel"],
    credits: [
      ["Director", "Name Surname"],
      ["Editor", "Rory Toal"],
      ["Producer", "Name Surname"]
    ],
    video: { source: "youtube", id: "Y-rmzh0PI3c" },
    footageCredit: "Placeholder footage: Cosmos Laundromat, Blender Institute (CC BY)"
  },
  {
    slug: "embers",
    title: "Embers",
    year: 2024,
    runtime: "15 min",
    role: "Director of photography",
    genre: "Fantasy drama",
    format: "Digital, 2.39:1",
    logline: "A young woman searches a frozen world for the dragon she raised.",
    synopsis: "Placeholder copy. A cinematography credit is a chance to talk about lighting choices, lenses and the look of the film.",
    festivals: [],
    credits: [
      ["Director", "Name Surname"],
      ["Director of photography", "Rory Toal"],
      ["Editor", "Name Surname"]
    ],
    video: { source: "youtube", id: "eRsGyueVLvQ" },
    footageCredit: "Placeholder footage: Sintel, Blender Foundation (CC BY)"
  },
  {
    slug: "cover-story",
    title: "Cover Story",
    year: 2024,
    runtime: "4 min",
    role: "Editor, colourist",
    genre: "Action comedy",
    format: "Digital, 2.39:1",
    logline: "An undercover agent's disguise holds up for exactly one haircut.",
    synopsis: "Placeholder copy for a short, fast-cut piece.",
    festivals: [],
    credits: [
      ["Director", "Name Surname"],
      ["Editor and colourist", "Rory Toal"]
    ],
    video: { source: "youtube", id: "mN0zPOpADL4" },
    footageCredit: "Placeholder footage: Agent 327, Blender Animation Studio (CC BY)"
  },
  {
    slug: "meadow",
    title: "Meadow",
    year: 2023,
    runtime: "10 min",
    role: "Assistant director",
    genre: "Comedy",
    format: "Digital, 16:9",
    logline: "A gentle giant takes revenge on three bullies, one prank at a time.",
    synopsis: "Placeholder copy for a first-year film.",
    festivals: [],
    credits: [
      ["Director", "Name Surname"],
      ["Assistant director", "Rory Toal"]
    ],
    video: { source: "youtube", id: "aqz-KE-bpKQ" },
    footageCredit: "Placeholder footage: Big Buck Bunny, Blender Foundation (CC BY)"
  }
];

/* Credits roll on the homepage: jobs and set experience */
const CREDITS = [
  ["Camera trainee", "Untitled feature, 2025 (placeholder)"],
  ["Runner", "TV drama, 2025 (placeholder)"],
  ["Editor", "Music video for a local band, 2024 (placeholder)"],
  ["Camera operator", "University events team, 2023 to 2026 (placeholder)"]
];

/* Helpers used by both pages */
function posterFor(film) {
  if (film.poster) return film.poster;
  if (film.video.source === "youtube") return `https://i.ytimg.com/vi/${film.video.id}/maxresdefault.jpg`;
  return "";
}

/* Some YouTube videos have no full-size thumbnail (YouTube serves a tiny
   120px grey placeholder instead). Swap those for the standard-size one. */
document.addEventListener("load", (e) => {
  const img = e.target;
  if (img.tagName === "IMG" && img.src.includes("/maxresdefault.jpg") && img.naturalWidth <= 120) {
    img.src = img.src.replace("maxresdefault", "hqdefault");
  }
}, true);

function embedUrl(video, opts = {}) {
  const autoplay = opts.autoplay ? 1 : 0;
  if (video.source === "vimeo") {
    const bg = opts.background ? "&background=1" : "";
    return `https://player.vimeo.com/video/${video.id}?autoplay=${autoplay}&dnt=1${bg}`;
  }
  const params = new URLSearchParams({ autoplay, rel: 0, modestbranding: 1, playsinline: 1 });
  if (opts.background) {
    params.set("mute", 1); params.set("controls", 0); params.set("loop", 1);
    params.set("playlist", video.id); params.set("disablekb", 1);
  }
  if (video.start) params.set("start", video.start);
  return `https://www.youtube-nocookie.com/embed/${video.id}?${params}`;
}
