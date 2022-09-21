<template>
  <div class="max-w-7xl mx-auto flex flex-col items-center my-20">
    <img :src="logoImg" alt="Logo NLW" />

    <h1 class="text-6xl text-white font-black mt-20 text-center">
      Seu
      <span class="bg-nlw-gradient bg-clip-text text-transparent"> duo </span>
      está aqui!
    </h1>

    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16 px-10 2xl:px-0"
    >
      <GameBanner
        v-for="game in games"
        :key="game.id"
        :banner-url="game.bannerUrl"
        :ads-count="game._count.ads"
        :title="game.title"
      />
    </div>

    <CreateAdBanner />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import logoImg from "./assets/logo-nlw.svg";
import GameBanner from "./components/GameBanner.vue";
import type { Games } from "@/types";
import CreateAdBanner from "./components/CreateAdBanner.vue";
import axios from "axios";

onMounted(() => {
  getGames();
});

const games = ref<Games[]>([]);

const getGames = async () => {
  axios("http://localhost:3333/games").then((response) => {
    games.value = response.data;
  });
};
</script>

<style scoped></style>
