<template>
  <BaseDropdownMenuContent>
    <template v-slot="contentAttrs">
      <PopoverContent
        position="popper"
        side="bottom"
        class="combobox-menu-content"
        :class="contentAttrs.class"
        v-bind="contentProps"
      >
        <ComboboxRoot v-model="modelValue" :open="true" :multiple="multiple">
          <div v-if="withSearch" class="combobox-content__search">
            <BaseTextField size="fill" :placeholder="$t('common.search')" editable>
              <template #input="{ inputProps }">
                <ComboboxInput
                  v-bind="inputProps"
                  class="input base-textfield__input"
                  :auto-focus="false"
                  :autofocus="false"
                />
              </template>

              <template #right-section>
                <i class="icon icon_small icon-search" />
              </template>
            </BaseTextField>
          </div>

          <Separator v-if="withSearch" />

          <ScrollArea class="combobox-content__scrollarea">
            <ComboboxEmpty class="combobox-content__empty"> {{ $t("common.not-found") }} </ComboboxEmpty>

            <ComboboxContent class="combobox-content">
              <div role="presentation">
                <slot name="items">
                  <BaseDropdownMenuItem v-for="item in items" :key="item.value">
                    <template v-slot="contentItemAttrs">
                      <ComboboxItem v-bind="contentItemAttrs" :value="item.title || item.value">
                        <BaseDropdownMenuItemInner v-bind="item">
                          <template v-for="(_, slot) in $slots" #[slot]="slotProps">
                            <slot :name="slot" v-bind="slotProps" />
                          </template>

                          <template #item-indicator>
                            <ComboboxItemIndicator>
                              <BaseDropdownMenuItemIndicator />
                            </ComboboxItemIndicator>
                          </template>
                        </BaseDropdownMenuItemInner>
                      </ComboboxItem>
                    </template>
                  </BaseDropdownMenuItem>
                </slot>
              </div>
            </ComboboxContent>
          </ScrollArea>
        </ComboboxRoot>
      </PopoverContent>
    </template>
  </BaseDropdownMenuContent>
</template>

<script setup lang="ts">
import {
  PopoverContent,
  ComboboxEmpty,
  ComboboxItemIndicator,
  ComboboxContent,
  ComboboxInput,
  type ComboboxRootEmits,
  type ComboboxRootProps,
  type PopoverContentProps
} from "radix-vue";

import { BaseTextField } from "../inputs/base-textfield";
import { ScrollArea } from "../scroll-area";
import { Separator } from "../separator";
import type { BaseDropdownMenuItemProps } from "../base-dropdown-menu/types";
import {
  BaseDropdownMenuContent,
  BaseDropdownMenuItem,
  BaseDropdownMenuItemIndicator,
  BaseDropdownMenuItemInner
} from "../base-dropdown-menu";

type ComboboxContentItem = Omit<BaseDropdownMenuItemProps, "value"> &
  Required<Pick<BaseDropdownMenuItemProps, "value">>;

const props = withDefaults(
  defineProps<
    {
      items: ComboboxContentItem[];
      modelValue: string | string[];
      multiple: ComboboxRootProps["multiple"];
      withSearch: boolean;
    } & PopoverContentProps
  >(),
  { avoidCollisions: false, sideOffset: 5, disableOutsidePointerEvents: true }
);
const emit = defineEmits<{ "update:modelValue": ComboboxRootEmits["update:modelValue"] }>();

const modelValue = useVModel(props, "modelValue", emit);

const contentProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, modelValue, multiple, withSearch, ...otherProps } = props;

  return otherProps;
});
</script>
