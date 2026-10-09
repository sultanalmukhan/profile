import type { ReactNode } from 'react';

function Icon({ size = 16, children }: { size?: number; children: ReactNode }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export const DownloadIcon = () => (
  <Icon>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Icon>
);

export const ArrowDownIcon = () => (
  <Icon>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Icon>
);

export const ExternalIcon = () => (
  <Icon size={14}>
    <path d="M7 17L17 7M8 7h9v9" />
  </Icon>
);

export const LockIcon = ({ size = 15 }: { size?: number }) => (
  <Icon size={size}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Icon>
);

export const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </Icon>
);

export const MenuIcon = () => (
  <Icon size={18}>
    <path d="M4 8h16M4 16h16" />
  </Icon>
);

export const CloseIcon = () => (
  <Icon size={18}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const StarIcon = () => (
  <svg className="icon icon--filled" width={13} height={13} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 2.8l2.75 5.6 6.15.9-4.45 4.33 1.05 6.12L12 16.87l-5.5 2.88 1.05-6.12L3.1 9.3l6.15-.9L12 2.8z" />
  </svg>
);

export const ChevronLeftIcon = () => (
  <Icon>
    <path d="M15 6l-6 6 6 6" />
  </Icon>
);

export const ChevronRightIcon = () => (
  <Icon>
    <path d="M9 6l6 6-6 6" />
  </Icon>
);
