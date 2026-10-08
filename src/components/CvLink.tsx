import type { ReactNode } from 'react';
import { portfolio } from '../content/portfolio';
import { asset } from '../lib/asset';
import { DownloadIcon } from './Icons';

interface CvLinkProps {
  className: string;
  /** Visible text. Defaults to the icon plus "Download CV". */
  children?: ReactNode;
  onClick?: () => void;
}

export function CvLink({ className, children, onClick }: CvLinkProps) {
  return (
    <a className={className} href={asset(portfolio.cv.file)} download={portfolio.cv.downloadName} onClick={onClick}>
      {children ?? (
        <>
          <DownloadIcon />
          Download CV
        </>
      )}
    </a>
  );
}
