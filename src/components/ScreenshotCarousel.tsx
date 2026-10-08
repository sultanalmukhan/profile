import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { Screenshot } from '../content/types';
import { asset } from '../lib/asset';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import './ScreenshotCarousel.css';

interface ViewState {
  first: number;
  last: number;
  atStart: boolean;
  atEnd: boolean;
  overflowing: boolean;
}

const EDGE_TOLERANCE = 2;

/** Which screenshots are fully in view, and whether the row can scroll either way. */
function measure(track: HTMLElement): ViewState {
  const frames = Array.from(track.children) as HTMLElement[];
  const origin = frames[0]?.offsetLeft ?? 0;
  const viewStart = track.scrollLeft;
  const viewEnd = viewStart + track.clientWidth;

  let first = 0;
  let last = 0;
  frames.forEach((frame, index) => {
    const start = frame.offsetLeft - origin;
    const end = start + frame.offsetWidth;
    if (start >= viewStart - 1 && end <= viewEnd + 1) {
      if (!first) first = index + 1;
      last = index + 1;
    }
  });

  // A frame wider than the row is never fully visible; fall back to the one under the left edge.
  if (!first && frames.length) {
    const step = frames[0].offsetWidth || 1;
    first = last = Math.min(frames.length, Math.floor(viewStart / step) + 1);
  }

  return {
    first,
    last,
    atStart: viewStart <= EDGE_TOLERANCE,
    atEnd: viewEnd >= track.scrollWidth - EDGE_TOLERANCE,
    overflowing: track.scrollWidth > track.clientWidth + EDGE_TOLERANCE,
  };
}

function sameView(a: ViewState, b: ViewState) {
  return (
    a.first === b.first &&
    a.last === b.last &&
    a.atStart === b.atStart &&
    a.atEnd === b.atEnd &&
    a.overflowing === b.overflowing
  );
}

interface ScreenshotCarouselProps {
  appName: string;
  screenshots: Screenshot[];
}

export function ScreenshotCarousel({ appName, screenshots }: ScreenshotCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [view, setView] = useState<ViewState>({
    first: 1,
    last: screenshots.length,
    atStart: true,
    atEnd: true,
    overflowing: false,
  });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const next = measure(track);
    setView((current) => (sameView(current, next) ? current : next));
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();

    const onScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(update);
    };
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(track);
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      track.removeEventListener('scroll', onScroll);
    };
  }, [update, screenshots.length]);

  const step = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * (track.clientWidth + gap), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const total = screenshots.length;

  return (
    <div className="shots">
      <div ref={trackRef} className="shots__track" role="group" tabIndex={0} aria-label={`${appName} screenshots`}>
        {screenshots.map((shot, index) => (
          <img
            key={`${index}-${shot.src}`}
            className="shots__frame"
            src={asset(shot.src)}
            alt={shot.alt || `${appName} screenshot ${index + 1} of ${total}`}
            width={1290}
            height={2796}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ))}
      </div>

      {view.overflowing && (
        <div className="shots__controls">
          <span className="shots__count" aria-live="polite">
            {view.first === view.last ? view.first : `${view.first}–${view.last}`} of {total}
          </span>
          <div className="shots__buttons">
            <button
              type="button"
              className="shots__button"
              aria-label={`Previous ${appName} screenshots`}
              aria-disabled={view.atStart}
              onClick={() => !view.atStart && step(-1)}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className="shots__button"
              aria-label={`Next ${appName} screenshots`}
              aria-disabled={view.atEnd}
              onClick={() => !view.atEnd && step(1)}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
