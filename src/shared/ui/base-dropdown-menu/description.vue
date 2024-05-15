<template>
  <div v-if="description" class="base-dropdown-menu-content__description">{{ description }}</div>
</template>

<script setup lang="ts">
defineProps<{ description?: string }>();
</script>
