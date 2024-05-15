<template>
  <div id="app">
    <div class="layout">
      <Header />

      <Navbar />

      <div class="content">
        <slot />

        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Header } from "~/widgets/header";
import { Navbar } from "~/widgets/navbar";
import { Footer } from "~/widgets/footer";
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/layout";
@import "~/shared/assets/styles/components/content/content";
</style>
