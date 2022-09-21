<template>
  <a href="" class="relative rounded-lg overflow-hidden">
    <img width="285" height="380" :src="bannerUrl" alt="" />
    <div
      class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0"
    >
      <strong class="text-base font-bold text-white block">
        {{ title }}
      </strong>
      <span class="text-zinc-300 text-sm block">{{ adsCount }} anúncio(s)</span>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  bannerUrl: string;
  title: string;
  adsCount: number;
}>();
</script>
