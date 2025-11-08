<template>
    <AutoTextScroll
      v-if="state.data"
      class="languages flex gap-4 mt-2 flex-nowrap whitespace-nowrap"
    >
      <div
        v-for="(language, index) in state.data.languages"
        :key="index"
        class="flex items-center gap-2 text-xs 
               win95:text-win95-textSecondary"
      >
        <span
          class="text-xs rounded-xl leading-6 px-2
                 win95:rounded-none win95:px-3 win95:py-1 win95:border-win95-buttonBorder win95:border-2 win95:!text-win95-buttonText win95:!bg-win95-buttonFace"
          :class="getLanguageColor(language.name)"
        >
          {{ language.name }}
        </span>
        {{ language.text }}
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
import AutoTextScroll from '../../AutoTextScroll.vue';
import SkeletonBar from '../../SkeletonBar.vue';
import type { HeroWakatime } from '../../../types/hero';
import { PORTFOLIO_BACKEND_URL } from '../../../constants/global';

const LANGUAGE_COLORS: Record<string, string> = {
    'JavaScript': 'text-yellow-200 bg-yellow-600/40',
    'TypeScript': 'text-blue-200 bg-blue-600/40',
    'Vue.js': 'text-green-200 bg-green-600/40',
    'CSS': 'text-blue-200 bg-blue-600/40',
    'Zig': 'text-orange-200 bg-orange-600/40',
    'SCSS': 'text-red-200 bg-red-600/40',
}

const state = reactive({
    data: null as HeroWakatime | null,
})

onMounted(async () => {
    try {
      const response = await fetch(`${PORTFOLIO_BACKEND_URL}/hero/wakatime`);
      const data: HeroWakatime = await response.json();
      state.data = data;
    } catch (err) {
      state.data = {
        "languages":
        [
          {"name":"TypeScript","text":"42 hrs 20 mins"},
          {"name":"Vue.js","text":"32 hrs 26 mins"},
          {"name":"Zig","text":"8 hrs 33 mins"},
          {"name":"JSON","text":"5 hrs 18 mins"},
          {"name":"Astro","text":"2 hrs 48 mins"}
        ]
      }
      console.error(err);
    }
})
  
function getLanguageColor(language: string): string {
    return LANGUAGE_COLORS[language] || 'text-gray-200 bg-gray-600/40'
}
</script>