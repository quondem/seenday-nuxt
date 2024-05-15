<template>
  <div class="navbar-user-list">
    <NavItem v-for="item of list" :key="item.id" :item="item" :is-gap="false" />
  </div>
</template>

<script setup>
import NavItem from "~/widgets/nav/item.vue";

const list = reactive([
  {
    id: "balance",
    link: {
      event: false,
      classIcon: "fas fa-plus",
      title: "Пополнить баланс"
    }
  },
  {
    id: "edit",
    link: {
      event: false,
      classIcon: "fas fa-plus",
      title: "Редактировать"
    }
  },
  {
    id: "exit",
    link: {
      event: false,
      classIcon: "far fa-sign-out",
      title: "Выход"
    }
  }
]);
</script>
