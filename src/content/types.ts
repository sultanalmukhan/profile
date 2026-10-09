/** A link with separate visible text, e.g. "linkedin.com/in/sultanalmukhan". */
export interface LabeledLink {
  href: string;
  label: string;
}

/**
 * One screenshot as prepared by `npm run images`. Paths point into `public/`
 * without an extension: an `.avif` and a `.jpg` exist for each.
 */
export interface Screenshot {
  /** Small copy shown in the card gallery. */
  thumb: string;
  thumbWidth: number;
  thumbHeight: number;
  /** Large copy shown in the lightbox. */
  full: string;
  width: number;
  height: number;
  /** What the screenshot shows, read by screen readers. Defaults to "<App> screenshot N of M". */
  alt?: string;
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
  /** Shorter name for gallery labels, e.g. "Next StepsHero screenshots". Defaults to `name`. */
  shortName?: string;
  /** App icon shown left of the title, as a path inside `public/`. */
  logo?: string;
  /** Company for professional projects, App Store category for personal ones. */
  subtitle: string;
  description: string;
  /**
   * Technologies used on this app, shown as "<label>: a, b, c". Only list what a
   * source attributes to this app; leave out when no source lists them.
   */
  stack?: { label: string; items: string[] };
  /** Shows the "Solo iOS Developer" badge (text in `soloBadge`). Only for confirmed solo builds. */
  solo?: boolean;
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
  /** First month as "YYYY-MM". Shown as "Aug 2023"; the duration is calculated from the dates. */
  start: string;
  /** Last month as "YYYY-MM". Leave out for a current role ("Present"). */
  end?: string;
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
  /** Text of the badge on projects marked `solo`. */
  soloBadge: { label: string; note: string };
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
