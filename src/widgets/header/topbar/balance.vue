<template>
  <div class="topbar-balance">
    <div class="topbar-balance__control">
      <button class="button" data-color="purple" data-tippy-content="Основной баланс">
        <i class="fas fa-ruble-sign" />
      </button>
      0 <i class="fas fa-ruble-sign" />
    </div>

    <div class="topbar-balance__profile-menu" data-show="0">
      <div class="profile-menu block">
        <div class="topbar-balance__balance">
          Основной баланс
          <br />
          <span> 0 <i class="fas fa-ruble-sign" /></span>

          <button class="button" data-color="green">Пополнить баланс</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/shared/assets/styles/components/topbar/balance";
</style>
