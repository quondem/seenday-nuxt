<template>
  <main class="main" :class="{ main_fixed: fixedWidth, main_sticky: sticky, small: small }">
    <div>
      <div class="main__fixed">
        <slot name="fixed" />
      </div>
    </div>
    <div>
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ fixedWidth?: boolean; sticky?: boolean; small?: boolean }>(), {
  fixedWidth: true
});
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/main/main.scss";
</style>
