<template>
  <div class="block status-card" :data-status="props.status">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { StatusColorValues } from "~/shared/config/status-to-color";

const props = withDefaults(defineProps<{ status?: StatusColorValues }>(), {
  status: "idle"
});
</script>

<style>
@import "~/shared/assets/styles/components/status-card.scss";
</style>
