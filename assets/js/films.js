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
  }
];

/*
  SOCIAL EDITS
  ------------
  Short-form editing work: reels, TikToks, YouTube Shorts.

  video.source : "youtube" (Shorts too), "vimeo", "instagram" or "tiktok"
                 instagram.com/reel/THIS_PART     tiktok.com/@user/video/THIS_PART
  vertical     : true for 9:16 clips, so the player opens portrait
  poster       : needed for Instagram and TikTok clips (a screenshot works)
  stat         : optional, e.g. "120k views"

  SAMPLE BUILD: these placeholders are landscape Blender Studio clips, so
  they open landscape. Rory's real reels will set vertical: true.
*/
const CLIPS = [
  {
    title: "Opening night teaser",
    client: "Placeholder theatre company",
    platform: "Instagram Reel",
    role: "Edit, captions, sound",
    stat: "Placeholder: 24k views",
    video: { source: "youtube", id: "eRsGyueVLvQ", start: 300 },
    vertical: false
  },
  {
    title: "Barbershop launch",
    client: "Placeholder local business",
    platform: "TikTok",
    role: "Edit, colour",
    stat: "Placeholder: 61k views",
    video: { source: "youtube", id: "mN0zPOpADL4", start: 60 },
    vertical: false
  },
  {
    title: "Festival recap",
    client: "Placeholder music festival",
    platform: "YouTube Short",
    role: "Shot and edited",
    stat: "",
    video: { source: "youtube", id: "aqz-KE-bpKQ", start: 120 },
    vertical: false
  },
  {
    title: "Behind the scenes",
    client: "Static, my graduation film",
    platform: "Instagram Reel",
    role: "Edit, motion graphics",
    stat: "",
    video: { source: "youtube", id: "R6MlUcmOul8", start: 400 },
    vertical: false
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
  if (video.source === "instagram") return `https://www.instagram.com/reel/${video.id}/embed`;
  if (video.source === "tiktok") return `https://www.tiktok.com/embed/v2/${video.id}`;
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
