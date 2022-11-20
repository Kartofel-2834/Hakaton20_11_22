<template>
  <div class="radio-list">
    <div
      v-for="option of options"
      :key="option[field] || String(option)"
      class="radio-list-option"
      :class="{ selected: option[field] === value }"
      @click="() => onOptionSelect(option)"
    >
      <div class="radio-list-option-marker"></div>
      <div class="radio-list-option-text">
        {{ option[label] ? option[label] : String(option) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["change"],

  props: {
    value: { default: null },
    options: { default: [] },
    field: { type: String, default: "id" },
    label: { type: String, default: "label" },
  },

  methods: {
    onOptionSelect(option) {
      this.$emit("change", option);
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/components/radio_list.scss"></style>
