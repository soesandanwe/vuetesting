<template>
  <div class="icon-wrapper">
    <slot name="images" class="icon"></slot>
    <slot name="texts"></slot>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  margin-bottom: 5%;
}
.icon {
  margin-right: 10%;
}
</style>
