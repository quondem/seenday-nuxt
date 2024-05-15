<template>
  <ScrollAreaRoot type="auto" class="scroll-area">
    <ScrollAreaViewport v-bind="$attrs" class="scroll-area__viewport" @focus="e => emit('viewport-focused', e)">
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar orientation="vertical" class="scroll-area__scrollbar">
      <ScrollAreaThumb class="scroll-area__thumb" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaThumb, ScrollAreaScrollbar, ScrollAreaViewport } from "radix-vue";

defineOptions({ inheritAttrs: false });
const emit = defineEmits(["viewport-focused"]);

const viewport = ref();

defineExpose({ viewport: viewport.value });
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/scroll-area";
</style>
