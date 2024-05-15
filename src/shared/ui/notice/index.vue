<template>
  <div
    class="notice"
    :data-color="props.color"
    :class="[`notice_text-${props.textOrientation}`, `notice_${size}`, { notice_inline: width === 'inline' }]"
  >
    <slot name="icon">
      <i v-if="icon" class="icon flex notice__icon" :class="[icon, `text-${iconFontSize}`]" />
    </slot>

    <div class="notice__text">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?:
      | "yellow"
      | "gray"
      | "purple"
      | "light-purple"
      | "orange"
      | "red"
      | "black"
      | "light-blue"
      | "very-light-blue"
      | "green"
      | "white"
      | "tinkoff"
      | "transparent"
      | "blue";
    textOrientation?: "left" | "center" | "right";
    size?: "medium" | "large" | "small" | "extra-small";
    icon?: string;
    iconSize?: "small" | "large" | "medium";
    width?: "inline" | "full";
  }>(),
  { color: "light-purple", textOrientation: "center", size: "medium", iconSize: "small", width: "full" }
);

const iconSizeToFontSize = {
  small: 10,
  medium: 12,
  large: 16
};

const iconFontSize = computed(() => {
  return iconSizeToFontSize[props.iconSize];
});
</script>

<style>
@import "~/shared/assets/styles/components/notice/_notice.scss";
@import "~/shared/assets/styles/components/notice/_data-color.scss";
</style>
