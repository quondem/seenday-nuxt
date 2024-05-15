<template>
  <div class="logo">
    <img class="logo__img" :src="imageByVariantMap[variant]" alt="Логотип Seenday" v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import logoWhite from "~/shared/assets/images/logo-white.svg";
import logoBlack from "~/shared/assets/images/logo-black.svg";

withDefaults(defineProps<{ variant?: "white" | "black" }>(), { variant: "white" });

const imageByVariantMap = {
  white: logoWhite,
  black: logoBlack
};
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/logo/logo.scss";
</style>
