<template>
  <PopoverRoot v-model:open="isOpen" modal>
    <PopoverTrigger class="combobox-trigger" :disabled="disabled" v-bind="$attrs">
      <slot name="trigger">
        <BaseTextField v-bind="baseTextfieldProps" v-model="triggerValue" tabindex="-1" :pseudo-focus="isOpen">
          <template v-for="(_, slot) in $slots" #[slot]="slotProps">
            <slot :name="slot" v-bind="slotProps" />
          </template>

          <template #right-section>
            <button
              v-if="withClear && modelValue.length > 0"
              class="combobox-trigger__clear"
              :disabled="disabled"
              @click.stop="handleModelClear"
            >
              <i class="icon icon-xmark" />
            </button>

            <div class="combobox-trigger__icon">
              <i class="icon icon-angle-down icon_small" />
            </div>
          </template>
        </BaseTextField>
      </slot>
    </PopoverTrigger>

    <PopoverPortal>
      <Content v-if="innerModelValue" v-model="innerModelValue" v-bind="contentProps" :with-search="withSearch" />
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import { PopoverRoot, PopoverTrigger, type ComboboxRootProps, type PopoverContentProps } from "radix-vue";

import Content from "./content.vue";
import type { ComboboxItems } from "./types";
import { toInnerModelValue, toModelValue } from "./lib";

import { BaseTextField, type BaseTextFieldProps } from "../inputs/base-textfield";

defineOptions({ inheritAttrs: false });

type Props = Omit<BaseTextFieldProps, "widthByContent" | "modelValue"> & {
  items: ComboboxItems;
  modelValue: string | string[];
  multiple?: ComboboxRootProps["multiple"];
  withSearch?: boolean;
  withClear?: boolean;
} & PopoverContentProps;

const props = withDefaults(defineProps<Props>(), { withSearch: true, withClear: true, size: "small" });
const emit = defineEmits(["update:modelValue"]);

/** Contains item value because we want to work only with item value as model-value */
const modelValue = useVModel(props, "modelValue", emit);
/** Containts item title (or value if it has not title), because combobox search works only with item value and we pass title as value */
const innerModelValue = ref(toInnerModelValue(props.items, modelValue.value));

syncRef(innerModelValue, modelValue, {
  deep: true,
  transform: {
    rtl: value => toInnerModelValue(props.items, value),
    ltr: value => toModelValue(props.items, value)
  }
});

const isOpen = ref(false);

const baseTextfieldProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modelValue, items, multiple, ...otherProps } = props;

  return { ...otherProps };
});

const contentProps = computed(() => {
  const {
    items,
    multiple,
    align,
    alignOffset,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    disableOutsidePointerEvents,
    hideWhenDetached,
    side,
    trapFocus,
    sticky,
    updatePositionStrategy
  } = props;

  return {
    items,
    multiple,
    align,
    alignOffset,
    avoidCollisions,
    collisionBoundary,
    sticky,
    collisionPadding,
    updatePositionStrategy,
    disableOutsidePointerEvents,
    hideWhenDetached,
    side,
    trapFocus
  };
});

const triggerValue = computed(() => {
  return props.items
    .reduce((acc, item) => {
      if (modelValue.value.includes(item.value)) {
        acc.push(item.title || item.value);
      }

      return acc;
    }, [] as string[])
    .join(", ");
});

const handleModelClear = () => {
  if (props.multiple) {
    modelValue.value = [];
  } else {
    modelValue.value = "";
  }
};
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/combobox";
</style>
