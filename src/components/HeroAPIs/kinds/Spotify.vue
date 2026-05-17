<template>
  <div
    v-if="state.data"
    class="flex flex-col text-sm w-full"
  >
    <h2 class="text-base uppercase
             win95:text-black">
      {{ state.data.name }}
    </h2>
    <span class="text-gray-400
                 win95:text-win95-textSecondary"
    >
      {{ state.data.album }}
    </span>
    <div class="flex items-center justify-center gap-4 mt-2">
      <span class="text-sm win95:text-black">{{ currentProgress }}</span>
      <div class="relative w-full h-1 bg-gray-400 rounded-xl overflow-hidden
                  win95:rounded-none win95:h-4 win95:border win95:border-win95-progressBorder win95:bg-transparent">
        <div
          class="absolute top-0 left-0 h-full bg-purple-600 win95:bg-win95-primary"
          :style="{ width: progressWidth }"
        />
      </div>
      <span class="text-sm win95:text-black">{{ convertMsToMinutes(state.data.duration) }}</span>
    </div>
  </div>
  <section
    v-else
    class="flex flex-col gap-2"
  >
    <skeleton-bar class="h-3 w-[40%]" />
    <skeleton-bar class="h-2 w-[20%]" />
    <skeleton-bar class="mt-2 h-2 w-[100%]" />
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import { PORTFOLIO_BACKEND_URL } from '../../../constants/global';
import type { HeroSpotify } from '../../../types/hero';
import SkeletonBar from '../../SkeletonBar.vue';

const state = reactive({
    currentProgress: 0,
    interval: null as number | null,
    data: null as HeroSpotify | null,
})

onMounted(async () => {
    try {
        handleSpotifyPlayingNow();
    } catch (err) {
        console.error(err);
    }
})

onBeforeUnmount(() => {
    clearInterval(state.interval!)
})

async function handleSpotifyPlayingNow() {
    try {
      const response = await fetch(`${PORTFOLIO_BACKEND_URL}/hero/spotify?time=${Date.now()}`);
      const data: HeroSpotify = await response.json();
      state.data = data;
    } catch (err) {
      state.data = {
        name: "I'll Be Missing You",
        artist: "Lofi Fruits Music",
        album: "90s Oldschool Lofi Hip Hop",
        image: "https://i.scdn.co/image/ab67616d0000b27318f6df6b0d4ab0d5abd5775e",
        duration: 118153
      }
    } 

    if(!state.data) throw new Error("Missing spotify data")

    if (state.data.image) {
      window.dispatchEvent(
        new CustomEvent("spotify-track-change", {
          detail: { image: state.data.image },
        })
      )
    }

    state.currentProgress = state.data.currentProgress || state.data.duration || 0
    clearInterval(state.interval!)

    state.interval = window.setInterval(() => {
        if (state.data && state.currentProgress >= state.data.duration) {
        clearInterval(state.interval!)
        return
        }

        state.currentProgress += 1000
        state.currentProgress = Math.min(state.currentProgress, state.data!.duration || 0)
    }, 1000)
}

const currentProgress = computed(() => {
    return convertMsToMinutes(state.currentProgress)
})

const progressWidth = computed(() => {
    if (!state.data) return '0%'
    const percentage = (state.currentProgress / state.data.duration) * 100

    return `${percentage}%`
})

function convertMsToMinutes(ms: number) {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`
}
</script>
