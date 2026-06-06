"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Switch from "@/components/shared/input/Switch";
import type { ModalState } from "../types";

type Props = { state: ModalState; update: <K extends keyof ModalState>(key: K, value: ModalState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native modal generation."><Input label="Accessible label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
<Switch label="Focus return" checked={state.focusReturn} onChange={(value) => update("focusReturn", value)} />
<div className="rounded-2xl border p-3 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No fake focus trap is advertised. The React export returns focus to the trigger when enabled; add a real trap only if your app needs one.</div></SectionCard>;
}
