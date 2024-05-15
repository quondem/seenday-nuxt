<template>
  <div v-if="isLeftVisibile" class="base-dropdown-menu-content__left">
    <i class="icon icon_small" :class="icon" />

    <slot name="content-left" />
  </div>

  <div class="base-dropdown-menu-content__title">
    <span class="base-dropdown-menu-content__title-text">
      <template v-if="slots['default']">
        <slot />
      </template>

      <template v-else-if="title">
        {{ title }}
      </template>

      <template v-else-if="value">
        {{ value }}
      </template>
    </span>
  </div>

  <div v-if="isRightVisible" class="base-dropdown-menu-content__right">
    <template v-if="withIndicator">
      <slot name="item-indicator" />
    </template>

    <slot name="content-right" />
  </div>
</template>

<script setup lang="ts">
import type { BaseDropdownMenuItemProps } from "./types";

const props = withDefaults(defineProps<BaseDropdownMenuItemProps>(), {
  withIndicator: true
});
const { value, title, withIndicator } = toRefs(props);

const slots = defineSlots<{
  "content-left"(): any;
  "content-right"(): any;
  "item-indicator"(): any;
  default(): any;
}>();

const isLeftVisibile = computed(() => {
  return Boolean(slots["content-left"]) || props.icon;
});

const isRightVisible = computed(() => {
  return withIndicator || Boolean(slots["content-right"]);
});
</script>
