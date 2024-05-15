<template>
  <div class="topnav">
    <Hamburger />

    <Logo class="topnav__logo" />
  </div>
</template>

<script setup>
import { Hamburger } from "~/shared/ui/hamburger";
import { Logo } from "~/shared/ui/logo";
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/topnav/topnav";
</style>
