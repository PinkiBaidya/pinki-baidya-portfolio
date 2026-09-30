export const profile = {
  name: "Pinki Baidya",
  firstName: "Pinki",
  brand: "Full-Stack Developer",
  role: "Full-Stack Web Developer",
  email: "pinkibaidyaeu@gmail.com",
  phone: "+36 70 394 4095",
  phoneRaw: "+36703944095",
  location: "Budapest, Hungary",
  availability: "Open to internships & junior developer roles",
  tagline: "I turn ideas into clean, reliable and maintainable web applications.",
  heroLine1: "I build",
  heroLine2: "reliable",
  heroLine3: "Web Apps",
  bio: "I'm a Computer Science student at Óbuda University in Budapest with strong programming skills in Java, Python, C#, JavaScript and SQL, backed by hands-on software development and database projects. I'm an analytical problem solver who cares about building efficient, reliable and maintainable solutions — always learning new technologies to meet real project requirements and ready to contribute to a professional development team.",
};

export const stats = [
  { value: "4.2/5", label: "CGPA at Óbuda University" },
  { value: "500+", label: "Coding exercises completed" },
  { value: "2", label: "Full-stack projects built" },
  { value: "5", label: "Professional certifications" },
];

export const skills = [
  "Python",
  "Java",
  "C#",
  "JavaScript",
  "SQL",
  "ASP.NET Core",
  "HTML",
  "CSS",
  "React",
  "MongoDB",
  "SQLite",
  "Git / GitHub",
];

export const experiences = [
  {
    role: "Full-Stack Web Development Certification",
    company: "freeCodeCamp",
    period: "2025 — 2026",
    location: "Online · Professional Certification",
    description:
      "Completed a comprehensive full-stack curriculum covering responsive web design, front-end and back-end development, databases and APIs — finishing 500+ coding exercises and projects along the way.",
    stack: ["HTML", "CSS", "JavaScript", "React", "Python", "SQL", "APIs"],
  },
  {
    role: "Independent Web Development Practice",
    company: "The Odin Project",
    period: "Mar 2025 — May 2025",
    location: "Online · Foundations",
    description:
      "Built responsive web pages with HTML, CSS and Flexbox, added interactivity through JavaScript and DOM manipulation, and practised Git/GitHub workflows, debugging and structured problem solving.",
    stack: ["HTML", "CSS", "JavaScript", "Git/GitHub"],
  },
];

export const skillGroups = [
  {
    icon: "ri-code-s-slash-line",
    title: "Programming Languages",
    description: "Clean, readable code across multiple paradigms.",
    skills: [
      { name: "Python", level: 88 },
      { name: "Java", level: 82 },
      { name: "C#", level: 80 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    icon: "ri-stack-line",
    title: "Software Development",
    description: "OOP, algorithms and API-driven application design.",
    skills: [
      { name: "OOP", level: 85 },
      { name: "Data Structures & Algorithms", level: 80 },
      { name: "ASP.NET Core", level: 78 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    icon: "ri-global-line",
    title: "Web Technologies",
    description: "Responsive, accessible interfaces for every screen.",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 86 },
      { name: "Responsive Design", level: 84 },
      { name: "Accessibility", level: 80 },
    ],
  },
  {
    icon: "ri-database-2-line",
    title: "Databases",
    description: "Relational and document modelling, from schema to query.",
    skills: [
      { name: "SQL", level: 82 },
      { name: "SQLite", level: 78 },
      { name: "MongoDB", level: 76 },
      { name: "Schema Design", level: 78 },
    ],
  },
  {
    icon: "ri-tools-line",
    title: "Tools & Platforms",
    description: "Everyday tooling for modern development workflows.",
    skills: [
      { name: "Git / GitHub", level: 86 },
      { name: "Linux", level: 74 },
      { name: "LaTeX", level: 72 },
      { name: "Docker & Kubernetes", level: 66 },
    ],
  },
  {
    icon: "ri-cloud-line",
    title: "Cloud",
    description: "How apps are deployed, scaled and secured in the cloud.",
    skills: [
      { name: "Microsoft Azure", level: 68 },
      { name: "AWS", level: 65 },
      { name: "Cloud Deployment", level: 66 },
      { name: "CI/CD Basics", level: 62 },
    ],
  },
];

export const projects = [
  {
    title: "STUDENTPortal",
    category: "Web Application",
    period: "Apr 2026 — May 2026",
    description:
      "A full-stack student management web application built with ASP.NET, C# and SQLite, featuring secure authentication and full CRUD for student records through a structured web interface.",
    image:
      "https://readdy.ai/api/search-image?query=student%20management%20web%20application%20dashboard%20interface%20mockup%20with%20record%20tables%20and%20student%20profile%20cards%20on%20a%20dark%20screen%2C%20clean%20modern%20ui%20design%2C%20soft%20studio%20lighting%2C%20high%20detail&width=800&height=560&seq=portfolio-project-studentportal-01&orientation=landscape",
    tags: ["ASP.NET", "C#", "SQLite"],
  },
  {
    title: "UniLibrary",
    category: "Desktop Application",
    period: "Mar 2025 — Aug 2025",
    description:
      "A C#/.NET Windows Forms library management system handling students, books, librarians and circulation, with issuing, returning and availability tracking backed by SQL Server.",
    image:
      "https://readdy.ai/api/search-image?query=library%20management%20system%20desktop%20application%20interface%20mockup%20with%20book%20catalogue%20grid%20and%20dashboard%20panels%20on%20a%20dark%20screen%2C%20clean%20modern%20ui%20design%2C%20soft%20lighting%2C%20high%20detail&width=800&height=560&seq=portfolio-project-unilibrary-02&orientation=landscape",
    tags: ["C#", ".NET", "SQL Server"],
  },
];

export const certifications = [
  {
    title: "Foundational C# with Microsoft",
    issuer: "freeCodeCamp",
    icon: "ri-code-s-slash-line",
  },
  {
    title: "Docker & Kubernetes",
    issuer: "Udemy",
    icon: "ri-stack-line",
  },
  {
    title: "MongoDB",
    issuer: "Simplilearn",
    icon: "ri-database-2-line",
  },
  {
    title: "Mastering Web Design",
    issuer: "Udemy",
    icon: "ri-palette-line",
  },
  {
    title: "Java",
    issuer: "SoloLearn",
    icon: "ri-cup-line",
  },
];

export const education = [
  {
    degree: "B.Sc. Computer Science Engineering",
    school: "Óbuda University",
    faculty: "John von Neumann Faculty of Informatics",
    period: "Sep 2023 — Feb 2027",
    location: "Budapest, Hungary",
    detail: "Specialization: Cloud Service Technologies & IT Security",
    score: "CGPA 4.2 / 5",
  },
  {
    degree: "B.Sc. Mathematics Honours",
    school: "University of Calcutta",
    faculty: "Sammilani Mahavidyalaya",
    period: "Jun 2018 — Sep 2021",
    location: "Kolkata, India",
    detail: "Focus: Probability & Statistics with Applied Mathematics",
    score: "CGPA 7.7 / 10",
  },
];

export const socialLinks = [
  { label: "LinkedIn", icon: "ri-linkedin-fill", url: "https://www.linkedin.com/in/pinki-baidya" },
  { label: "GitHub", icon: "ri-github-fill", url: "https://github.com/PinkiBaidya" },
];

export const talkLinks = [
  { label: "LinkedIn", icon: "ri-linkedin-line", url: "https://www.linkedin.com/in/pinki-baidya" },
  { label: "GitHub", icon: "ri-github-line", url: "https://github.com/PinkiBaidya" },
  { label: "Email", icon: "ri-mail-line", url: "mailto:pinkibaidyaeu@gmail.com" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const marqueeItems = [
  "Python",
  "Java",
  "C#",
  "JavaScript",
  "SQL",
  "ASP.NET Core",
  "HTML",
  "CSS",
  "React",
  "MongoDB",
  "SQLite",
  "Git / GitHub",
];