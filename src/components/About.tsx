import { portfolio } from '../content/portfolio';
import './About.css';

export function About() {
  const { about } = portfolio;

  return (
    <section id="about" className="container section" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">
        About
      </h2>

      <div className="about__row about__row--intro">
        <div className="about__col">
          <p className="about__lead">{about.lead}</p>
          <p className="about__body">{about.body}</p>
        </div>
        <div className="about__col about__col--wide">
          <h3 className="about__subtitle">Expertise</h3>
          <dl className="about__expertise">
            {about.expertise.map((group) => (
              <div key={group.title} className="about__skill">
                <dt>{group.title}</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="about__row about__row--details">
        <div className="about__col">
          <h3 className="about__subtitle">Education</h3>
          <ul className="about__education">
            {about.education.map((entry) => (
              <li key={entry.detail}>
                <p className="about__school">{entry.school}</p>
                <p className="about__detail">{entry.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="about__col about__col--wide">
          <h3 className="about__subtitle">Languages</h3>
          <dl className="about__languages">
            {about.languages.map((language) => (
              <div key={language.name}>
                <dt>{language.name}</dt>
                <dd>{language.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
