<template>
  <Separator class="separator" v-bind="forward" />
</template>

<script lang="ts" setup>
import { Separator, useForwardProps, type SeparatorProps } from "radix-vue";

const props = defineProps<SeparatorProps>();

const forward = useForwardProps(props);
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/separator";
</style>
