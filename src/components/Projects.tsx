import { portfolio } from '../content/portfolio';
import { ProjectCard } from './ProjectCard';
import './Projects.css';

export function Projects() {
  return (
    <section id="projects" className="container section" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title">
        Projects
      </h2>

      {portfolio.projects.map((group) => (
        <div key={group.title} className="project-group">
          <div className="project-group__head">
            <h3 className="project-group__title">{group.title}</h3>
            <p className="project-group__intro">
              {group.intro}
              {group.introLink && (
                <>
                  {' '}
                  <a className="text-link project-group__link" href={group.introLink.href}>
                    {group.introLink.label}
                  </a>
                </>
              )}
            </p>
          </div>
          <div className="project-group__list">
            {group.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
