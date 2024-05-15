<template>
  <SelectTrigger
    ref="selectTrigger"
    class="select-trigger"
    :class="{ 'select-trigger_pointer': !readonly }"
    :disabled="disabled"
  >
    <slot name="trigger">
      <BaseTextField
        v-bind="baseTextFieldProps"
        v-model="currentItemTitle"
        :pseudo-focus="focused || open"
        tabindex="-1"
      >
        <template v-for="(_, slot) in $slots" #[slot]="slotProps">
          <slot :name="slot" v-bind="slotProps" />
        </template>

        <template v-if="!readonly" #right-section>
          <SelectIcon />
        </template>
      </BaseTextField>
    </slot>
  </SelectTrigger>
</template>

<script setup lang="ts">
import { SelectTrigger } from "radix-vue";

import { BaseTextField } from "~/shared/ui/inputs/base-textfield";

import type { SelectTriggerProps } from "./types";

import { SelectIcon } from ".";

defineOptions({ inheritAttrs: false });

const props = defineProps<SelectTriggerProps>();
const emit = defineEmits(["update:modelValue"]);

const modelValue = useVModel(props, "modelValue", emit);

const baseTextFieldProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, open, readonly, ...otherProps } = props;

  return otherProps;
});

const currentItemTitle = computed(() => {
  return (
    props.items.find(item => {
      return item.value === modelValue.value;
    })?.title || modelValue.value
  );
});

const selectTrigger = ref();

const { focused } = useFocus(selectTrigger);
</script>
