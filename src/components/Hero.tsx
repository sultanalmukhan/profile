import { portfolio } from '../content/portfolio';
import { asset } from '../lib/asset';
import { CvLink } from './CvLink';
import { ArrowDownIcon } from './Icons';
import './Hero.css';

export function Hero() {
  const { profile, contact } = portfolio;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__identity">
          <img className="hero__photo" src={asset(profile.photo)} alt={profile.name} width={112} height={112} />
          <div className="hero__heading">
            <h1 id="hero-title" className="hero__name">
              {profile.name}
            </h1>
            <p className="hero__role">{profile.role}</p>
            <p className="hero__years">{profile.experience}</p>
          </div>
        </div>

        <div className="hero__summary">
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__actions">
            <a className="btn btn--primary btn--block-mobile" href="#projects">
              View projects
              <ArrowDownIcon />
            </a>
            <CvLink className="btn btn--secondary btn--block-mobile" />
          </div>
          <div className="hero__links">
            <a className="text-link hero__link" href={`mailto:${contact.email}`}>
              <span className="only-desktop">{contact.email}</span>
              <span className="only-mobile">Email</span>
            </a>
            <a className="text-link hero__link" href={contact.linkedin.href}>
              LinkedIn
            </a>
            <a className="text-link hero__link" href={contact.whatsapp.href}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
