<template>
  <div class="empty">
    <img v-if="!props.withoutImage" src="@/shared/assets/images/no-photo-main.png" />

    <Notice color="transparent">
      <slot />
    </Notice>
  </div>
</template>

<script setup lang="ts">
import { Notice } from "../notice";

const props = defineProps<{ withoutImage?: boolean }>();
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/empty";
</style>
