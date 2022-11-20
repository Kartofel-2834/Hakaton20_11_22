<template>
  <main>
    <br />
    <div class="help-form-section">
      <p>1. Выберите из списка проблему, с которой вы столкнулись:</p>
      <RadioList
        :value="form.problem"
        :options="problems"
        label="text"
        field="type"
        @change="
          (opt) => {
            form.problem = opt.type;
            form.problemText = opt.text;
          }
        "
      />
    </div>

    <div v-if="form.problem === 'another'" class="help-form-section">
      <p>2. Подробно опишите свою проблему:</p>
      <textarea
        placeholder="Описание проблемы..."
        @input="(e) => (form.problemText = e.target.value)"
      ></textarea>
    </div>

    <div class="help-form-section help-form-map-section">
      <p>
        {{ form.problem === "another" ? 3 : 2 }}. Укажите ваше местоположение:
      </p>
      <button @click="watchGeolocation">Найти меня</button>
      <div class="help-form-map" ref="mapInner"></div>
    </div>

    <div class="help-form-section">
      <p>{{ form.problem === "another" ? 4 : 3 }}. Фото инцидента:</p>

      <label for="helper">
        <div class="help-form-image-uploader">
          <span v-if="!form.image">Добавить фото +</span>
          <img v-if="form.image" :src="imageBlobUrl" />
        </div>
        <input
          type="file"
          id="helper"
          accept=".jpg, .jpeg, .png"
          class="hidden"
          @change="receiveIncidentImage"
        />
      </label>
    </div>

    <div class="help-form-section">
      <button @click="sendHelpRequest">Отпарвить</button>
    </div>

    <div class="help-form-problem-text"></div>
  </main>
</template>

<script>
import RadioList from "@/components/RadioList";

const problems = [
  { type: "smoke", text: "Автомобиль задымился" },
  { type: "wheel", text: "Прокололо шину" },
  { type: "stuck", text: "Автомобиль застрял" },
  { type: "another", text: "Моей проблемы нет в списке" },
];

const geolocationConfig = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

const Moscow = { lat: 55.751244, lng: 37.618423 };

export default {
  data() {
    return {
      map: null,
      problems,

      validationError: "",
      imageBlobUrl: "",

      form: {
        problem: null,
        problemText: null,
        position: {
          address: null,
          latitude: null,
          longitude: null,
        },
        image: null,
      },
    };
  },

  components: { RadioList },

  mounted() {
    window.initMap = () => this.setupMap();
    window.initMap();
  },

  methods: {
    checkValidation() {
      return !!(
        this.form.problem &&
        this.form.problemText?.length &&
        this.form.position.address?.length &&
        this.form.image
      );
    },

    setupMap() {
      const { mapInner } = this.$refs;

      if (!mapInner) return;

      try {
        this.map = new google.maps.Map(mapInner, {
          zoom: 10,
          center: Moscow,
        });
      } catch (err) {
        console.log(err.message);
        //setTimeout(window.initMap, 3000);
      }
    },

    setMapCenter(lat, lng, zoom = 4) {
      if (!this.map) return;

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ location: { lat, lng } }, (res, status) => {
        if (status !== "OK" || !res?.length) return;

        this.form.position.address = String(res[0].formatted_address);
      });

      const newCenter = new google.maps.LatLng(lat, lng);
      const marker = new google.maps.Marker({
        position: newCenter,
        title: "Мое местоположение",
      });

      this.map.setZoom(zoom);
      this.map.panTo(newCenter);

      marker.setMap(this.map);
    },

    watchGeolocation() {
      navigator.geolocation.watchPosition(
        (pos) => {
          if (!pos.coords) return;

          const { latitude, longitude } = pos.coords;

          this.form.position.latitude = latitude;
          this.form.position.longitude = longitude;

          //this.setMapCenter(latitude, longitude, 12);
          this.setMapCenter(42.980964, 47.495575, 12);
        },
        (err) => {
          if (this.form.position.latitude && !this.form.position.longitude) {
            return;
          }

          this.validationError = err.message || "";
        },
        geolocationConfig
      );
    },

    receiveIncidentImage(e) {
      if (!e?.target?.files || !e.target.files[0]) {
        this.form.image = null;
        this.imageBlobUrl = "";
        this.validationError = "Не удалось получить файл";
      }

      const file = e.target.files[0];

      this.form.image = file;
      this.imageBlobUrl = URL.createObjectURL(file);
    },

    sendHelpRequest() {
      if (!this.checkValidation()) return;

      let user = localStorage.getItem("user");

      try {
        user = JSON.parse(user);
      } catch (err) {
        user = {};
      }

      user.helpRequest = {
        ...this.form,
        image: this.imageBlobUrl,
        date: new Date(),
      };

      localStorage.setItem("user", JSON.stringify(user));
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/pages/help_form.scss"></style>
