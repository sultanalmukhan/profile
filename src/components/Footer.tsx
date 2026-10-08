import { portfolio } from '../content/portfolio';
import './Footer.css';

export function Footer() {
  const { profile, contact } = portfolio;

  return (
    <footer className="container site-footer">
      <div className="site-footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div className="site-footer__links">
          <a className="text-link site-footer__link" href={contact.appStoreDeveloper.href}>
            {contact.appStoreDeveloper.label}
          </a>
          <a className="text-link site-footer__link only-desktop" href="#top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
