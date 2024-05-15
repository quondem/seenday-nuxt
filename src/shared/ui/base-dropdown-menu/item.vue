<template>
  <slot
    :class="['base-dropdown-menu-content__item', theme !== 'default' && `base-dropdown-menu-content__item_${theme}`]"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ theme?: "danger" | "default" }>(), { theme: "default" });
</script>
