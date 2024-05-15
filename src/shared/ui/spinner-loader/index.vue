<template>
  <div class="ui-spinner-loader" :class="[size, position]">
    <span />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: "medium",
      validator(size) {
        return ["small", "large", "medium"].includes(size);
      }
    },
    position: {
      default: "center",
      validator(position) {
        return ["top", "center", "bottom"].includes(position);
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/shared/assets/styles/components/spinner-loader";
</style>
