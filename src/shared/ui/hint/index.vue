<template>
  <Tooltip :content="content" class="hint" :class="[`hint_${size}`]" :append-to="props.appendTo">
    <i class="icon icon-question-circle hint__icon" />

    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

import { Tooltip } from "~/shared/ui/tooltip";

const props = withDefaults(
  defineProps<{ content?: string; size?: "small" | "medium"; appendTo?: "body" | "parent" }>(),
  {
    size: "small",
    appendTo: "parent"
  }
);
const { content } = toRefs(props);
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/hint";
</style>
