<template>
  <div class="navbar-user">
    <NavbarUserControl />

    <div class="navbar-user__list">
      <NavbarUserList />
    </div>
  </div>
</template>

<script setup>
import NavbarUserControl from "./control.vue";
import NavbarUserList from "./list.vue";
</script>
