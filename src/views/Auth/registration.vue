<template>
  <Modal
    title="Регистрация"
    parentClass="auth-modal"
    modalClass="auth-modal-body"
    :closable="false"
  >
    <div class="form-pane-inner">
      <TabPane
        :value="type"
        :options="userTypes"
        field="value"
        @change="({ value }) => (type = value)"
      />
    </div>
    <div class="form-input">
      <p>{{ type === "1" ? "ФИО" : "Название" }}:</p>
      <input type="text" @input="(e) => (name = e.target.value)" />
    </div>

    <div v-if="type === '1'" class="form-input">
      <p>Номер телефона:</p>
      <PhoneNumberInput :value="phone" @change="(v) => (phone = v)" />
    </div>
    <div v-else class="form-input">
      <p>ИНН:</p>
      <input
        type="text"
        @keydown="innChecker"
        @change="(e) => (phone = e.target.value)"
      />
    </div>

    <div class="form-input">
      <p>Логин:</p>
      <input type="text" @input="(e) => (login = e.target.value)" />
    </div>
    <div class="form-input">
      <p>Пароль:</p>
      <input type="password" @input="(e) => (password = e.target.value)" />
    </div>

    <button @click="registration">Зарегестрироваться</button>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import TabPane from "@/components/TabPane";

const userTypes = [
  { label: "Физ. лицо", value: "1" },
  { label: "Юр. лицо", value: "2" },
];

export default {
  data() {
    return {
      type: "1",
      name: "",
      phone: "",
      login: "",
      password: "",

      userTypes,
    };
  },

  components: { Modal, PhoneNumberInput, TabPane },

  methods: {
    innChecker(event) {
      if (
        event.target.value.length === 12 ||
        (!/^\d+$/.test(event.key) && event.key.length === 1)
      ) {
        event.preventDefault();
      }
    },

    registration() {
      if (
        !this.type ||
        !this.name ||
        !this.phone ||
        !this.login ||
        !this.password
      ) {
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          type: this.type,
          name: this.name,
          phone: this.phone,
          login: this.login,
          password: this.password,
        })
      );

      this.$router.push("/auth");
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/pages/authorization.scss"></style>
