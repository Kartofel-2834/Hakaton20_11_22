<template>
  <div class="plates-inner">
    <Plate
      start="#cd5757"
      end="#9f1414"
      icon="material-symbols:add-box"
      @click="() => navigateTo('help/request')"
    >
      <p>Мне нужна помощь!</p>
      <div class="plate-icon-inner"></div>
    </Plate>
    <Plate
      start="#55cd55"
      end="green"
      icon="mdi:hope"
      @click="() => navigateTo('/trouble/list')"
    >
      <p>Я хелпер</p>
      <div class="plate-icon-inner"></div>
    </Plate>
    <Plate icon="ic:round-local-post-office">
      <p>Мои заявки</p>
      <div class="plate-icon-inner"></div>
    </Plate>
  </div>
</template>

<script>
import Plate from "@/components/Plate";

export default {
  components: { Plate },

  methods: {
    navigateTo(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/pages/index.scss"></style>
