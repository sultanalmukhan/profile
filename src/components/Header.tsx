import { useEffect, useRef, useState } from 'react';
import { portfolio } from '../content/portfolio';
import { CvLink } from './CvLink';
import { CloseIcon, MenuIcon } from './Icons';
import './Header.css';

const DESKTOP_QUERY = '(min-width: 768px)';

export function Header() {
  const { profile, navigation } = portfolio;
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = () => desktop.matches && setMenuOpen(false);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container site-header__bar">
        <a className="brand" href="#top" aria-label={`${profile.name}, back to top`} onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="brand__name">{profile.name}</span>
        </a>

        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav__links">
            {navigation.map((item) => (
              <li key={item.id}>
                <a className="site-nav__link" href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <CvLink className="btn btn--secondary btn--header" />
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="mobile-menu__backdrop" aria-hidden="true" onClick={closeMenu} />
          <nav id="mobile-menu" className="mobile-menu" aria-label="Main">
            <ul className="mobile-menu__links">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a className="mobile-menu__link" href={`#${item.id}`} onClick={closeMenu}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <CvLink className="btn btn--secondary mobile-menu__cv" onClick={closeMenu} />
          </nav>
        </>
      )}
    </header>
  );
}
