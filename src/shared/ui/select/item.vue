<template>
  <BaseDropdownMenuItem>
    <template v-slot="menuItemAttrs">
      <SelectItem v-bind="forward" :class="menuItemAttrs.class">
        <BaseDropdownMenuItemInner :value="value" :icon="icon" :title="title">
          <template v-for="(_, slot) in $slots" #[slot]="slotProps">
            <slot :name="slot" v-bind="slotProps" />
          </template>
        </BaseDropdownMenuItemInner>
      </SelectItem>
    </template>
  </BaseDropdownMenuItem>
</template>

<script lang="ts" setup>
import { SelectItem, useForwardPropsEmits, type SelectItemProps } from "radix-vue";

import type { BaseDropdownMenuItemProps } from "../base-dropdown-menu/types";
import { BaseDropdownMenuItem, BaseDropdownMenuItemInner } from "../base-dropdown-menu";

type Props = SelectItemProps & BaseDropdownMenuItemProps;

const props = defineProps<Props>();

const primitiveProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, icon, withIndicator, ...otherProps } = props;

  return otherProps;
});

const forward = useForwardPropsEmits(toValue(primitiveProps));
</script>
