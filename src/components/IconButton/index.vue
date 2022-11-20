<template>
  <button
    class="icon-button"
    :style="{
      background: `linear-gradient(180deg, ${start} 0%, ${end} 100%)`,
      borderColor: `linear-gradient(180deg, ${start} 0%, ${end} 100%)`,
    }"
  >
    <Icon :icon="icon" />
  </button>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  props: {
    icon: { type: String, required: true },
    start: { type: String, default: "var(--main)" },
    end: { type: String, default: "var(--third)" },
  },

  components: {
    Icon,
  },
};
</script>

<style lang="scss" src="@/assets/styles/components/icon_button.scss"></style>
