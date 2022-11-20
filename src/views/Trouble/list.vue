<template>
  <div class="troubles-inner">
    <h3>Люди поблизости, у которых возникли проблемы:</h3>

    <div
      v-for="trouble in data"
      class="image-card-inner"
      @click="() => (selectedTrouble = trouble)"
    >
      <ImageCard :src="trouble.image">
        <p class="problem-inner">{{ trouble.problem }}</p>
        <p class="address-inner">{{ trouble.address }}</p>
        <p class="date-inner">{{ trouble.date.toLocaleString() }}</p>
      </ImageCard>
    </div>
    <div class="pagination">
      <div>1</div>
    </div>
  </div>

  <Modal
    :opened="!!selectedTrouble"
    :title="selectedTrouble?.problem"
    modalClass="trouble-card"
    @close="() => (selectedTrouble = null)"
  >
    <div class="image-inner">
      <img :src="selectedTrouble?.image || ''" />
    </div>

    <div class="info-inner">
      <h3>Адрес:</h3>
      <p>{{ selectedTrouble?.address }}</p>
    </div>

    <div class="info-inner">
      <h3>Время проишествия:</h3>
      <p>{{ selectedTrouble?.date?.toLocaleString() }}</p>
    </div>

    <div class="buttons-inner">
      <IconButton icon="ph:phone-call-fill" />
      <IconButton icon="mdi:chat" start="#c05bc0" end="purple" />
      <IconButton icon="fa-solid:hands-helping" start="#55cd55" end="green" />
    </div>
  </Modal>

  <Modal
    :opened="permissionOpened"
    parentClass="troubles-modal-body"
    title="Кто такие хелперы?"
    @close="() => (permissionOpened = false)"
  >
    <div class="image-inner">
      <img src="@/assets/images/road-help.jpg" />
    </div>
    <p>
      Хелперы - это неравнодушные автомобилисты, которые готовы помочь. У
      кого-то есть запаска, кто-то может заменить колесо, а кто-то оказать
      первую помощь
    </p>
    <button @click="() => (permissionOpened = false)">Понятно</button>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal";
import ImageCard from "@/components/ImageCard";
import IconButton from "@/components/IconButton";

const test = [
  {
    address: "ул. Булача, 13",
    problem: "Лопнуло колесо",
    date: new Date(Date.now() - 100000),
    image:
      "https://www.goodyearshop.ru/upload/resize_cache/webp/images/5-1-015489t15.webp",
  },
  {
    address: "ул. Насрутдинова, д. 65",
    problem: "Автомобиль застрял",
    date: new Date(Date.now() - 200000),
    image: "https://ie.drivenn.ru/eblkni5ksv2vy_1odqtut.jpeg",
  },
  {
    address: "ул. Гапцахская, д. 5а",
    problem: "Закончилось топливо",
    date: new Date(Date.now() - 300000),
    image:
      "https://obj.mosregtoday.ru/img/articles/items/thumb/extra/166687766354974288004.jpg",
  },
  {
    address: "ул. Ленина, 34",
    problem: "Автомобиль задымился",
    date: new Date(Date.now() - 400000),
    image:
      "https://avtoinstruktor199.ru/assets/images/news/dyim-iz-pod-kapota.jpg",
  },
];

export default {
  data() {
    return {
      data: test,
      permissionOpened: true,
      selectedTrouble: null,
    };
  },

  components: { Modal, ImageCard, IconButton },

  mounted() {
    let user = localStorage.getItem("user");

    try {
      user = JSON.parse(user);
    } catch (err) {
      console.log(err.message);
      return;
    }

    if (!user?.helpRequest || !user?.helpRequest.problem) {
      return;
    }

    this.data.unshift({
      address: user.helpRequest.position.address,
      problem: user.helpRequest.problemText,
      date: new Date(user.helpRequest.date),
      image:
        "https://img.freepik.com/premium-photo/broken-car-and-abandoned-car-car-crash-car-after-the-accident-traffic-accident-shattered-car-abandoned-car-damaged-car-car-rusting-in-a-prairie-field_76959-144.jpg",
    });
    console.log(user.helpRequest);
  },
};
</script>

<style lang="scss" src="@/assets/styles/pages/troubles_list.scss"></style>
