<template>
  <Toggle
    v-bind="forwarded"
    v-model:pressed="pressed"
    class="toggle"
    :data-color="color"
    :class="[`text-${textOrientation}`, { toggle_width_full: width === 'full', 'toggle_full-lg': width === 'full-lg' }]"
  >
    <slot />
  </Toggle>
</template>

<script setup lang="ts">
import {
  Toggle,
  type ToggleProps as PrimitiveToggleProps,
  type ToggleEmits as PrimitiveToggleEmits,
  useForwardPropsEmits
} from "radix-vue";

import type { Props } from "./types";

const props = withDefaults(defineProps<Props & PrimitiveToggleProps>(), {
  color: "purple",
  textOrientation: "center",
  width: "inline"
});
const emit = defineEmits<PrimitiveToggleEmits>();
const pressed = useVModel(props, "pressed", emit);

const primitiveProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, pressed, textOrientation, ...otherProps } = props;

  return otherProps;
});

const forwarded = useForwardPropsEmits(toValue(primitiveProps), emit);
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/toggle";
</style>
