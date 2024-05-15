<template>
  <Wrapper v-bind="wrapperProps" @mousedown="handleTextfieldClicked">
    <div class="base-textfield__content" @mousedown.stop>
      <div v-if="isLeftVisible" class="base-textfield__left-section">
        <slot name="left-section" />
      </div>

      <div class="base-textfield__inner">
        <label v-if="label" class="base-textfield__label" :class="{ 'base-textfield__label_required': required }">
          {{ label }}

          <template v-if="required">*</template>
        </label>

        <div class="base-textfield__input-container">
          <div v-if="widthByContent" class="base-textfield__pseudocontent">
            {{ modelValue }}
          </div>

          <!-- Slot for ComboboxInput and similar components -->
          <slot name="input" :input-props="inputProps">
            <Input v-bind="inputProps" ref="input" v-model="modelValue" />
          </slot>
        </div>
      </div>

      <div v-if="isRightVisible" class="base-textfield__right-section">
        <div v-if="withCheckmark" class="base-textfield__check">
          <i class="fa-regular fa-check" />
        </div>

        <Hint v-if="hint" :content="hint" class="base-textfield__hint" @mousedown.stop @pointerdown.stop />

        <slot name="right-section" />
      </div>
    </div>
  </Wrapper>
</template>

<script lang="ts" setup>
import { Hint } from "~/shared/ui/hint";

import Wrapper from "./wrapper.vue";
import type { BaseTextFieldProps, InputProps, WrapperProps } from "./types";
import Input from "./input.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BaseTextFieldProps>(), {
  size: "medium",
  type: "text",
  theme: "default"
});
const emit = defineEmits(["update:modelValue"]);

const modelValue = useVModel(props, "modelValue", emit);

const slots = useSlots();

const isLeftVisible = computed(() => {
  return Boolean(slots["left-section"]);
});

const isRightVisible = computed(() => {
  return slots["right-section"] || props.withCheckmark || props.hint;
});

const input = ref<InstanceType<typeof Input>>();

defineExpose({ input });

const handleTextfieldClicked = (event: MouseEvent) => {
  if (!props.readonly && input.value) {
    event.preventDefault();
    input.value.focused = true;
  }
};

const attrs = useAttrs();

const inputProps: ComputedRef<InputProps> = computed(() => {
  const { onInput, onBlur, onChange, disabled, readonly, required, type, placeholder, textAlign, editable } = props;

  return { onInput, onBlur, onChange, disabled, readonly, required, type, placeholder, textAlign, editable, ...attrs };
});

const wrapperProps: ComputedRef<WrapperProps> = computed(() => {
  const { modelValue, label, size, pseudoFocus, error, valid, theme, disabled, readonly, widthByContent } = props;

  return { modelValue, label, size, pseudoFocus, error, valid, theme, disabled, readonly, widthByContent };
});
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/base-textfield";
</style>
