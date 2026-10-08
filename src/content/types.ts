/** A link with separate visible text, e.g. "linkedin.com/in/sultanalmukhan". */
export interface LabeledLink {
  href: string;
  label: string;
}

export interface Screenshot {
  /** File path inside `public/`, e.g. "screenshots/mitt-tele2/01.webp". */
  src: string;
  /** What the screenshot shows, read by screen readers. */
  alt: string;
}

/**
 * What the card's "App Store" button does: open a public listing, or show an
 * informational dialog for apps without one (internal enterprise apps).
 */
export type StoreAction =
  | { kind: 'link'; href: string; ariaLabel: string }
  | { kind: 'notice'; title: string; message: string };

export interface Project {
  /** Anchor id, also used by the Experience section's app links. */
  id: string;
  name: string;
  /** Shorter name for carousel labels, e.g. "Next StepsHero screenshots". Defaults to `name`. */
  shortName?: string;
  /** Company for professional projects, App Store category for personal ones. */
  subtitle: string;
  description: string;
  /** Employer stack line. Leave out when no source lists the technologies. */
  stack?: string;
  /** Any number of screenshots. With none, the card shows no gallery. */
  screenshots: Screenshot[];
  store: StoreAction;
}

export interface ProjectGroup {
  title: string;
  intro: string;
  introLink?: LabeledLink;
  projects: Project[];
}

export interface ExperienceEntry {
  /** En dash between dates, e.g. "Aug 2024 – Sep 2025". */
  dates: string;
  duration?: string;
  company: string;
  role: string;
  companyDescription: string;
  achievements: string[];
  technologies: string[];
  /** Links to project cards by their `id`. */
  apps: { name: string; projectId: string }[];
}

export interface Portfolio {
  profile: {
    name: string;
    initials: string;
    role: string;
    experience: string;
    intro: string;
    /** File path inside `public/`. */
    photo: string;
  };
  cv: {
    /** File path inside `public/`. */
    file: string;
    downloadName: string;
  };
  contact: {
    intro: string;
    email: string;
    linkedin: LabeledLink;
    github: LabeledLink;
    whatsapp: LabeledLink;
    appStoreDeveloper: LabeledLink;
  };
  navigation: { id: string; label: string }[];
  projects: ProjectGroup[];
  experience: ExperienceEntry[];
  about: {
    lead: string;
    body: string;
    expertise: { title: string; items: string }[];
    education: { school: string; detail: string }[];
    languages: { name: string; level: string }[];
  };
}
