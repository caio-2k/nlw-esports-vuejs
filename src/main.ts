import { createApp } from "vue";
import App from "./App.vue";
import "./styles/main.css";
import PhosphorVue from "phosphor-vue";

const app = createApp(App);
app.use(PhosphorVue);
app.mount("#app");
