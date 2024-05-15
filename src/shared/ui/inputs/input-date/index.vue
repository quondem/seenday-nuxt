<template>
  <VueDatePicker
    v-model="modelValue"
    text-input
    locale="ru"
    is-24
    :disabled="props.disabled"
    select-text="Выбрать"
    cancel-text="Закрыть"
    :clearable="false"
    position="left"
    v-bind="vueDatePickerProps"
    @blur="handleBlur"
  >
    <template #dp-input="{ value, isMenuOpen, toggleMenu }">
      <div class="input-date">
        <BaseTextField
          :model-value="value"
          v-bind="baseTextFieldProps"
          :pseudo-focus="isMenuOpen"
          @keydown.enter="toggleMenu"
          @focus="toggleMenu"
        >
          <template #right-section>
            <i class="icon icon_small icon-calendar-alt" />
          </template>
        </BaseTextField>
      </div>
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import VueDatePicker, { type VueDatePickerProps } from "@vuepic/vue-datepicker";

import { BaseTextField, type BaseTextFieldProps } from "~/shared/ui/inputs/base-textfield";

import { handleOneOrManyEmits } from "~/shared/lib/handle-one-or-many-emit";

defineOptions({ inheritAttrs: false });

type Props = Omit<BaseTextFieldProps, "modelValue"> & { modelValue: VueDatePickerProps["modelValue"]; range?: boolean };

const props = withDefaults(defineProps<Props>(), { required: true, withCheckmark: true });
const emit = defineEmits(["update:modelValue"]);
const modelValue = useVModel(props, "modelValue", emit);

const attrs = useAttrs();
const baseTextFieldProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modelValue, onBlur, ...otherProps } = props;

  return { ...attrs, ...otherProps };
});

const format = computed(() => {
  if (props.range) {
    return "dd.MM.yyyy";
  }

  return "dd.MM.yyyy 'в' HH:mm";
});

const vueDatePickerProps = computed(() => {
  const { range } = props;

  return { range, format: format.value };
});

const handleBlur = (e: Event) => {
  handleOneOrManyEmits(e, props.onBlur);
};
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/input-date";
</style>
