"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { ModalState } from "../types";

type Props = { state: ModalState; update: <K extends keyof ModalState>(key: K, value: ModalState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return <SectionCard title="Behavior" subtitle="Behavior controls for native modal generation."><Switch label="Close on Escape" checked={state.closeOnEscape} onChange={(value) => update("closeOnEscape", value)} />
<Switch label="Close outside" checked={state.closeOnOutside} onChange={(value) => update("closeOnOutside", value)} />
<Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} /></SectionCard>;
}
