<template>
  <BaseDropdownMenuContent>
    <template v-slot="contentAttrs">
      <SelectContent
        class="select-content"
        v-bind="selectContentProps"
        :class="contentAttrs.class"
        position="popper"
        :side-offset="5"
        :side="side"
      >
        <SelectViewport>
          <BaseDropdownMenuDescription :description="description" />

          <slot name="items">
            <BaseDropdownMenuItem v-for="item in items" :key="item.value">
              <template v-slot="contentItemAttrs">
                <SelectItem :class="contentItemAttrs.class" :value="item.value">
                  <BaseDropdownMenuItemInner v-bind="item">
                    <template #item-indicator>
                      <SelectItemIndicator>
                        <BaseDropdownMenuItemIndicator />
                      </SelectItemIndicator>
                    </template>
                  </BaseDropdownMenuItemInner>
                </SelectItem>
              </template>
            </BaseDropdownMenuItem>
          </slot>
        </SelectViewport>
      </SelectContent>
    </template>
  </BaseDropdownMenuContent>
</template>

<script setup lang="ts">
import { SelectContent, SelectItem, SelectItemIndicator } from "radix-vue";

import type { SelectContentProps } from "./types";

import {
  BaseDropdownMenuContent,
  BaseDropdownMenuDescription,
  BaseDropdownMenuItem,
  BaseDropdownMenuItemIndicator,
  BaseDropdownMenuItemInner
} from "../base-dropdown-menu";

const props = defineProps<SelectContentProps>();

const selectContentProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, ...otherProps } = props;

  return otherProps;
});

const selectContentWidth = computed(() => {
  return props.contentWidth ? props.contentWidth + "px" : "100%";
});
</script>

<style lang="scss">
.select-content {
  width: v-bind(selectContentWidth);
}
</style>
