import { Fragment } from 'react';
import { portfolio } from '../content/portfolio';
import { formatDuration, formatRange } from '../lib/dates';
import { CvLink } from './CvLink';
import './Experience.css';

export function Experience() {
  return (
    <section id="experience" className="container section" aria-labelledby="experience-title">
      <div className="experience__head">
        <h2 id="experience-title" className="section-title">
          Experience
        </h2>
        <CvLink className="btn btn--secondary btn--small btn--block-mobile" />
      </div>

      <ol className="timeline">
        {portfolio.experience.map((job) => {
          const duration = formatDuration(job.start, job.end);
          return (
          <li key={`${job.company}-${job.start}`} className="timeline__item">
            <div className="timeline__when">
              <p className="timeline__dates">
                {formatRange(job.start, job.end)}
                <span className="only-mobile"> · {duration}</span>
              </p>
              <p className="timeline__duration only-desktop">{duration}</p>
            </div>

            <div className="timeline__body">
              <h3 className="timeline__company">{job.company}</h3>
              <p className="timeline__role">{job.role}</p>
              <p className="timeline__about">{job.companyDescription}</p>
              <ul className="timeline__achievements">
                {job.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
              <p className="timeline__meta">Technologies: {job.technologies.join(', ')}</p>
              {job.apps.length > 0 && (
                <p className="timeline__meta timeline__apps">
                  {job.apps.length === 1 ? 'App' : 'Apps'}:{' '}
                  {job.apps.map((app, index) => (
                    <Fragment key={app.projectId}>
                      {index > 0 && ', '}
                      <a className="text-link timeline__app" href={`#${app.projectId}`}>
                        {app.name}
                      </a>
                    </Fragment>
                  ))}
                </p>
              )}
            </div>
          </li>
          );
        })}
      </ol>
    </section>
  );
}
