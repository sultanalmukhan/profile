import { useRef } from 'react';
import { portfolio } from '../content/portfolio';
import type { Project } from '../content/types';
import { asset } from '../lib/asset';
import { ExternalIcon, LockIcon, StarIcon } from './Icons';
import { InfoDialog } from './InfoDialog';
import type { InfoDialogHandle } from './InfoDialog';
import { ScreenshotGallery } from './ScreenshotGallery';

export function ProjectCard({ project }: { project: Project }) {
  const noticeRef = useRef<InfoDialogHandle>(null);
  const titleId = `${project.id}-title`;
  const { store } = project;

  return (
    <article id={project.id} className="card" aria-labelledby={titleId}>
      <div className="card__header">
        {project.logo && (
          <img className="card__logo" src={asset(project.logo)} alt="" width={48} height={48} loading="lazy" decoding="async" />
        )}
        <div className="card__heading">
          <h4 id={titleId} className="card__title">
            {project.name}
          </h4>
          <p className="card__subtitle">{project.subtitle}</p>
        </div>
      </div>

      {project.solo && (
        <p className="card__solo">
          <span className="solo-badge">
            <StarIcon />
            {portfolio.soloBadge.label}
          </span>
          <span className="card__solo-note">{portfolio.soloBadge.note}</span>
        </p>
      )}

      <p className="card__description">{project.description}</p>

      {project.screenshots.length > 0 && (
        <div className="card__shots">
          <ScreenshotGallery appName={project.shortName ?? project.name} screenshots={project.screenshots} />
        </div>
      )}

      {project.stack && (
        <p className="card__stack">
          {project.stack.label}: {project.stack.items.join(', ')}
        </p>
      )}

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
