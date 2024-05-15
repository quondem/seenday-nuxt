<template>
  <form class="search" @submit.prevent="emit('submit')">
    <div class="search__data">
      <div v-if="isTypeSelectVisible" class="search__select-trigger">
        <Select
          v-model="type"
          :items="selectItems"
          theme="solid"
          size="fill"
          :with-checkmark="false"
          :width-by-content="selectDisplayValue === 'text'"
        >
          <template v-if="selectDisplayValue === 'icon'" #input>
            <i class="icon icon-filter icon-filter__regular icon_small" />
          </template>
        </Select>
      </div>

      <div class="search__input-wrapper">
        <input
          v-model="searchQuery"
          v-bind="$attrs"
          class="search__input"
          :placeholder="searchTypes[type].placeholder"
        />

        <button v-if="searchQuery" type="button" class="search__clear" @click="handleClearClicked">
          <i class="icon icon-xmark" />
        </button>
      </div>
    </div>

    <button type="submit" class="search__submit">
      <i class="icon icon-search" />
    </button>
  </form>
</template>

<script lang="ts" setup>
import { Select } from "~/shared/ui/select";
import type { SelectItems } from "~/shared/ui/select/types";

import type { SearchTypes } from "./type";

defineOptions({ inheritAttrs: false });

type Props = {
  searchQuery: string;
  searchTypes: SearchTypes;
  searchType: keyof SearchTypes;
  selectDisplayValue?: "icon" | "text";
};

const props = withDefaults(defineProps<Props>(), { selectDisplayValue: "text" });

const emit = defineEmits(["update:searchQuery", "update:searchType", "submit", "clear"]);

const searchQuery = useVModel(props, "searchQuery", emit);
const type = useVModel(props, "searchType", emit);

const handleClearClicked = () => {
  emit("clear");

  searchQuery.value = "";
};

const selectItems: Ref<SelectItems> = computed(() => {
  return Object.keys(props.searchTypes).map(type => {
    return { value: type, title: props.searchTypes[type].title };
  });
});

const isTypeSelectVisible = computed(() => {
  return Object.keys(props.searchTypes).length > 1;
});
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/search.scss";
</style>
