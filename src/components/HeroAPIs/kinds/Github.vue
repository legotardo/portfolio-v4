<template>
    <AutoTextScroll
      v-if="state.data"
      class="flex gap-4 mt-2"
    >
      <div class="flex gap-2 text-gray-200
                             win95:text-win95-textSecondary">
        <Tag>{{ state.data.repos }}</Tag>
        repositories
      </div>
      <div class="flex gap-2 text-gray-200
                             win95:text-win95-textSecondary">
        <Tag>{{ state.data.followers }}</Tag>
        followers
      </div>
    </AutoTextScroll>
    <section
      v-else
      class="mt-2 flex gap-4"
    >
      <skeleton-bar class="h-4 w-[30%]" />
      <skeleton-bar class="h-4 w-[30%]" />
    </section>
  </template>
  
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { PORTFOLIO_BACKEND_URL } from '../../../constants/global';
import type { HeroGithub } from '../../../types/hero';
import AutoTextScroll from '../../AutoTextScroll.vue';
import SkeletonBar from '../../SkeletonBar.vue';
import Tag from '../../Tag.vue';

const state = reactive({
    data: null as HeroGithub | null,
})

onMounted(async () => {
    try {
      const response = await fetch(`${PORTFOLIO_BACKEND_URL}/hero/github`);
      const data: HeroGithub = await response.json();

      if(!data.followers || !data.repos) throw new Error("Missing github data")

      state.data = data;
    } catch (err) {
      state.data = { repos: 109, followers: 100}
    }
})
</script>
