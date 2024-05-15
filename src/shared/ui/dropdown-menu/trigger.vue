<template>
  <DropdownMenuTrigger as-child>
    <slot />
  </DropdownMenuTrigger>
</template>

<script lang="ts" setup>
import { DropdownMenuTrigger } from "radix-vue";
</script>
