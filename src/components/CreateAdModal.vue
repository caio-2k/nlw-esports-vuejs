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
          <DialogTitle as="h1" class="text-3xl font-black">
            Publique um anúncio
          </DialogTitle>
          <form
            @submit.prevent="handleCreateAd"
            class="mt-8 flex flex-col gap-4"
          >
            <div class="flex flex-col gap-2">
              <label htmlFor="game">Qual o game?</label>
              <FormSelect
                v-model="data.selectedGame"
                :my-arr="games"
                :filter-by="(data: any) => data.title"
                placeholder="Selecione um game"
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
                <label htmlFor="weekDays" className="font-semibold">
                  Quando costuma jogar?
                </label>
                <FormSelectMultiple
                  v-model="data.selectedWeekDays"
                  :my-arr="weekDays"
                  :filter-by="(data) => data.name"
                  :filter-value="(data) => data.abbr"
                  placeholder="Selecione o(s) dia(s)"
                />
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
              <FormCheckbox
                v-model:checked="data.voiceChannel"
                labelText="Costumo me conectar ao chat de voz"
              />
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
                class="bg-violet-700 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-800 transition-colors"
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

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

import FormInput from "./Form/FormInput.vue";
import FormSelect from "./Form/FormSelect.vue";
import FormSelectMultiple from "./Form/FormSelectMultiple.vue";
import FormCheckbox from "./Form/FormCheckbox.vue";
import axios from "axios";

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
  axios("http://localhost:3333/games").then((response) => {
    games.value = response.data;
  });
};

const data = ref({
  selectedGame: "" as string,
  userName: "" as string,
  yearsPlayed: "" as string,
  discordName: "" as string,
  selectedWeekDays: [] as Array<string>,
  dayHourStart: "" as string,
  dayHourEnd: "" as string,
  voiceChannel: false as boolean,
});

const currentSelectedGame = computed(() => {
  return games.value.find((x) => x.title == data.value.selectedGame);
});

const weekDays = ref([
  { id: 0, name: "Domingo", abbr: "D" },
  { id: 1, name: "Segunda-feira", abbr: "S" },
  { id: 2, name: "Terça-feira", abbr: "T" },
  { id: 3, name: "Quarta-feira", abbr: "Q" },
  { id: 4, name: "Quinta-feira", abbr: "Q" },
  { id: 5, name: "Sexta-feira", abbr: "S" },
  { id: 6, name: "Sábado", abbr: "S" },
]);

async function handleCreateAd() {
  if (!data.value.userName) {
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:3333/games/${currentSelectedGame.value?.id}/ads`,
      {
        name: data.value.userName,
        yearsPlaying: Number(data.value.yearsPlayed),
        discord: data.value.discordName,
        weekDays: data.value.selectedWeekDays.map((item: any) => item.id),
        hourStart: data.value.dayHourStart,
        hourEnd: data.value.dayHourEnd,
        useVoiceChannel: data.value.voiceChannel,
      }
    );

    alert("Anúncio criado com sucesso!");
  } catch (err) {
    console.log(err);
    alert("Erro ao criar anúncio!");
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
