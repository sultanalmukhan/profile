import { logoFor, screenshotsFor } from './media';
import type { Portfolio } from './types';

/*
 * All portfolio text, links and media live in this file.
 *
 * Files referenced here (photo, CV) go in the `public/` folder and are written
 * without a leading slash, e.g. "sultan-almukhan.jpg".
 *
 * Logos and screenshots come from `npm run images`, which turns the originals
 * in Logos/ and Screenshots/<App>/ into web copies and looks them up by slug
 * (see scripts/optimize-images.mjs). A project with no screenshots shows no
 * gallery; one with no logo shows its title alone.
 */
export const portfolio: Portfolio = {
  profile: {
    name: 'Sultan Almukhan',
    initials: 'SA',
    role: 'Senior iOS Developer',
    experience: '7+ years of commercial experience',
    intro:
      'I build and maintain production iOS apps in international teams, from product requirements to automated releases. My focus is codebase modernization, app stability and features built with modern iOS technologies.',
    photo: 'sultan-almukhan.jpg',
  },

  cv: {
    file: 'Sultan_Almukhan_iOS_Developer.pdf',
    downloadName: 'Sultan_Almukhan_iOS_Developer.pdf',
  },

  contact: {
    intro: "Whether it's a role, a product or a question about my work, I'd be glad to hear from you.",
    email: 'almukhansultan@gmail.com',
    linkedin: { href: 'https://www.linkedin.com/in/sultanalmukhan/', label: 'linkedin.com/in/sultanalmukhan' },
    github: { href: 'https://github.com/sultanalmukhan', label: 'github.com/sultanalmukhan' },
    whatsapp: { href: 'https://wa.me/4917615485920', label: '+49 176 15485920' },
    appStoreDeveloper: {
      href: 'https://apps.apple.com/us/developer/sultan-almukhan/id1833875345',
      label: 'App Store developer profile',
    },
  },

  navigation: [
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  soloBadge: {
    label: 'Solo iOS Developer',
    note: 'Built and shipped end-to-end.',
  },

  projects: [
    {
      title: 'Professional Projects',
      intro: 'Apps I worked on at FGS Global, Tele2, DAR, Halyk Bank and Tredo.',
      projects: [
        {
          id: 'app-fergus',
          name: 'Fergus',
          subtitle: 'FGS Global',
          description:
            'A voice-first enterprise AI app used by FGS Global employees across 13 countries. Hands-free voice chat combines on-device speech recognition, AI responses streamed over SSE and server-generated TTS playback.',
          stack: { label: 'FGS Global stack', items: ['Swift', 'UIKit', 'Swift Testing', 'MVP-C', 'AVFoundation', 'Speech Framework', 'SSE', 'Okta OIDC', 'Next.js'] },
          solo: true,
          logo: logoFor('fergus'),
          screenshots: screenshotsFor('fergus'),
          store: {
            kind: 'notice',
            title: 'Internal enterprise app',
            message:
              'Fergus is a private application used internally at FGS Global. It is distributed through Apple Business Manager and MDM and is not available on the public App Store.',
          },
        },
        {
          id: 'app-mitt-tele2',
          name: 'Mitt Tele2',
          subtitle: 'Tele2',
          description:
            "A telecom superapp bringing mobile plans, account management, media features, and loan services into one experience.",
          stack: { label: 'Tele2 stack', items: ['Swift', 'UIKit', 'SwiftUI', 'Swift Testing'] },
          logo: logoFor('mitt-tele2'),
          screenshots: screenshotsFor('mitt-tele2'),
          store: {
            kind: 'link',
            href: 'https://apps.apple.com/de/app/mitt-tele2/id479841366',
            ariaLabel: 'Mitt Tele2 on the App Store',
          },
        },
        {
          id: 'app-comviq',
          name: 'Comviq',
          subtitle: 'Tele2',
          description:
            "A telecom superapp combining mobile account management, top-ups, media features, and loan services in one place.",
          stack: { label: 'Tele2 stack', items: ['Swift', 'UIKit', 'SwiftUI', 'Swift Testing'] },
          logo: logoFor('comviq'),
          screenshots: screenshotsFor('comviq'),
          store: {
            kind: 'link',
            href: 'https://apps.apple.com/de/app/comviq/id469353162',
            ariaLabel: 'Comviq on the App Store',
          },
        },
        {
          id: 'app-darlean',
          name: 'Darlean',
          subtitle: 'DAR',
          description:
            'A business management platform for teams of all sizes, bringing tasks, approvals, timesheets, employee profiles, online meetings and file storage into one app.',
          stack: { label: 'DAR stack', items: ['Swift', 'UIKit', 'XCTest', 'SPM', 'MVVM-C', 'Fastlane', 'Tuist', 'Swinject'] },
          logo: logoFor('darlean'),
          screenshots: screenshotsFor('darlean'),
          store: {
            kind: 'link',
            href: 'https://apps.apple.com/de/app/darlean-eu/id1508293776',
            ariaLabel: 'Darlean EU on the App Store',
          },
        },
        {
          id: 'app-halyk',
          name: 'Halyk',
          subtitle: 'Halyk Bank',
          description:
            "Halyk Bank's super app for transfers, payments, loans and deposits, plus shopping with installments, travel and event tickets, and public services.",
          stack: { label: 'Halyk Bank stack', items: ['Swift', 'UIKit', 'XCTest', 'SnapKit', 'MVVM-C', 'GCD', 'Liveness'] },
          logo: logoFor('halyk'),
          screenshots: screenshotsFor('halyk'),
          store: {
            kind: 'link',
            href: 'https://apps.apple.com/us/app/halyk-kazakhstan/id440635615',
            ariaLabel: 'Halyk on the App Store',
          },
        },
        {
          id: 'app-intebix',
          name: 'Intebix',
          subtitle: 'Tredo',
          description:
            'A cryptocurrency exchange app for buying, selling and trading assets such as Bitcoin and Ethereum, with deposits and withdrawals through partner banks in Kazakhstan.',
          stack: { label: 'Tredo stack', items: ['Swift', 'Objective-C', 'UIKit', 'WebSocket'] },
          solo: true,
          logo: logoFor('intebix'),
          screenshots: screenshotsFor('intebix'),
          store: {
            kind: 'link',
            href: 'https://apps.apple.com/kz/app/intebix/id6443622769',
            ariaLabel: 'Intebix on the App Store',
          },
        },
        {
          id: 'app-biteeu',
          name: 'Biteeu',
          subtitle: 'Tredo',
          // Placeholder from the design until a one-line product description is supplied.
          description: 'An iOS application delivered while working at Tredo.',
          stack: { label: 'Tredo stack', items: ['Swift', 'Objective-C', 'UIKit'] },
          logo: logoFor('biteeu'),
          screenshots: screenshotsFor('biteeu'),
          store: {
            kind: 'link',
            href: 'https://biteeu.appstor.io/',
            ariaLabel: 'Biteeu on the App Store',
          },
        },
        {
          id: 'app-bcc-business',
          name: 'BCC Business',
          subtitle: 'Tredo',
          description:
            "Bank CenterCredit's mobile banking app for entrepreneurs and business clients: open accounts, send domestic and international payments, exchange currency and manage business cards.",
          stack: { label: 'Tredo stack', items: ['Swift', 'Objective-C', 'UIKit'] },
          logo: logoFor('bcc-business'),
          screenshots: screenshotsFor('bcc-business'),
          store: {
            kind: 'link',
            href: 'https://apps.apple.com/in/app/bcc-business-2-0/id6733227151',
            ariaLabel: 'BCC Business 2.0 on the App Store',
          },
        },
      ],
    },
    {
      title: 'Personal Projects',
      intro: 'Published under my own App Store developer account.',
      introLink: {
        href: 'https://apps.apple.com/us/developer/sultan-almukhan/id1833875345',
        label: 'Developer profile',
      },
      projects: [
        {
          id: 'app-stepshero',
          name: 'StepsHero: Walking Game',
          shortName: 'StepsHero',
          subtitle: 'Health & Fitness',
          description:
            'A step counter that turns walking into a role-playing game. Daily steps earn XP that levels up raccoon heroes, with streaks, step challenges and achievements to keep people moving.',
          logo: logoFor('stepshero'),
          solo: true,
          screenshots: screenshotsFor('stepshero'),
          store: {
            kind: 'link',
            href: 'https://apps.apple.com/us/app/stepshero-walking-game/id6752722061',
            ariaLabel: 'StepsHero on the App Store',
          },
        },
        {
          id: 'app-capslab',
          name: 'Auto Captions: CapsLab AI',
          shortName: 'CapsLab AI',
          subtitle: 'Photo & Video',
          description:
            'Adds AI-generated captions to videos for TikTok, Instagram and YouTube, with speech transcription, translation into 99 languages and customizable caption styles.',
          logo: logoFor('capslab'),
          solo: true,
          screenshots: screenshotsFor('capslab'),
          store: {
            kind: 'link',
            href: 'https://apps.apple.com/us/app/auto-captions-capslab-ai/id6751768318',
            ariaLabel: 'Auto Captions: CapsLab AI on the App Store',
          },
        },
      ],
    },
  ],

  experience: [
    {
      start: '2025-09',
      company: 'FGS Global',
      role: 'Senior iOS Developer',
      companyDescription:
        "FGS Global is the world's #1 M&A communications advisor, supporting 527 deals worth $1.14T in 2025.",
      achievements: [
        'Owned and delivered a voice-first enterprise AI application from concept to release as the sole iOS engineer, taking full responsibility for architecture, implementation, integrations, testing and technical decision-making, built for employees across 13 countries worldwide.',
        'Collaborated with product leadership and key stakeholders to define requirements, prioritize scope and validate critical product and technical decisions upfront, avoiding major rework and saving an estimated 2–3 months of development.',
        'Engineered and launched a mobile AI chat agent with hands-free voice interaction, combining on-device speech recognition, AI responses streamed over SSE and server-generated TTS playback, contributing to a 23.7% increase in platform MAU.',
        'Drove cross-functional delivery across Product, Design, Backend and DevOps teams in multiple countries, while personally building a dedicated Next.js mobile API layer with 20+ endpoints.',
      ],
      technologies: ['Swift', 'UIKit', 'Swift Testing', 'MVP-C', 'AVFoundation', 'Speech Framework', 'SSE', 'Okta OIDC', 'Next.js'],
      apps: [{ name: 'Fergus', projectId: 'app-fergus' }],
    },
    {
      start: '2023-08',
      end: '2025-09',
      company: 'Tele2',
      role: 'Senior iOS Developer',
      companyDescription:
        'Tele2 is a leading European telecommunications operator serving 7M+ mobile customers across Sweden and the Baltics.',
      achievements: [
        'Delivered a Call Recording module with an audio player and time-synced transcription, enabling fast conversation navigation.',
        'Built a full-featured Ringtones media platform with advanced browsing and system-level ringtone installation.',
        'Integrated and launched an end-to-end loan application flow with partner banks (forms, document upload, calculations, pre-scoring), which boosted the number of issued loans by 34.6% within two months of release.',
        "Led modernization of the project's largest module by migrating to Swift 6, replacing XCTest with Swift Testing and refactoring async logic to async/await, raising the crash-free rate from 90.2% to 95.7% while improving performance and maintainability.",
      ],
      technologies: ['Swift', 'UIKit', 'SwiftUI', 'Swift Testing', 'SPM', 'MVP', 'async/await', 'Fastlane', 'Swinject'],
      apps: [
        { name: 'Mitt Tele2', projectId: 'app-mitt-tele2' },
        { name: 'Comviq', projectId: 'app-comviq' },
      ],
    },
    {
      start: '2021-08',
      end: '2023-08',
      company: 'DAR',
      role: 'Senior iOS Developer',
      companyDescription:
        'DAR is an international technology group developing 10+ digital platforms across enterprise SaaS, education and media sectors.',
      achievements: [
        'Designed and introduced advanced meeting creation and editing features, including recurring events and a custom calendar with timeline views inspired by Google Calendar. Increased the App Store rating from 4.4 to 4.6 within one month of release.',
        'Created a reusable Swift Package with a WYSIWYG editor, centralized environment-based URL configuration across modules, reduced SPM build times from 20 to 4 minutes and improved cold app launch time by 10 seconds.',
      ],
      technologies: ['Swift', 'UIKit', 'XCTest', 'SPM', 'MVVM-C', 'Fastlane', 'Tuist', 'Swinject'],
      apps: [{ name: 'Darlean', projectId: 'app-darlean' }],
    },
    {
      start: '2020-11',
      end: '2021-08',
      company: 'Halyk Bank',
      role: 'iOS Developer',
      companyDescription:
        'Halyk Bank is the largest financial services group in Central Asia with $45B+ in assets and 11M+ active customers.',
      achievements: [
        'Redesigned and re-architected the most-used Acquiring module, delivering 15+ scalable and reusable production screens with seamless backend API integration and improving the crash-free user rate from 87.6% to 94.2%.',
        'Mentored and coached junior iOS developers by conducting weekly training sessions and code reviews, supporting their technical development and effective onboarding.',
      ],
      technologies: ['Swift', 'UIKit', 'XCTest', 'SnapKit', 'MVVM-C', 'GCD', 'Liveness'],
      apps: [{ name: 'Halyk', projectId: 'app-halyk' }],
    },
    {
      start: '2018-12',
      end: '2020-11',
      company: 'Tredo',
      role: 'iOS Developer',
      companyDescription:
        'Tredo is an IT outsourcing company serving 15+ enterprise clients, including international startups.',
      achievements: [
        'Built a crypto app from scratch and released it to the App Store as a solo iOS developer, including user registration, identity verification and real-time price updates via WebSockets.',
        'Delivered Deposit and Transport Tax features for a banking application, increasing MAU by 6.1% and 3.2% respectively, while improving the reliability of bank transfers and notifications.',
      ],
      technologies: ['Swift', 'Objective-C', 'UIKit', 'CocoaPods', 'MVC', 'VIPER', 'GCD', 'WebSocket', 'Combine', 'RxSwift', 'Core Data'],
      apps: [
        { name: 'Intebix', projectId: 'app-intebix' },
        { name: 'Biteeu', projectId: 'app-biteeu' },
        { name: 'BCC Business', projectId: 'app-bcc-business' },
      ],
    },
  ],

  about: {
    lead: "I'm an iOS developer with 7+ years of commercial experience building and maintaining production iOS apps in international teams. I work across the full cycle, from product requirements to automated releases with high test coverage and detailed analytics, and I've expanded beyond iOS by building and integrating dedicated mobile backend APIs.",
    body: "I founded a coding school and mentor junior developers through code reviews and regular knowledge-sharing sessions. I'm fluent in English, confident working in multicultural teams, and passionate about building independent iOS products and launching startup projects for the global App Store market.",
    expertise: [
      {
        title: 'iOS development',
        items: 'Swift, SwiftUI, UIKit, Swift Concurrency, Combine, Core Data, AVFoundation, Speech Framework, Core Animation, Objective-C',
      },
      {
        title: 'Architecture, networking and testing',
        items: 'Clean Architecture, MVVM, VIPER, MVP, SOLID, Swinject, REST, WebSockets, SSE, OAuth 2.0, OIDC, XCTest, Swift Testing',
      },
      {
        title: 'Delivery and tooling',
        items: 'Xcode, SPM, Tuist, CocoaPods, Fastlane, CI/CD, App Store Connect, TestFlight, Firebase Crashlytics and Analytics, SwiftLint',
      },
      { title: 'Backend and web', items: 'Next.js, Node.js, TypeScript, JavaScript' },
    ],
    education: [
      {
        school: 'Suleyman Demirel University',
        detail: "Master's degree, Computer Science · Faculty of Engineering and Natural Sciences",
      },
      {
        school: 'Suleyman Demirel University',
        detail: "Bachelor's degree, Information Systems · Faculty of Engineering and Natural Sciences",
      },
      {
        school: 'Kazakh-Turkish Lyceum',
        detail: "School for gifted children · Member of the school's Mathematical Olympiad team",
      },
    ],
    languages: [
      { name: 'Kazakh', level: 'C2, Proficient' },
      { name: 'English', level: 'C1, Proficient' },
      { name: 'Russian', level: 'C2, Proficient' },
      { name: 'Turkish', level: 'B2, Upper-Intermediate' },
    ],
  },
};
