<template>
  <div class="plates-inner">
    <Plate start="#c05bc0" end="purple" icon="mdi:frequently-asked-questions">
      <p>Вопросы и ответы</p>
      <div class="plate-icon-inner"></div>
    </Plate>
    <Plate icon="octicon:organization-16">
      <p>Организации</p>
      <div class="plate-icon-inner"></div>
    </Plate>
    <Plate
      start="#55cd55"
      end="green"
      icon="fa-solid:hands-helping"
      @click="() => this.$router.push('/help')"
    >
      <p>Помощь</p>
      <div class="plate-icon-inner"></div>
    </Plate>
  </div>
</template>

<script>
import Plate from "@/components/Plate";

export default {
  components: { Plate },
};
</script>

<style lang="scss" src="@/assets/styles/pages/index.scss"></style>
