<template>
  <SelectRoot v-model="modelValue" v-model:open="open" :required="props.required" :disabled="props.readonly">
    <SelectTrigger v-bind="childsProps.trigger" v-model="modelValue" :open="open" :items="items">
      <template v-for="(_, slot) in $slots" #[slot]="slotProps">
        <slot :name="slot" v-bind="slotProps" />
      </template>
    </SelectTrigger>

    <SelectPortal :disabled="!props.withPortal">
      <SelectContent v-bind="childsProps.content">
        <template #items>
          <slot name="items" />
        </template>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script lang="ts" setup>
import { SelectRoot } from "radix-vue";

import SelectContent from "./content.vue";
import SelectTrigger from "./trigger.vue";
import type { SelectContentProps, SelectTriggerProps } from "./types";

defineOptions({ inheritAttrs: false });

type Props = {
  withPortal?: boolean;
} & Omit<SelectTriggerProps, "open"> &
  SelectContentProps;

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  theme: "default",
  size: "medium",
  withPortal: true,
  withCheckmark: true
});
const emit = defineEmits(["update:modelValue"]);
const modelValue = useVModel(props, "modelValue", emit);

const open = ref(false);

const childsProps = computed(() => {
  const {
    avoidCollisions,
    items,
    side,
    sideOffset,
    collisionBoundary,
    collisionPadding,
    description,
    hideWhenDetached,
    align,
    alignOffset,
    sticky,
    forceMount,
    prioritizePosition,
    updatePositionStrategy,
    ...otherProps
  } = props;

  return {
    content: {
      avoidCollisions,
      description,
      items,
      side,
      sideOffset,
      collisionBoundary,
      collisionPadding,
      hideWhenDetached,
      align,
      alignOffset,
      sticky,
      forceMount,
      prioritizePosition,
      updatePositionStrategy
    },
    trigger: otherProps
  };
});
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/select";
</style>
