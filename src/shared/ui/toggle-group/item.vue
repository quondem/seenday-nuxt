<template>
  <ToggleGroupItem v-bind="forwarded" as-child>
    <Toggle v-bind="toggleProps">
      <slot />
    </Toggle>
  </ToggleGroupItem>
</template>

<script lang="ts" setup>
import {
  ToggleGroupItem,
  type ToggleGroupItemProps as PrimitiveToggleGroupItemProps,
  useForwardPropsEmits
} from "radix-vue";

import { Toggle, type ToggleProps } from "../toggle";
const props = withDefaults(defineProps<PrimitiveToggleGroupItemProps & ToggleProps>(), {
  color: "purple",
  textOrientation: "center"
});

const primitiveProps = computed(() => {
  const { ...otherProps } = props;

  return otherProps;
});

const toggleProps = computed(() => {
  const { color, textOrientation } = props;

  return { color, textOrientation };
});

const forwarded = useForwardPropsEmits(toValue(primitiveProps));
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/toggle";
</style>
