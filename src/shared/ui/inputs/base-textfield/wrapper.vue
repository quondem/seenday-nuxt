<template>
  <div
    class="base-textfield"
    :class="[
      {
        fill: modelValue,
        error: error,
        success: valid && modelValue,
        'base-textfield_disabled': disabled,
        'base-textfield_with-label': label,
        'base-textfield_readonly': readonly,
        'base-textfield_focused': pseudoFocus,
        'base-textfield_width-by-content': widthByContent
      },
      size && `base-textfield_${size}`,
      theme !== 'default' && `base-textfield_${theme}`
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type WrapperProps } from "./types";

defineProps<WrapperProps>();
</script>
