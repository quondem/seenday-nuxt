<template>
  <ToggleGroupRoot v-bind="forwarded">
    <slot />
  </ToggleGroupRoot>
</template>

<script lang="ts" setup>
import { useForwardPropsEmits, type ToggleGroupRootEmits, type ToggleGroupRootProps, ToggleGroupRoot } from "radix-vue";

const emit = defineEmits<ToggleGroupRootEmits>();
const props = defineProps<ToggleGroupRootProps>();

const forwarded = useForwardPropsEmits(props, emit);
</script>
