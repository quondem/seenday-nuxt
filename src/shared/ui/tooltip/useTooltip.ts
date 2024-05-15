import { useTippy } from "vue-tippy";

import type { TooltipOptions } from "~/shared/ui/tooltip/types";

import "~/shared/assets/styles/components/tippy-tooltip/_tippy-tooltip.scss";
import "tippy.js/dist/tippy.css";

export const useTooltip = (
  target: Element | (() => Element) | Ref<Element> | Ref<Element | undefined>,
  options: TooltipOptions
) => {
  if (!options.theme) {
    options.theme = "black";
  }

  return useTippy(target, options);
};
