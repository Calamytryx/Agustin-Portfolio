/* =========================================================
   PORTFOLIO CONTENT
   Everything you're likely to edit lives in this file.
   No build step — just change the values and reload/redeploy.
   Leave a field as an empty string "" to hide it (e.g. no link yet).
   ========================================================= */

const PORTFOLIO = {

  // ---- Hero / identity -------------------------------------------------
  name: "Winston Lachaona Agustin",
  role: "Backend Developer",
  subline: "BS Computer Science, LPU-Cavite (Aug 2026) · Cavite, Philippines",

  terminalLines: [
    { prompt: "$ whoami", output: "Winston Agustin — Backend Developer" },
    { prompt: "$ status", output: "open to opportunities · graduating 2026-08-19" },
  ],

  // Shown as text links under the hero. Empty href = not rendered.
  // `icon` is an Iconify name like `simple-icons:github` or `lucide:mail`.
  // Leave "" or omit for no icon — the label still renders fine on its own.
  links: [
    { label: "Email", href: "mailto:winstonagustin.ih@gmail.com", icon: "lucide:mail" },
    { label: "GitHub", href: "https://github.com/Calamytryx", icon: "simple-icons:github" },
    { label: "Resume", href: "Winston_Agustin_Resume.pdf", icon: "lucide:file-text", download: "Winston_Agustin_Resume.pdf" },
    { label: "LinkedIn", href: "", icon: "simple-icons:linkedin" }, // EDIT ME: add your LinkedIn URL.
  ],

  heroImages: [
    { src: "AGUSTIN, WINSTON -- FORMAL.jpg", alt: "Formal portrait of Winston Agustin" },
    { src: "AGUSTIN, WINSTON -- BARONG.jpg", alt: "Barong portrait of Winston Agustin" },
    { src: "AGUSTIN, WINSTON -- TOGA.jpg", alt: "Graduation portrait of Winston Agustin" },
  ],

  // Live GitHub projects. main.js fetches these on load, sorts them by
  // recently updated, shows stars, and caches the JSON locally so the site
  // still has something to render if GitHub is slow or offline.
  githubProjects: {
    username: "Calamytryx",
    perPage: 12,
    includeForks: false,
    includeArchived: false,
    cacheKey: "calamytryx-github-projects",
  },

  // ---- Experience --------------------------------------------------------
  experience: [
    {
      title: "Backend Developer (Trainee)",
      org: "Leentech Network Solutions",
      date: "Jun 2024 – Aug 2024",
      bullets: [
        "Built and deployed Startup Lab Academy, an e-learning platform, using CodeIgniter, MySQL, and cPanel.",
        "Owned backend development, system integration, debugging, and testing.",
        "Shipped personalized dashboards, instructor management, and admin controls.",
      ],
    },
  ],

  // ---- Projects -----------------------------------------------------------
  projects: [
    {
      title: "ATLAS",
      tags: "Thesis · PHP · MySQL · Genetic Algorithm · Gemini API",
      icons: ["simple-icons:php", "simple-icons:mysql", "simple-icons:googlegemini"],
      desc: "Automated Thesis Launch and Assessment Scheduler. Schedules thesis defenses with a genetic-algorithm optimizer and integrates the Gemini API for AI-assisted evaluation support. Built with 3 groupmates, advised by Sean Charlston Gono.",
      href: "https://atlas.iceiy.com",
    },
    {
      title: "Tūī (contributor)",
      tags: "Kotlin · Android · Open Source",
      icons: ["simple-icons:kotlin"],
      desc: "Privacy-first local music player with no metadata, no tracking, no network calls. Contributed playback notifications, expanded audio format support, and collapsible library folder headers.",
      href: "https://github.com/rama-io/tui",
    },
    {
      title: "Mako-KDE",
      tags: "KDE Plasma · Python",
      icons: ["simple-icons:kde"],
      desc: "Text-based app launcher widget for KDE Plasma — clock, battery, power controls, and dynamic XDG app-group scanning via a Python backend.",
      href: "", // EDIT ME: add repo link once published
    },
    {
      title: "MineLauncher",
      tags: "KDE Plasma · Widget",
      icons: ["simple-icons:kde"],
      desc: "KDE Plasma widget for launching and managing a Minecraft server instance. 26 stars on GitHub.",
      href: "", // EDIT ME: add repo link
    },
  ],

  // ---- Skills ---------------------------------------------------------------
  // Each item can be a plain string ("ADB") or { name, icon } to pull an icon
  // from Iconify. No icon for something? Just use the plain string form — it
  // renders fine without one.
  skills: [
    {
      group: "Languages",
      items: [
        { name: "PHP", icon: "simple-icons:php" },
        { name: "Python", icon: "simple-icons:python" },
        "C#",
        { name: "Kotlin", icon: "simple-icons:kotlin" },
        { name: "HTML", icon: "simple-icons:html5" },
        { name: "CSS", icon: "simple-icons:css3" },
        { name: "MySQL", icon: "simple-icons:mysql" },
      ],
    },
    {
      group: "Backend & Systems",
      items: [
        { name: "CodeIgniter", icon: "simple-icons:codeigniter" },
        { name: "MySQL", icon: "simple-icons:mysql" },
        "Linux/Windows Administration",
        "Cloud Fundamentals (AWS)",
      ],
    },
    {
      group: "Tooling",
      items: [
        { name: "Git", icon: "simple-icons:git" },
        { name: "Arch Linux", icon: "simple-icons:archlinux" },
        { name: "Windows", icon: "simple-icons:windows" },
        { name: "KDE Plasma", icon: "simple-icons:kde" },
        { name: "Android Studio", icon: "simple-icons:androidstudio" },
        "ADB",
      ],
    },
  ],

  // ---- Education --------------------------------------------------------------
  education: [
    {
      title: "BS Computer Science",
      org: "Lyceum of the Philippines University – Cavite",
      date: "Aug 2026",
      bullets: [],
    },
    {
      title: "STEM, Senior High School",
      org: "Lyceum of the Philippines University – Cavite",
      date: "Aug 2021",
      bullets: [],
    },
  ],

  certifications: [
    { name: "Cloud Foundations — Great Learning", date: "2024" },
    { name: "AWS for Beginners — Great Learning", date: "2024" },
    { name: "AWS Project — Great Learning", date: "2024" },
    { name: "HTML and CSS (IT Specialist)", date: "2024" },
    { name: "Operating Systems Basics — Cisco Networking Academy", date: "2024" },
    { name: "SAP Business One — FIT Academy", date: "2023" },
  ],

  achievements: [
    "Graduated with Honors, Senior High School — LPU-Cavite",
    "Technical Manager, Student Association for Technological Advancement (SY 2023–2024)",
    "COECSA Achiever of the Year, Academics — LPU-Cavite, 2024",
  ],

  // ---- Contact ------------------------------------------------------------
  contactLede: "Based in Cavite, Philippines. Open to on-site, remote, and hybrid opportunities. Reach out via email",
  contactLinks: [
    { label: "winstonagustin.ih@gmail.com", href: "mailto:winstonagustin.ih@gmail.com", icon: "lucide:mail" },
    { label: "github.com/Calamytryx", href: "https://github.com/Calamytryx", icon: "simple-icons:github" },
  ],
};
