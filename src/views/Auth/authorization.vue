<template>
  <Modal
    title="Авторизация"
    parentClass="auth-modal"
    modalClass="auth-modal-body"
    :closable="false"
  >
    <div class="form-input">
      <p>Логин:</p>
      <input type="text" @input="(e) => (login = e.target.value)" />
    </div>
    <div class="form-input">
      <p>Пароль:</p>
      <input type="password" @input="(e) => (password = e.target.value)" />
    </div>

    <button @click="submitAuthorization">Войти</button>
    <p class="reg-link" @click="() => navigateTo('/reg')">Зарегистрироваться</p>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  components: { Modal },

  data() {
    return {
      user: null,

      login: "",
      password: "",
    };
  },

  methods: {
    submitAuthorization() {
      const newUser = localStorage.getItem("user") || null;

      if (newUser) {
        this.user = JSON.parse(newUser);
      }

      if (!this.user || !this.login.length || !this.password.length) {
        return;
      }

      if (
        this.login !== this.user.login ||
        this.password !== this.user.password
      ) {
        return;
      }

      this.navigateTo("/");
    },

    navigateTo(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/pages/authorization.scss"></style>
