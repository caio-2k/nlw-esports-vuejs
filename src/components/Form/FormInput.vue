<template>
  <input
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :id="id"
    :placeholder="placeholder"
    :type="type"
    class="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-300"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | boolean;
  placeholder?: string;
  type?: string;
  id?: string;
}>();

defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();
</script>
