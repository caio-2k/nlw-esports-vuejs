<template>
  <Listbox
    :modelValue="modelValue"
    @update:modelValue="
      (value) => {
        $emit('update:modelValue', value);
      }
    "
  >
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default rounded bg-zinc-900 py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm"
      >
        <span
          class="block truncate"
          :class="props.modelValue ? 'text-white' : 'text-zinc-300'"
        >
          {{ props.modelValue ? props.modelValue : props.placeholder }}
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <PhCaretDown class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <ListboxOptions
        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ListboxOption
          v-slot="{ active, selected }"
          v-for="(item, index) in props.myArr"
          :key="index"
          :value="props.filterBy(item)"
          as="template"
        >
          <li
            :class="[
              active ? 'bg-violet-100 text-zinc-900' : 'text-gray-900',
              'relative cursor-default select-none py-2 pl-10 pr-4',
            ]"
          >
            <span
              :class="[
                selected ? 'font-medium' : 'font-normal',
                'block truncate',
              ]"
              >{{ props.filterBy(item) }}</span
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
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const props = defineProps<{
  modelValue: any;
  myArr: Array<any>;
  filterBy: (data: any) => string;
  placeholder: string;
}>();

defineEmits<{
  (event: "update:modelValue"): void;
}>();
</script>

<style scoped></style>
