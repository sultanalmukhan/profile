import { useImperativeHandle, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, PointerEvent, Ref, SyntheticEvent } from 'react';
import type { Screenshot } from '../content/types';
import { keepTabInside } from '../lib/dialog';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './Icons';
import { ScreenshotImage, screenshotBackground } from './ScreenshotImage';
import './Lightbox.css';

export interface LightboxHandle {
  open: (index: number) => void;
}

interface LightboxProps {
  ref?: Ref<LightboxHandle>;
  appName: string;
  screenshots: Screenshot[];
  /** Called with the screenshot shown last, so the gallery can move focus back to it. */
  onClose: (index: number) => void;
}

const SWIPE_DISTANCE = 40;

/**
 * Full-screen screenshot viewer on the native <dialog> element: the page
 * behind it is inert, Escape closes it, and Left/Right, Home/End and swipes
 * move between screenshots.
 */
export function Lightbox({ ref, appName, screenshots, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(0);
  const finishedRef = useRef(true);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const swipedRef = useRef(false);
  const [index, setIndex] = useState(0);
  // Images render only while open, so closed lightboxes download nothing.
  const [isOpen, setIsOpen] = useState(false);
  const total = screenshots.length;
  const shot = isOpen ? screenshots[index] : undefined;
  const neighbours = isOpen ? [screenshots[index - 1], screenshots[index + 1]].filter(Boolean) : [];

  const show = (next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    indexRef.current = clamped;
    setIndex(clamped);
  };

  useImperativeHandle(ref, () => ({
    open(start) {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      show(start);
      setIsOpen(true);
      finishedRef.current = false;
      dialog.showModal();
      closeRef.current?.focus();
    },
  }));

  // Hands focus back right away. The dialog's own `close` event can arrive
  // hundreds of milliseconds later, so it only serves as a fallback.
  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsOpen(false);
    onClose(indexRef.current);
  };

  const close = () => {
    dialogRef.current?.close();
    finish();
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    const moves: Record<string, number> = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: total - 1 };
    if (event.key in moves) {
      event.preventDefault();
      show(moves[event.key]);
      return;
    }
    keepTabInside(event);
  };

  // Clicks on the dimmed area around the image close the viewer; a swipe never does.
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    const target = event.target as HTMLElement;
    if (target === event.currentTarget || target.classList.contains('lightbox__stage')) close();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeRef.current = { x: event.clientX, y: event.clientY };
    swipedRef.current = false;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      swipedRef.current = true;
      show(index + (dx < 0 ? 1 : -1));
    }
  };

  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={`${appName} screenshots`}
      onCancel={handleCancel}
      onClose={finish}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="lightbox__bar">
        <p className="lightbox__title">{appName}</p>
        <button ref={closeRef} type="button" className="lightbox__button" aria-label="Close" onClick={close}>
          <CloseIcon />
        </button>
      </div>

      <div
        className="lightbox__stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (swipeRef.current = null)}
      >
        {shot && (
          <ScreenshotImage
            key={shot.full}
            className="lightbox__image"
            // Sized from the known dimensions (never above natural size) so the box exists before the
            // image arrives; the already-loaded thumbnail fills it in the meantime.
            style={{
              height: `min(100cqh, ${shot.height}px, calc(100cqw * ${shot.height} / ${shot.width}))`,
              aspectRatio: `${shot.width} / ${shot.height}`,
              backgroundImage: screenshotBackground(shot.thumb),
            }}
            path={shot.full}
            width={shot.width}
            height={shot.height}
            alt={shot.alt ?? `${appName} screenshot ${index + 1} of ${total}`}
            loading="eager"
          />
        )}
      </div>

      <div className="lightbox__preload" aria-hidden="true">
        {neighbours.map((neighbour) => (
          <ScreenshotImage
            key={neighbour.full}
            path={neighbour.full}
            width={neighbour.width}
            height={neighbour.height}
            alt=""
            loading="eager"
          />
        ))}
      </div>

      <div className="lightbox__nav">
        <button
          type="button"
          className="lightbox__button"
          aria-label="Previous screenshot"
          aria-disabled={atStart}
          onClick={() => !atStart && show(index - 1)}
        >
          <ChevronLeftIcon />
        </button>
        <span className="lightbox__count" aria-live="polite">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          className="lightbox__button"
          aria-label="Next screenshot"
          aria-disabled={atEnd}
          onClick={() => !atEnd && show(index + 1)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </dialog>
  );
}
