<template>
  <input
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    class="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | boolean;
}>();

defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();
</script>
