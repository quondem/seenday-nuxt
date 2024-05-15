import type { TippyOptions } from "vue-tippy";

export type TooltipOptions = Omit<TippyOptions, "theme"> & {
  theme?: "black" | "purple" | "grey";
};
