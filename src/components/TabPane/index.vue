<template>
  <div class="tab-pane">
    <RadioList
      :value="value"
      :options="options"
      :field="field"
      :label="label"
      @change="(opt) => this.$emit('change', opt)"
    />
  </div>
</template>

<script>
import RadioList from "@/components/RadioList";

export default {
  emits: ["change"],

  props: {
    value: { default: null },
    options: { default: [] },
    field: { type: String, default: "id" },
    label: { type: String, default: "label" },
  },

  components: { RadioList },
};
</script>

<style lang="scss" src="@/assets/styles/components/tab_pane.scss"></style>
