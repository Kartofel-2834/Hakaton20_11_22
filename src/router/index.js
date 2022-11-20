import { createRouter, createWebHistory } from "vue-router";

// PAGES
import MainPage from "@/views/index.vue";

// Auth pages
import Authorization from "@/views/Auth/authorization.vue";
import Registration from "@/views/Auth/registration.vue";

// Help pages
import HelpMain from "@/views/Help/index.vue";
import HelpForm from "@/views/Help/form.vue";

//Helpers pages
import TroublesList from "@/views/Trouble/list.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/auth",
    component: Authorization,
  },
  {
    path: "/reg",
    component: Registration,
  },
  {
    path: "/help",
    component: HelpMain,
  },
  {
    path: "/help/request",
    component: HelpForm,
  },
  {
    path: "/trouble/list",
    component: TroublesList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
