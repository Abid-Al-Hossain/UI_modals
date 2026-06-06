"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ModalState } from "../types";

function isInitiallyOpen(state: ModalState) {
  return state.defaultOpen ?? state.previewState === "open";
}

function panelStyle(state: ModalState): CSSProperties {
  return {
    width: state.width,
    maxWidth: "calc(100vw - 48px)",
    maxHeight: "calc(100vh - 64px)",
    overflowY: state.scrollable ? "auto" : "visible",
    padding: state.padding,
    display: "grid",
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.55 : 1,
  };
}

export default function LivePreview({ state }: { state: ModalState }) {
  const initialOpen = isInitiallyOpen(state);
  const [open, setOpen] = useState(initialOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = `${state.id}-title`;
  const descriptionId = `${state.id}-description`;
  const placement = state.placement ?? "center";

  useEffect(() => setOpen(initialOpen), [initialOpen]);

  useEffect(() => {
    if (!open || !state.closeOnEscape) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, state.closeOnEscape]);

  const closeModal = () => {
    setOpen(false);
    if (state.focusReturn) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border p-6" style={{ borderColor: state.border, background: "linear-gradient(135deg, rgba(2,6,23,.94), rgba(30,41,59,.72))" }}>
      <button ref={triggerRef} type="button" disabled={state.disabled} onClick={() => setOpen(true)} className="rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg" style={{ background: state.accent, color: "#020617" }}>
        {state.triggerLabel || "Open modal"}
      </button>
      <p className="mt-4 max-w-md text-sm" style={{ color: state.muted }}>Preview state: {open ? "open" : "closed"}. Escape close is {state.closeOnEscape ? "enabled" : "disabled"}; outside close is {state.closeOnOutside ? "enabled" : "disabled"}.</p>
      {open && (
        <div
          onMouseDown={(event) => {
            if (state.closeOnOutside && event.target === event.currentTarget) closeModal();
          }}
          className="absolute inset-0 grid p-6"
          style={{
            placeItems: placement === "center" ? "center" : placement === "top" ? "start center" : "end center",
            background: state.showOverlay ? "rgba(15, 23, 42, .58)" : "transparent",
          }}
        >
          <section role="dialog" aria-modal={state.modal} aria-label={state.ariaLabel} aria-labelledby={titleId} aria-describedby={descriptionId} tabIndex={state.tabIndex} style={panelStyle(state)}>
            <button type="button" aria-label="Close modal" onClick={closeModal} className="rounded-full border px-3 py-1 text-xs font-semibold" style={{ justifySelf: "end", borderColor: state.border, color: state.foreground }}>
              Close
            </button>
            <h3 id={titleId} style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
            <p id={descriptionId} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
            <div className={state.actionLayout === "column" ? "grid gap-2" : "flex flex-wrap gap-2"}>
              <button type="button" className="rounded-xl px-4 py-2" style={{ background: state.accent, color: "#020617" }}>{state.label}</button>
              <button type="button" className="rounded-xl border px-4 py-2" style={{ borderColor: state.border }}>Cancel</button>
            </div>
            <p className="text-xs" style={{ color: state.muted }}>{state.helper} Focus trap is not implemented; focus return is {state.focusReturn ? "enabled" : "disabled"}.</p>
          </section>
        </div>
      )}
    </div>
  );
}
