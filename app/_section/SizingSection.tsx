"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import type { ModalState } from "../types";

type Props = { state: ModalState; update: <K extends keyof ModalState>(key: K, value: ModalState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Sizing" subtitle="Sizing controls for native modal generation.">
        <Slider label="Width" value={state.width} min={220} max={900} step={1} onChange={(value) => update("width", value)} />
        <Slider label="Height" value={state.height} min={120} max={720} step={1} onChange={(value) => update("height", value)} />
        <Slider label="Gap" value={state.gap} min={0} max={48} step={1} onChange={(value) => update("gap", value)} />
        <Slider label="Padding" value={state.padding} min={8} max={64} step={1} onChange={(value) => update("padding", value)} />
      </SectionCard>
      <SectionCard title="Dialog size & motion" subtitle="Max-width variant, height cap, and entrance.">
        <SegmentedControl
          label="Width variant"
          value={state.widthVariant}
          options={[{ label: "SM", value: "sm" }, { label: "MD", value: "md" }, { label: "LG", value: "lg" }, { label: "XL", value: "xl" }, { label: "Full", value: "full" }]}
          onChange={(value) => update("widthVariant", value as ModalState["widthVariant"])}
        />
        <Slider label="Max height" value={state.maxHeight} min={320} max={900} step={1} onChange={(value) => update("maxHeight", value)} />
        <Slider label="Overlay opacity" value={state.overlayOpacity} min={0} max={1} step={0.01} onChange={(value) => update("overlayOpacity", value)} />
        <Slider label="Close icon size" value={state.closeIconSize} min={10} max={28} step={1} onChange={(value) => update("closeIconSize", value)} />
        <SegmentedControl
          label="Animation"
          value={state.animationType}
          options={[{ label: "Fade", value: "fade" }, { label: "Scale", value: "scale" }, { label: "Slide up", value: "slide-up" }, { label: "Slide down", value: "slide-down" }]}
          onChange={(value) => update("animationType", value as ModalState["animationType"])}
        />
      </SectionCard>
    </div>
  );
}
