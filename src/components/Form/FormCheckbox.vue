<template>
  <input
    @input="(event) => $emit('update:checked', (event.target as HTMLInputElement).checked)"
    type="checkbox"
    id="checkbox"
    :checked="checked"
    class="accent-green-600 text-white w-4 h-4"
  />
  <label htmlFor="checkbox" className="font-semibold">
    {{ labelText }}
  </label>
</template>

<script setup lang="ts">
defineProps<{
  checked: boolean;
  labelText: string;
}>();
</script>
