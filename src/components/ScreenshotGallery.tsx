import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { Screenshot } from '../content/types';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { Lightbox } from './Lightbox';
import type { LightboxHandle } from './Lightbox';
import { ScreenshotImage } from './ScreenshotImage';
import './ScreenshotGallery.css';

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
  const items = Array.from(track.children) as HTMLElement[];
  const origin = items[0]?.offsetLeft ?? 0;
  // The track has inline padding so focus rings aren't clipped; item positions are measured from the first item.
  const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
  const viewStart = track.scrollLeft - padding;
  const viewEnd = track.scrollLeft + track.clientWidth - padding;

  let first = 0;
  let last = 0;
  items.forEach((item, index) => {
    const start = item.offsetLeft - origin;
    const end = start + item.offsetWidth;
    if (start >= viewStart - 1 && end <= viewEnd + 1) {
      if (!first) first = index + 1;
      last = index + 1;
    }
  });

  // An item wider than the row is never fully visible; fall back to the one under the left edge.
  if (!first && items.length) {
    const hit = items.findIndex((item) => item.offsetLeft - origin + item.offsetWidth > viewStart);
    first = last = Math.max(1, hit + 1);
  }

  return {
    first,
    last,
    atStart: track.scrollLeft <= EDGE_TOLERANCE,
    atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - EDGE_TOLERANCE,
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

interface ScreenshotGalleryProps {
  appName: string;
  screenshots: Screenshot[];
}

/**
 * A horizontal row of screenshots at one height, each keeping its own aspect
 * ratio. It scrolls by touch, trackpad or the arrow buttons (shown on devices
 * with a mouse when the row overflows), and each screenshot opens a lightbox.
 */
export function ScreenshotGallery({ appName, screenshots }: ScreenshotGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<LightboxHandle>(null);
  const frameRef = useRef(0);
  const total = screenshots.length;
  const [view, setView] = useState<ViewState>({ first: 1, last: total, atStart: true, atEnd: true, overflowing: false });

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
  }, [update, total]);

  const step = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const style = getComputedStyle(track);
    const page = track.clientWidth - 2 * (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.columnGap) || 0);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * page, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  // Return focus to the screenshot that was showing when the lightbox closed.
  const handleLightboxClose = (index: number) => {
    const item = trackRef.current?.children[index] as HTMLElement | undefined;
    if (!item) return;
    item.focus({ preventScroll: true });
    item.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  if (total === 0) return null;

  return (
    <div className="gallery">
      <div ref={trackRef} className="gallery__track" role="group" aria-label={`${appName} screenshots`}>
        {screenshots.map((shot, index) => (
          <button
            key={shot.thumb}
            type="button"
            className="gallery__item"
            style={{ aspectRatio: `${shot.thumbWidth} / ${shot.thumbHeight}` }}
            aria-label={`Open ${appName} screenshot ${index + 1} of ${total}`}
            aria-haspopup="dialog"
            onClick={() => lightboxRef.current?.open(index)}
          >
            <ScreenshotImage
              className="gallery__image"
              path={shot.thumb}
              width={shot.thumbWidth}
              height={shot.thumbHeight}
              alt=""
            />
          </button>
        ))}
      </div>

      {view.overflowing && (
        <div className="gallery__controls">
          <span className="gallery__count" aria-live="polite">
            {view.first === view.last ? view.first : `${view.first}–${view.last}`} of {total}
          </span>
          <div className="gallery__buttons">
            <button
              type="button"
              className="gallery__button"
              aria-label={`Previous ${appName} screenshots`}
              aria-disabled={view.atStart}
              onClick={() => !view.atStart && step(-1)}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className="gallery__button"
              aria-label={`Next ${appName} screenshots`}
              aria-disabled={view.atEnd}
              onClick={() => !view.atEnd && step(1)}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      )}

      <Lightbox ref={lightboxRef} appName={appName} screenshots={screenshots} onClose={handleLightboxClose} />
    </div>
  );
}
