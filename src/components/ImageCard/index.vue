<template>
  <div
    class="image-card"
    :style="{ background: `linear-gradient(90deg, ${start} 0%, ${end} 100%)` }"
  >
    <div class="image-inner">
      <img :src="src" />
    </div>
    <div class="image-card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: "" },
    start: { type: String, default: "var(--second)" },
    end: { type: String, default: "var(--second)" },
  },
};
</script>

<style lang="scss" src="@/assets/styles/components/image_card.scss"></style>
