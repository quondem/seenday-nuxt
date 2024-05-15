<template>
  <nav class="nav" data-accordion-menu="1">
    <ul class="nav__lists">
      <NavItem v-for="item of list" :key="item.id" :item="item" />
    </ul>
  </nav>
</template>

<script setup>
import NavItem from "~/widgets/nav/item";

const list = ref([
  {
    id: "seller",
    link: {
      event: false,
      classIcon: "far fa-user-plus",
      title: "Подключение продавца",
      href: ""
    }
  },
  {
    id: "edit",
    link: {
      event: false,
      classIcon: "fas fa-plus",
      title: "Редактировать",
      href: ""
    }
  },
  {
    id: "bank-group",
    link: {
      event: false,
      classIcon: "fas fa-piggy-bank",
      title: "Финансы",
      href: ""
    },
    subMenu: [
      {
        id: "orders",
        link: {
          event: false,
          classIcon: "fas fa-money-bill-alt",
          title: "Заказы клиентов",
          href: ""
        }
      },
      {
        id: "payout",
        link: {
          event: false,
          classIcon: "fas fa-envelope-open-dollar",
          title: "Выплаты",
          href: "/manager?section=payout"
        }
      },
      {
        id: "transactions",
        link: {
          event: false,
          classIcon: "fas fa-receipt",
          title: "Транзакции эквайринга",
          href: "/manager?section=transactions"
        }
      }
    ]
  },
  {
    id: "photosession",
    link: {
      event: false,
      classIcon: "fas fa-camera-retro",
      title: "Фотосессии",
      href: "/manager?section=photosession"
    }
  },
  {
    id: "disc",
    link: {
      event: false,
      classIcon: "far fa-hdd",
      title: "Диск",
      href: "/manager?section=photosession"
    }
  },
  {
    id: "disc",
    link: {
      event: false,
      classIcon: "far fa-money-check",
      title: "Прайсы",
      href: "/manager?section=prices"
    }
  },
  {
    id: "unload",
    link: {
      event: false,
      classIcon: "far fa-dolly-flatbed-alt",
      title: "Выгрузки",
      href: "/manager?section=unload"
    }
  },
  {
    id: "partnershake",
    link: {
      event: false,
      classIcon: "far fa-handshake",
      title: "Партнерка",
      href: ""
    },
    subMenu: [
      {
        id: "list-sellers",
        link: {
          event: false,
          classIcon: "far fa-users",
          title: "Приведенные продавцы",
          href: ""
        }
      },
      {
        id: "info",
        link: {
          event: false,
          classIcon: "fa-light fa-circle-info",
          title: "О партнерке",
          href: "/manager?section=payout"
        }
      }
    ]
  },
  {
    id: "help",
    link: {
      event: false,
      classIcon: "fa-regular fa-question",
      title: "Помощь",
      href: ""
    },
    subMenu: [
      {
        id: "telegram",
        link: {
          event: false,
          classIcon: "fa-brands fa-telegram",
          title: "Telegram канал",
          href: "https://t.me/seenday",
          attrs: {
            target: "_blank"
          }
        }
      },
      {
        id: "info",
        link: {
          event: false,
          classIcon: "fa-brands fa-telegram",
          title: "Telegram чат",
          href: "https://t.me/seendayspace",
          attrs: {
            target: "_blank"
          }
        }
      },
      {
        id: "info",
        link: {
          event: false,
          classIcon: "fa-brands fa-youtube",
          title: "Youtube",
          href: "https://www.youtube.com/channel/UC9f3ZDS7tfaocsdBzShF5Iw",
          attrs: {
            target: "_blank"
          }
        }
      },
      {
        id: "info",
        link: {
          event: false,
          classIcon: "fa-brands fa-vk",
          title: "VK",
          href: "https://vk.com/seenday_com",
          attrs: {
            target: "_blank"
          }
        }
      }
    ]
  },
  {
    id: "photosession",
    link: {
      event: false,
      classIcon: "fas fa-user-astronaut",
      title: "Мои разделы",
      href: ""
    },
    subMenu: [
      {
        id: "telegram",
        link: {
          event: false,
          classIcon: "fas fa-camera-retro",
          title: "Фотосессии",
          href: "/my?section=photosession"
        }
      },
      {
        id: "info",
        link: {
          event: false,
          classIcon: "fas fa-file-invoice-dollar",
          title: "Заказы",
          href: "/my?section=order"
        }
      },
      {
        id: "info",
        link: {
          event: false,
          classIcon: "fas fa-compact-disc",
          title: "Диск с фотографиями",
          href: "/my?section=disc"
        }
      }
    ]
  }
]);
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/nav/nav";
</style>
