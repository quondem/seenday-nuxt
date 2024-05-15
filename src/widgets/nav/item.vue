<template>
  <li class="nav__item" :class="{ nav__item_pd: isGap }">
    <a class="nav__item-link" v-bind="item.link.attrs" :class="{ 'nav__item-link_sub-menu': isSubMenu }">
      <span v-if="item.link.classIcon" class="nav__icon">
        <i :class="item.link.classIcon" />
      </span>

      <div class="nav__title">
        {{ item.link.title }}
      </div>

      <div v-if="isSubMenu" class="nav__toggle-sub" data-open="0">
        <span class="nav__arrow-link">
          <i class="far fa-angle-down" />
        </span>
      </div>
    </a>

    <!-- Подменю -->
    <div v-if="isSubMenu" class="nav__sub-menu">
      <ul class="nav__lists">
        <li v-for="subItem of item.subMenu" :key="subItem.id" class="nav__item nav__item_pd">
          <a class="nav__item-link nav__item-link_sub" :href="subItem.link.href">
            <span class="nav__icon">
              <i :class="subItem.link.classIcon" />
            </span>

            <div class="nav__title nav__title_sm">
              {{ subItem.link.title }}
            </div>
          </a>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isGap: {
    type: Boolean,
    default: true
  }
});

const isSubMenu = computed(() => props.item?.subMenu?.length);
</script>
