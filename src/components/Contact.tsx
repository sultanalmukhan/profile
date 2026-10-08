import { portfolio } from '../content/portfolio';
import { CvLink } from './CvLink';
import { MailIcon } from './Icons';
import './Contact.css';

export function Contact() {
  const { contact } = portfolio;
  const rows = [
    { term: 'Email', href: `mailto:${contact.email}`, label: contact.email },
    { term: 'LinkedIn', ...contact.linkedin },
    { term: 'GitHub', ...contact.github },
    { term: 'WhatsApp', ...contact.whatsapp },
  ];

  return (
    <section id="contact" className="container section" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title">
        Contact
      </h2>

      <div className="contact__layout">
        <div className="contact__intro">
          <p className="contact__text">{contact.intro}</p>
          <div className="contact__actions">
            <a className="btn btn--primary btn--block-mobile" href={`mailto:${contact.email}`}>
              <MailIcon />
              Email me
            </a>
            <CvLink className="btn btn--secondary btn--block-mobile" />
          </div>
        </div>

        <dl className="contact__list">
          {rows.map((row) => (
            <div key={row.term} className="contact__row">
              <dt>{row.term}</dt>
              <dd>
                <a className="text-link contact__link" href={row.href}>
                  {row.label}
                </a>
              </dd>
            </div>
          ))}
          <div className="contact__row only-desktop">
            <dt>CV</dt>
            <dd>
              <CvLink className="text-link contact__link">Download PDF</CvLink>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
