<template>
  <main>
    <fixedLeftColumn>
      <template #fixed>
        <div class="block">
          <Button class="back-button" color="gray" @click="routerBack">Назад</Button>
        </div>
        <div class="block">
          <InputDate
            v-model="inputDateValue"
            placeholder="Период"
            :range="true"
            @update:model-value="handleDateChange"
          />
          <Search
            v-model:search-query="searchQueryValue"
            v-model:search-type="searchTypeValue"
            v-model:search-types="searchTypes"
            select-display-value="icon"
            @submit="onSubmitSearch"
            @clear="onClearSearch"
          />
          <div class="sort-buttons">
            <ToggleGroup v-model="selectedSortValue" class="sort-buttons" type="multiple">
              <Toggle v-model:pressed="selectAll" color="gray">Все</Toggle>
              <ToggleGroupItem v-for="item of sortButtons" :key="item.name" color="gray" :value="item.name">
                <i v-if="item.icon" :class="item.icon" />
                <span v-else>{{ item.name }}</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div class="block">
          <Select v-model="selectedYearValue" label="Год" :items="selectItems" />
          <div class="year-buttons">
            <Button width="full" @click="onSubmitYear">Показать</Button>
            <Button width="full" @click="onClearYear">Сбросить</Button>
          </div>
          <p class="text-9 text-center">
            Обычный вывод показывает 250 заказов, чтобы снять ограничение и показать до 5000 заказов нужно выбрать год.
          </p>
        </div>
      </template>
      <template #default>
        <div v-if="orders?.length">
          <StatusCard v-for="order in orders" :key="order.id" status="success" @click="openOrder(order.id)"
            >№: {{ order.id }}
          </StatusCard>
        </div>
        <Empty v-else>Заказов ещё нет</Empty>
      </template>
    </fixedLeftColumn>

    <div v-if="orderOpen" class="order-one">
      <Button class="order-one__close" @click="setRouterQuery({ id_orders: undefined })">Закрыть</Button>
      <span v-if="orderOne">Номер заказа {{ orderOne }}</span>
      <span v-else>Заказ не найден</span>
    </div>
  </main>
</template>

<script setup lang="ts">
import moment from "moment";
import type { LocationQueryRaw } from "vue-router";

import type { SearchType } from "~/shared/ui/search/type";
import fixedLeftColumn from "~/shared/ui/templates/fixed-left-column.vue";
import { InputDate } from "~/shared/ui/inputs/input-date";
import { Search } from "~/shared/ui/search";
import { Toggle } from "~/shared/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "~/shared/ui/toggle-group";
import { Select } from "~/shared/ui/select";
import { Button } from "~/shared/ui/button";
import { StatusCard } from "~/shared/ui/status-card";
import { Empty } from "~/shared/ui/empty";

import { useOrdersStore } from "~/shared/store/orders";
import type { Order } from "~/shared/api/orders/orders.types";

enum OrderSearchType {
  orderNumber = "order_number",
  psid = "psid",
  clientId = "client_id",
  phone = "phone",
  email = "email",
  payer = "payer"
}

type SortButton = {
  name: string;
  text?: string;
  icon?: string;
};

const routerBack = () => {
  router.go(-1);
};

const router = useRouter();
const store = useOrdersStore();

onMounted(async () => {
  await store.getOrders();
});

const orderOpen = computed(() => router.currentRoute.value?.query?.id_orders);
const orderOne = computed(() => store.orders.find(order => order.id === orderOpen.value)?.id);

const openOrder = (id: string) => {
  // router.replace({
  //   name: "id_orders",
  //   query: router.currentRoute.value.query,
  //   params: {
  //     id_orders: id
  //   }
  // });
  setRouterQuery({ id_orders: id });
};

const queryFilters = computed(() => {
  const query = router.currentRoute.value.query;

  return {
    date_start: query.date_start ? query.date_start : undefined,
    date_finish: query.date_finish ? query.date_finish : undefined,
    search_value: query.search_value ? query.search_value : undefined,
    search_type: query.search_type ? query.search_type : undefined,
    year: query.year ? query.year : undefined
  };
});

const parseDate = (date: string) => {
  const dateAndTime = date.replace(" в ", " ");
  const [parsedDate, parsedTime] = dateAndTime.split(" ");
  const [day, month, year] = parsedDate.split(".");
  const formatDateAndTime = `${year}-${month}-${day}T${parsedTime}`;
  return new Date(formatDateAndTime);
};

const orders = computed(() => {
  let filteredOrders: Order[] = store.orders;

  if (Object.keys(queryFilters.value)?.length > 0) {
    if (queryFilters.value.date_start && !queryFilters.value.date_finish) {
      filteredOrders = filteredOrders.filter(order =>
        moment(parseDate(order?.date)).isSameOrAfter(String(queryFilters.value.date_start))
      );
    }
    if (queryFilters.value.date_start && queryFilters.value.date_finish) {
      filteredOrders = filteredOrders.filter(
        order =>
          moment(parseDate(order?.date)).isSameOrAfter(String(queryFilters.value.date_start)) &&
          moment(parseDate(order?.date)).isSameOrBefore(String(queryFilters.value.date_finish))
      );
    }

    if (queryFilters.value.year) {
      filteredOrders = filteredOrders.filter(
        order => String(parseDate(order.date).getFullYear()) === queryFilters.value.year
      );
    }

    if (queryFilters.value.search_value) {
      const currentSearchType = queryFilters.value.search_type as OrderSearchType;
      const searchValue = queryFilters.value.search_value;
      filteredOrders = filteredOrders.filter(order => {
        if (currentSearchType === OrderSearchType.orderNumber) {
          return order.id.includes(String(searchValue));
        } else if (currentSearchType === OrderSearchType.psid) {
          return order.psid.includes(String(searchValue));
        } else if (currentSearchType === OrderSearchType.clientId) {
          return order.client.includes(String(searchValue));
        } else if (currentSearchType === OrderSearchType.email) {
          return order.email_payer.includes(String(searchValue));
        } else if (currentSearchType === OrderSearchType.phone) {
          return order.phone.includes(String(searchValue));
        } else if (currentSearchType === OrderSearchType.payer) {
          return order.fio_payer.includes(String(searchValue)) || order.fi_child.includes(String(searchValue));
        } else {
          return false;
        }
      });
    }
  }

  return filteredOrders;
});

const setRouterQuery = (query: LocationQueryRaw) => {
  const currentRoute = router.currentRoute.value.path;
  const newQuery = {
    ...router.currentRoute.value.query,
    ...query
  };

  router.replace({
    path: currentRoute,
    query: newQuery
  });
};

// sort

const selectedSortValue = ref<string[]>([]);
const sortButtons = ref<SortButton[]>([
  { name: "1", icon: "fa-regular fa-crown" },
  { name: "2", icon: "fa-regular fa-thumbs-down" },
  { name: "3", icon: "fa-regular fa-thumbs-up" },
  { name: "4", icon: "fa-regular fa-briefcase" },
  { name: "5", icon: "fa-regular fa-cloud-arrow-up" },
  { name: "6", icon: "fa-regular fa-truck" },
  { name: "7", icon: "fa-regular fa-money-bill-1" },
  { name: "8", icon: "fa-regular fa-ruble-sign" }
]);

const selectAll = ref<boolean>(false);
const toggleAll = (bool: boolean) => {
  if (bool) {
    selectedSortValue.value = Object.values(sortButtons.value).map(item => item.name);
  } else {
    selectedSortValue.value = [];
  }
};
watch(selectAll, bool => toggleAll(bool));

// data picker

const inputDateValue = ref<Date[]>([]);
const routeStart: Date = moment(String(router.currentRoute.value?.query?.date_start), "YYYYMMDD").toDate();
const routeFinish: Date = moment(String(router.currentRoute.value?.query?.date_finish), "YYYYMMDD").toDate();
if (routeStart) {
  inputDateValue.value[0] = routeStart;
}
if (routeFinish) {
  inputDateValue.value[1] = routeFinish;
}

const handleDateChange = (value: Date[]) => {
  const formatDate = (date: Date): string => {
    const time = moment(date);
    return time.format("YYYYMMDD");
  };

  let dateStart: Date | null = null;
  let dateFinish: Date | null = null;

  if (value?.length > 0) {
    dateStart = value[0] ? new Date(value[0]) : null;
    dateFinish = value[1] ? new Date(value[1]) : null;
  }

  const query = {
    date_start: dateStart ? formatDate(dateStart) : undefined,
    date_finish: dateFinish ? formatDate(dateFinish) : undefined
  };
  setRouterQuery(query);
};

// search

const searchQueryValue = ref<string>("");
if (router.currentRoute.value?.query?.search_value) {
  searchQueryValue.value = String(router.currentRoute.value?.query?.search_value);
}

const searchTypeValue = ref<OrderSearchType>(OrderSearchType.psid);
const searchQuery = router.currentRoute.value?.query?.search_type as OrderSearchType;
if (searchQuery) {
  if (Object.values(OrderSearchType).includes(searchQuery)) {
    searchTypeValue.value = searchQuery;
  }
}
const searchTypes: Record<string, SearchType> = {
  order_number: {
    title: "Номер заказа",
    placeholder: "Введите номер заказа"
  },
  psid: {
    title: "Номер фотосессии",
    placeholder: "Введите номер фотосессии"
  },
  client_id: {
    title: "Клиент ID",
    placeholder: "Введите ID клиента"
  },
  phone: {
    title: "Телефон",
    placeholder: "Введите телефон"
  },
  email: {
    title: "Email",
    placeholder: "Введите Email"
  },
  payer: {
    title: "Плательщик, ребенок",
    placeholder: "Введите плательщика, ребенка"
  }
};

const onSubmitSearch = () => {
  const query = {
    search_type: searchQueryValue.value?.length ? searchTypeValue.value : undefined,
    search_value: searchQueryValue.value?.length ? searchQueryValue.value : undefined
  };

  setRouterQuery(query);
};

const onClearSearch = () => {
  searchQueryValue.value = "";
  searchTypeValue.value = OrderSearchType.psid;

  setRouterQuery({ search_type: undefined, search_value: undefined });
};

// year

const selectedYearValue = ref<string>("");
const routeYear: string = router.currentRoute.value?.query?.year ? String(router.currentRoute.value?.query?.year) : "";
if (routeYear?.length > 0) {
  selectedYearValue.value = routeYear;
}

const selectItems: { value: string; title: string }[] = [
  {
    value: "2023",
    title: "2023"
  },
  {
    value: "2022",
    title: "2022"
  },
  {
    value: "2021",
    title: "2021"
  }
];

const onSubmitYear = () => {
  setRouterQuery({ year: selectedYearValue.value?.length ? selectedYearValue.value : undefined });
};

const onClearYear = () => {
  selectedYearValue.value = "";
  setRouterQuery({ year: undefined });
};
</script>

<style lang="scss" scoped>
.sort-buttons {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.year-buttons {
  margin-top: 15px;
  display: flex;
  gap: 5px;
}

.block {
  padding: 16px;
  margin: 15px;
}

.block > *:not(:last-child) {
  margin-bottom: 15px;
}

.order-one {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  background: white;
}

.back-button {
  display: block;
  width: 100%;
  @include start-at(lg) {
    display: none;
  }
}
</style>
