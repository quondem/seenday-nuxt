<template>
  <BaseDropdownMenuItem :theme="theme">
    <template v-slot="menuItemAttrs">
      <DropdownMenuItem v-bind="forward" :class="menuItemAttrs.class">
        <BaseDropdownMenuItemInner>
          <template v-for="(_, slot) in $slots" #[slot]="slotProps">
            <slot :name="slot" v-bind="slotProps" />
          </template>
        </BaseDropdownMenuItemInner>
      </DropdownMenuItem>
    </template>
  </BaseDropdownMenuItem>
</template>

<script lang="ts" setup>
import {
  DropdownMenuItem,
  useForwardPropsEmits,
  type DropdownMenuItemEmits,
  type DropdownMenuItemProps
} from "radix-vue";

import { BaseDropdownMenuItem, BaseDropdownMenuItemInner } from "../base-dropdown-menu";

type Props = DropdownMenuItemProps & { theme?: "default" | "danger" };

const props = withDefaults(defineProps<Props>(), { theme: "default" });
const emit = defineEmits<DropdownMenuItemEmits>();

const primitiveProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, ...otherProps } = props;

  return otherProps;
});

const forward = useForwardPropsEmits(toValue(primitiveProps), emit);
</script>
