<template>
  <input
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :id="id"
    :placeholder="placeholder"
    :class="
      props.type === 'checkbox'
        ? 'accent-green-600 text-white w-4 h-4'
        : 'bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
    "
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | boolean;
  placeholder?: string;
  type?: string;
  id?: string;
}>();

defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();
</script>
