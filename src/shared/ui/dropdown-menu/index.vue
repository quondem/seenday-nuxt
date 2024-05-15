<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>

<script lang="ts" setup>
import {
  DropdownMenuRoot,
  useForwardPropsEmits,
  type DropdownMenuRootEmits,
  type DropdownMenuRootProps
} from "radix-vue";

const emits = defineEmits<DropdownMenuRootEmits>();
const props = defineProps<DropdownMenuRootProps>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/dropdown-menu";
</style>
