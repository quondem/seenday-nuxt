<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__copyright">© Seenday, {{ year }}</div>

      <div class="footer__bottom-links">
        <a href="https://seenday.com/terms" target="_blank" class="footer__bottom-link">Пользовательское соглашение</a>
        <a href="https://seenday.com/confidential" target="_blank" class="footer__bottom-link"
          >Политика конфиденциальности</a
        >
        <a href="https://seenday.com/cookie" target="_blank" class="footer__bottom-link">Cookies</a>
      </div>

      <div class="footer__project">Проект компании Marbery</div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/footer/footer";
</style>
