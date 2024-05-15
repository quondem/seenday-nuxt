<template>
  <DropdownMenuPortal>
    <BaseDropdownMenuContent>
      <template v-slot="contentAttrs">
        <DropdownMenuContent class="dropdown-menu" :class="contentAttrs.class" :side-offset="5" v-bind="forwarded">
          <slot />
        </DropdownMenuContent>
      </template>
    </BaseDropdownMenuContent>
  </DropdownMenuPortal>
</template>

<script setup lang="ts">
import {
  DropdownMenuContent,
  useForwardPropsEmits,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps
} from "radix-vue";

import { BaseDropdownMenuContent } from "../base-dropdown-menu";

defineOptions({ inheritAttrs: false });

type Props = DropdownMenuContentProps & {
  description?: string;
};

const props = defineProps<Props>();
const emits = defineEmits<DropdownMenuContentEmits>();

const primitiveProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { description, ...otherProps } = props;

  return otherProps;
});

const forwarded = useForwardPropsEmits(toValue(primitiveProps), emits);
</script>
