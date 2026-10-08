import { useRef } from 'react';
import type { Project } from '../content/types';
import { ExternalIcon, LockIcon } from './Icons';
import { InfoDialog } from './InfoDialog';
import type { InfoDialogHandle } from './InfoDialog';
import { ScreenshotCarousel } from './ScreenshotCarousel';

export function ProjectCard({ project }: { project: Project }) {
  const noticeRef = useRef<InfoDialogHandle>(null);
  const titleId = `${project.id}-title`;
  const hasShots = project.screenshots.length > 0;
  const { store } = project;

  return (
    <article id={project.id} className={`card${hasShots ? ' card--with-shots' : ''}`} aria-labelledby={titleId}>
      <div className="card__info">
        <h4 id={titleId} className="card__title">
          {project.name}
        </h4>
        <p className="card__subtitle">{project.subtitle}</p>
        <p className="card__description">{project.description}</p>
      </div>

      {hasShots && (
        <div className="card__shots">
          <ScreenshotCarousel appName={project.shortName ?? project.name} screenshots={project.screenshots} />
        </div>
      )}

      {project.stack && <p className="card__stack">{project.stack}</p>}

      <div className="card__action">
        {store.kind === 'link' ? (
          <a className="btn btn--secondary card__store" href={store.href} aria-label={store.ariaLabel}>
            App Store
            <ExternalIcon />
          </a>
        ) : (
          <>
            <button
              type="button"
              className="btn btn--secondary card__store"
              aria-haspopup="dialog"
              onClick={(event) => noticeRef.current?.open(event.currentTarget)}
            >
              <LockIcon />
              App Store
            </button>
            <InfoDialog ref={noticeRef} title={store.title} icon={<LockIcon size={20} />}>
              {store.message}
            </InfoDialog>
          </>
        )}
      </div>
    </article>
  );
}
