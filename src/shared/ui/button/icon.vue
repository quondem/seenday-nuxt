<template>
  <i
    class="icon button__icon"
    :class="[
      icon,
      iconSize === 'medium' ? 'icon_small' : `button__icon_${iconSize}`,
      { button__icon_right: iconSide === 'right' }
    ]"
  />
</template>

<script setup lang="ts">
import type { ButtonIconProps } from "./types";

defineProps<ButtonIconProps>();
</script>
