<template>
  <Dialog
    as="div"
    :open="isOpen"
    @close="$emit('onCloseModal')"
    class="relative z-10"
  >
    <div class="fixed inset-0 bg-black/60" />

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <DialogPanel
          class="bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[480px] shadow-lg shadow-black/25"
        >
          <DialogTitle as="h3" class="text-3xl font-black">
            Publique um anúncio
          </DialogTitle>
          <form class="mt-8 flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label htmlFor="game"> Qual o game? </label>
              <Listbox v-model="selectedGame">
                <div class="relative mt-1">
                  <ListboxButton
                    class="relative w-full cursor-default rounded bg-zinc-900 py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm"
                  >
                    <span
                      class="block truncate"
                      :class="selectedGame ? 'text-white' : 'text-zinc-500'"
                    >
                      {{ selectedGame ? selectedGame : "Selecione um game" }}
                    </span>
                    <span
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                      <PhCaretDown
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="game in games"
                      :key="game.id"
                      :value="game.title"
                      as="template"
                    >
                      <li
                        :class="[
                          active
                            ? 'bg-violet-100 text-zinc-900'
                            : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ game.title }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600"
                        >
                          <PhCheck class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </div>
              </Listbox>
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
                <label htmlFor="yearsPlaying"> Joga há quantos anos? </label>
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
              <FormInput
                id="voiceChat"
                type="checkbox"
                v-model="data.voiceChannel"
              />
              <span class="font-semibold"
                >Costumo me conectar ao chat de voz</span
              >
            </div>

            <footer class="mt-4 flex justify-end gap-4">
              <button
                @click="$emit('onCloseModal')"
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
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Game } from "@/types";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import FormInput from "./Form/FormInput.vue";

defineProps<{
  isOpen?: boolean;
}>();

defineEmits<{
  (e: "onCloseModal"): void;
}>();

onMounted(() => {
  getGames();
});

const games = ref<Game[]>([]);

const getGames = async () => {
  fetch("http://localhost:3333/games")
    .then((response) => response.json())
    .then((data) => {
      games.value = data;
    });
};

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

const selectedGame = ref<string>();

const currentSelectedGame = computed(() => {
  return games.value.find((x) => x.id == selectedGame.value);
});
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
