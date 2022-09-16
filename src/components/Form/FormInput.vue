<template>
  <input
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :id="id"
    :placeholder="placeholder"
    class="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | boolean;
  placeholder?: string;
  id?: string;
}>();

defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();
</script>
