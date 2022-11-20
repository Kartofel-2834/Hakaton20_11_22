<template>
  <div
    class="plate"
    :style="{ background: `linear-gradient(180deg, ${start} 0%, ${end} 100%)` }"
  >
    <slot></slot>
    <div class="icon-inner">
      <Icon v-if="!!icon.length" :icon="icon" />
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  props: {
    start: { type: String, default: "var(--main)" },
    end: { type: String, default: "var(--third)" },
    icon: { type: String, default: "" },
  },

  components: { Icon },
};
</script>

<style lang="scss" src="@/assets/styles/components/plate.scss"></style>
