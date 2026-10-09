import { useId, useImperativeHandle, useRef } from 'react';
import type { MouseEvent, ReactNode, Ref, SyntheticEvent } from 'react';
import { keepTabInside } from '../lib/dialog';
import './InfoDialog.css';

export interface InfoDialogHandle {
  /** Opens the dialog; focus returns to `trigger` when it closes. */
  open: (trigger?: HTMLElement | null) => void;
}

interface InfoDialogProps {
  ref?: Ref<InfoDialogHandle>;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Modal dialog built on the native <dialog> element: showModal() makes the rest
 * of the page inert and Escape closes it. The element itself is the only source
 * of truth for whether it is open, so React state can never disagree with it.
 */
export function InfoDialog({ ref, title, icon, children }: InfoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const textId = useId();

  useImperativeHandle(ref, () => ({
    open(trigger) {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      triggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
      dialog.showModal();
      closeRef.current?.focus();
    },
  }));

  // Returns focus to the trigger. Runs right after closing, because the
  // dialog's own `close` event can arrive hundreds of milliseconds later;
  // that event only serves as a fallback.
  const restoreFocus = () => {
    triggerRef.current?.focus();
    triggerRef.current = null;
  };

  const close = () => {
    dialogRef.current?.close();
    restoreFocus();
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    close();
  };

  // A click on the backdrop lands on the <dialog> itself; clicks inside land on its content.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="info-dialog"
      aria-labelledby={titleId}
      aria-describedby={textId}
      onCancel={handleCancel}
      onClose={restoreFocus}
      onClick={handleClick}
      onKeyDown={keepTabInside}
    >
      <div className="info-dialog__body">
        {icon && (
          <span className="info-dialog__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <h2 id={titleId} className="info-dialog__title">
          {title}
        </h2>
        <p id={textId} className="info-dialog__text">
          {children}
        </p>
        <div className="info-dialog__actions">
          <button ref={closeRef} type="button" className="btn btn--primary info-dialog__close" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
