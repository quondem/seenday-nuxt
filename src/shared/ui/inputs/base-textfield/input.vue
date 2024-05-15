<template>
  <input
    v-bind="inputProps"
    ref="input"
    v-model="modelValue"
    class="input base-textfield__input"
    :class="{ 'text-center': textAlign === 'center' }"
    :readonly="props.readonly || !props.editable"
    :autofocus="false"
    @blur="handleBlur"
    @change="handleChange"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { handleOneOrManyEmits } from "~/shared/lib/handle-one-or-many-emit";

import type { BaseTextFieldInputProps } from ".";

const props = defineProps<BaseTextFieldInputProps>();
const emit = defineEmits(["update:modelValue"]);

const modelValue = useVModel(props, "modelValue", emit);

const input = ref<HTMLInputElement>();

const { focused } = useFocus(input);

defineExpose({ focused });

const inputProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modelValue, editable, onBlur, onChange, onInput, ...otherProps } = props;

  return { ...otherProps };
});

const handleBlur = (e: FocusEvent) => {
  handleOneOrManyEmits(e, props.onBlur);
};

const handleChange = (e: Event) => {
  handleOneOrManyEmits(e, props.onChange);
};

const handleInput = (e: Event) => {
  handleOneOrManyEmits(e, props.onInput);
};
</script>
