<template>
  <input :value="formattedValue" type="text" @keydown="keydownListener" />
</template>

<script>
import toPhoneNumber from "@/utils/toPhoneNumber";

String.prototype.toPhoneNumberFormat = toPhoneNumber;

export default {
  emits: ["change"],

  props: {
    value: { type: String, default: "" },
    phoneNumberStart: { type: String, default: "+7" },
  },

  data() {
    return {
      formattedValue: "",
      clearValue: "",
    };
  },

  methods: {
    keydownListener(event) {
      event.preventDefault();

      if (typeof this.value !== "string") {
        this.$emit("change", this.phoneNumberStart);
      }

      let update = this.phoneNumberStart;

      if (event.keyCode === 8 && this.value.length > 0) {
        update = this.value.slice(0, -1);
      } else if (/^\d+$/.test(event.key) && this.value.length < 10) {
        update = this.value + event.key;
      } else {
        return;
      }

      this.$emit("change", update);
      this.formattedValue = update.toPhoneNumberFormat(this.phoneNumberStart);
    },
  },
};
</script>
