<template>
  <tippy
    :content="props.content"
    :theme="props.theme"
    :trigger="props.trigger"
    :z-index="40"
    :append-to="appendTo"
    :placement="placement"
  >
    <slot />

    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
  </tippy>
</template>

<script setup lang="ts">
import "tippy.js/dist/tippy.css";
import { Tippy } from "vue-tippy";

import { type TooltipOptions } from "./types";

const props = withDefaults(
  defineProps<{
    content?: string;
    trigger?: string;
    theme?: TooltipOptions["theme"];
    appendTo?: "body" | "parent";
    placement?: TooltipOptions["placement"];
  }>(),
  {
    trigger: "mouseenter focus",
    theme: "black",
    appendTo: "parent"
  }
);

const appendTo = computed(() => {
  return props.appendTo === "body" ? document.body : "parent";
});
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/tippy-tooltip/tippy-tooltip.scss";
</style>
