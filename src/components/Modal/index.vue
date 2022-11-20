<template>
  <div
    class="modal-inner"
    :class="parentClass"
    :style="{ display: !closable || opened ? 'flex' : 'none' }"
    @click="close"
  >
    <div
      class="modal-body"
      :class="modalClass"
      @click="(e) => e.stopPropagation()"
    >
      <div
        class="modal-close-button"
        :class="{ hidden: !closable }"
        @click="close"
      >
        <Icon icon="material-symbols:close-rounded" />
      </div>

      <h2>{{ title }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  emits: ["close"],

  props: {
    opened: { type: Boolean, default: false },
    closable: { type: Boolean, default: true },
    title: { type: String, default: "Modal" },
    parentClass: { type: String, default: "" },
    modalClass: { type: String, default: "" },
  },

  components: { Icon },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/components/modal.scss"></style>
