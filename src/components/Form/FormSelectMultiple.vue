<template>
  <Listbox
    :modelValue="modelValue"
    @update:modelValue="
      (value) => {
        $emit('update:modelValue', value);
      }
    "
    multiple
  >
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default rounded bg-zinc-900 py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm"
      >
        <span
          class="block truncate"
          :class="
            props.modelValue.length ? 'text-white font-bold' : 'text-zinc-300'
          "
        >
          {{
            props.modelValue.length
              ? props.modelValue
                  .map((data: any) => props.filterValue(data))
                  .join(", ")
              : props.placeholder
          }}
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
          :value="item"
          as="template"
        >
          <li
            class="flex items-center gap-2 pl-8 py-1 px-2 transition-all relative"
            :class="[
              active ? 'bg-violet-100 text-zinc-900' : 'text-gray-900',
              selected ? 'font-medium' : 'font-normal',
            ]"
          >
            <PhCheck
              v-if="selected"
              class="w-4 text-violet-600 absolute left-2"
              aria-hidden="true"
            />
            {{ props.filterBy(item) }}
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
  modelValue: string[];
  myArr: Array<any>;
  filterBy: (data: any) => string;
  filterValue: (data: any) => string;
  placeholder: string;
}>();

defineEmits<{
  (event: "update:modelValue"): void;
}>();
</script>

<style scoped></style>
