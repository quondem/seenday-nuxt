<template>
  <component :is="tagname" v-if="!to" :class="buttonClass" :data-color="buttonColor">
    <Icon v-if="icon && iconSide === 'left'" v-bind="iconProps" />

    <slot v-if="!pending" />
    <Spinner v-else />

    <Icon v-if="icon && iconSide === 'right'" v-bind="iconProps" />
  </component>

  <NuxtLink v-else :class="buttonClass" :to="to" :target="target" :data-color="buttonColor" :external="external">
    <Icon v-if="icon && iconSide === 'left'" v-bind="iconProps" />

    <slot v-if="!pending" />
    <Spinner v-else />

    <Icon v-if="icon && iconSide === 'right'" v-bind="iconProps" />
  </NuxtLink>
</template>

<script setup lang="ts">
import Spinner from "./spinner.vue";
import Icon from "./icon.vue";
import type { ButtonProps } from "./types";

type Props = ButtonProps;

const props = withDefaults(defineProps<Props>(), {
  tagname: "button",
  target: "_self",
  color: "purple",
  size: "default",
  mode: "normal",
  width: "inline",
  textOrientation: "center",
  iconSide: "left",
  iconSize: "medium"
});

const buttonClass = computed(() => [
  props.size !== "default" && `button_size_${props.size}`,
  {
    multicolor: props.multicolor,
    "text-left": props.textOrientation === "left",
    "text-center": props.textOrientation === "center",
    button: props.mode === "normal" || props.mode === "text",
    "button-icon": props.mode === "icon",
    "button-text": props.mode === "text",
    button_width_full: props.width === "full",
    "button_width_full-lg": props.width === "full-lg",
    disabled: props.disabled,
    "button button_tag": props.mode === "tag"
  }
]);

const buttonColor = computed(() => (props.mode !== "text" ? props.color : null));

const iconProps = computed(() => {
  const { icon, iconSide, iconSize } = props;

  return { icon, iconSide, iconSize };
});
</script>
