<template>
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
        class="py-3 px-4 bg-violet-700 hover:bg-violet-800 transition-colors text-white font-semibold rounded flex item-center gap-3"
        @click="openModal"
      >
        <PhMagnifyingGlassPlus size="24" />
        Publicar anúncio
      </button>
    </div>
  </div>

  <CreateAdModal @on-close-modal="closeModal" :is-open="isOpen" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import CreateAdModal from "./CreateAdModal.vue";

const isOpen = ref<boolean>(false);

function closeModal() {
  isOpen.value = false;
}

function openModal() {
  isOpen.value = true;
}
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
