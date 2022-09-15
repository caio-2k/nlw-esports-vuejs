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
        class="py-3 px-4 bg-violet-500 hover:bg-violet-600 transition-colors text-white rounded flex item-center gap-3"
        @click="openModal"
      >
        <PhMagnifyingGlassPlus size="24" />
        Publicar anúncio
      </button>
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/60" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[480px] shadow-lg shadow-black/25"
            >
              <DialogTitle as="h3" class="text-3xl font-black">
                Publique um anúncio
              </DialogTitle>
              <form class="mt-8 flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label htmlFor="game" class="font-semibold">
                    Qual o game?
                  </label>
                  <FormInput
                    v-model="data.gamePick"
                    id="game"
                    placeholder="Selecione o game que deseja jogar"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <FormInput
                    id="name"
                    placeholder="Como te chamam dentro do game?"
                    v-model="data.userName"
                  />
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <div class="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">
                      Joga há quantos anos?
                    </label>
                    <FormInput
                      id="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser ZERO"
                      v-model="data.yearsPlayed"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <FormInput
                      id="discord"
                      placeholder="Usuario#0000"
                      v-model="data.discordName"
                    />
                  </div>
                </div>

                <div class="flex gap-6">
                  <div class="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <div class="grid grid-cols-4 gap-2">
                      <button class="w-8 h-8 rounded bg-zinc-900">D</button>
                      <button class="w-8 h-8 rounded bg-zinc-900">S</button>
                      <button class="w-8 h-8 rounded bg-zinc-900">T</button>
                      <button class="w-8 h-8 rounded bg-zinc-900">Q</button>
                      <button class="w-8 h-8 rounded bg-zinc-900">Q</button>
                      <button class="w-8 h-8 rounded bg-zinc-900">S</button>
                      <button class="w-8 h-8 rounded bg-zinc-900">S</button>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <label htmlFor="yearsPlaying"> Qual horário do dia? </label>
                    <div class="grid grid-cols-2 gap-2">
                      <FormInput
                        id="hourStart"
                        type="time"
                        placeholder="De"
                        v-model="data.dayHourStart"
                      />
                      <FormInput
                        id="hourEnd"
                        type="time"
                        placeholder="Até"
                        v-model="data.dayHourEnd"
                      />
                    </div>
                  </div>
                </div>

                <div class="mt-2 flex gap-2 text-sm">
                  <FormInput type="checkbox" v-model="data.voiceChannel" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer class="mt-4 flex justify-end gap-4">
                  <button
                    @click="closeModal"
                    type="button"
                    class="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    class="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors"
                  >
                    <PhGameController size="24" />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { ref } from "vue";

import FormInput from "./Form/FormInput.vue";

const isOpen = ref<boolean>(false);

const data = ref({
  gamePick: "" as string,
  userName: "" as string,
  yearsPlayed: "" as string,
  discordName: "" as string,
  playDay: [""] as Array<string>,
  dayHourStart: "" as string,
  dayHourEnd: "" as string,
  voiceChannel: false as boolean,
});

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
