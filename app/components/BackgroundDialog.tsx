"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { experience, profile } from "../data/content";

export type BackgroundSelection =
  { kind: "experience"; index: number } | { kind: "education" };

export default function BackgroundDialog({
  selection,
  onClose,
}: {
  selection: BackgroundSelection;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    // Keep the content width unchanged when overflow locking hides the scrollbar.
    document.documentElement.style.scrollbarGutter = "stable";
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  const job =
    selection.kind === "experience" ? experience[selection.index] : null;
  const education = profile.education;
  return (
    <dialog
      ref={dialog}
      className="modal background-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="background-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onCloseRef.current();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onCloseRef.current();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button, a[href], [tabindex="0"]',
          ),
        );
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus({ preventScroll: true });
        }
      }}
    >
      <button
        ref={closeButton}
        className="modal-close"
        aria-label="Close details"
        onClick={onClose}
      >
        <X />
      </button>
      <span className="eyebrow">
        {job ? "PROFESSIONAL EXPERIENCE" : "EDUCATION"} ·{" "}
        {job?.period ?? education.period}
      </span>
      <h2 id="background-dialog-title">
        {job?.company ?? education.institution}
      </h2>
      <div
        className="background-dialog-content custom-modal-scroll"
        tabIndex={0}
        role="region"
        aria-label="Details"
      >
        {job ? (
          <>
            <p>{job.summary}</p>
            <h4>Responsibilities &amp; contributions</h4>
            {job.responsibilities.map((responsibility) => (
              <p key={responsibility}>{responsibility}</p>
            ))}
            <h4>Technologies</h4>
            <div className="project-tags">
              {job.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3>{education.degree}</h3>
            <p>{education.faculty}</p>
            <p>Study period: {education.period}</p>
          </>
        )}
      </div>
    </dialog>
  );
}
