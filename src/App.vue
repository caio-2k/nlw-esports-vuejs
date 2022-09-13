<template>
  <div class="max-w-[1344px] mx-auto flex flex-col items-center my-20">
    <img :src="logoImg" alt="Logo NLW" />

    <h1 class="text-6xl text-white font-black mt-20">
      Seu
      <span class="bg-nlw-gradient bg-clip-text text-transparent"> duo </span>
      está aqui!
    </h1>

    <div class="grid grid-cols-6 gap-6 mt-16">
      <a href="" class="relative rounded-lg overflow-hidden">
        <img src="/game-1.png" alt="" />
        <div
          class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0"
        >
          <strong class="text-base font-bold text-white block">
            League of Legends
          </strong>
          <span class="text-zinc-300 text-sm block">4 anúncios</span>
        </div>
      </a>
      <a href="" class="relative rounded-lg overflow-hidden">
        <img src="/game-2.png" alt="" />
        <div
          class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0"
        >
          <strong class="text-base font-bold text-white block">
            League of Legends
          </strong>
          <span class="text-zinc-300 text-sm block">4 anúncios</span>
        </div>
      </a>
      <a href="" class="relative rounded-lg overflow-hidden">
        <img src="/game-3.png" alt="" />
        <div
          class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0"
        >
          <strong class="text-base font-bold text-white block">
            League of Legends
          </strong>
          <span class="text-zinc-300 text-sm block">4 anúncios</span>
        </div>
      </a>
      <a href="" class="relative rounded-lg overflow-hidden">
        <img src="/game-4.png" alt="" />
        <div
          class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0"
        >
          <strong class="text-base font-bold text-white block">
            League of Legends
          </strong>
          <span class="text-zinc-300 text-sm block">4 anúncios</span>
        </div>
      </a>
      <a href="" class="relative rounded-lg overflow-hidden">
        <img src="/game-5.png" alt="" />
        <div
          class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0"
        >
          <strong class="text-base font-bold text-white block">
            League of Legends
          </strong>
          <span class="text-zinc-300 text-sm block">4 anúncios</span>
        </div>
      </a>
      <a href="" class="relative rounded-lg overflow-hidden">
        <img src="/game-6.png" alt="" />
        <div
          class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0"
        >
          <strong class="text-base font-bold text-white block">
            League of Legends
          </strong>
          <span class="text-zinc-300 text-sm block">4 anúncios</span>
        </div>
      </a>
    </div>

    <div
      class="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden"
    >
      <div
        class="bg-[#2A2634] px-8 py-6 self-stretch flex justify-between items-center"
      >
        <div>
          <strong class="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span class="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <button
          class="py-3 px-4 bg-violet-500 hover:bg-violet-600 transition-colors text-white rounded flex item-center gap-3"
        >
          <PhMagnifyingGlassPlus size="24" />
          Publicar anúncio
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoImg from "./assets/logo-nlw.svg";
</script>

<style scoped></style>
