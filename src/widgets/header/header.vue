<template>
  <header class="header">
    <HeaderTopnav />

    <HeaderTopbar />
  </header>
</template>

<script setup>
import HeaderTopbar from "./topbar";
import HeaderTopnav from "./topnav";
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/header/header";
</style>
