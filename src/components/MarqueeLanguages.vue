<template>
    <div>
      <Vue3Marquee
      class="my-12 lg:mt-2 lg:mb-44 uppercase text-4xl text-white/70 font-extrabold overflow-hidden"
      :duration="50"
    >
      <span
        v-for="language in LANGUAGES"
        :key="language.name"
        class="mx-4 hover:cursor-pointer hover:opacity-80 hover:scale-105 transition-all"
        @mouseenter="handleLanguage(language.color)"
        @mouseleave="handleLanguageLeave"
      >
        {{ language.name }}
      </span>
      </Vue3Marquee>
      <div
        ref="languageBottomEffect"
        class="language-bottom-effect fixed bottom-0 left-0 right-0 transition-all z-10 hidden lg:block"
      />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Vue3Marquee } from 'vue3-marquee';

const LANGUAGES = [
  {
    name: 'Typescript',
    color: '#007ACC',
  },
  {
    name: 'Javascript',
    color: '#F7DF1E',
  },
  {
    name: 'NodeJS',
    color: '#339933',
  },
  {
    name: 'Vue.JS',
    color: '#4FC08D',
  },
  {
    name: 'React',
    color: '#61DAFB',
  },
  {
    name: 'Mysql',
    color: '#4479A1',
  },
  {
    name: 'MongoDB',
    color: '#47A248',
  },
  {
    name: 'C#',
    color: '#239120',
  },
  {
    name: 'C++',
    color: '#00599C',
  },
  {
    name: 'Java',
    color: '#007396',
  },
  {
    name: 'Express',
    color: '#000000',
  },
  {
    name: 'Javascript',
    color: '#F7DF1E',
  },
  {
    name: 'NodeJS',
    color: '#339933',
  },
  {
    name: 'Vue.JS',
    color: '#4FC08D',
  },
  {
    name: 'Typescript',
    color: '#007ACC',
  },
  {
    name: 'React',
    color: '#61DAFB',
  },
  {
    name: 'Flutter',
    color: '#02569B',
  },
  {
    name: 'Jetpack Compose',
    color: '#6200EE',
  },
  {
    name: 'Mysql',
    color: '#4479A1',
  },
]

const languageBottomEffect = ref<HTMLDivElement | null>(null)

const handleLanguage = (color: string): void => {
  if (languageBottomEffect.value === null) { return }

  languageBottomEffect.value.style.boxShadow = `0 0 20px 10px ${color}`
}

const handleLanguageLeave = (): void => {
  if (languageBottomEffect.value === null) { return }

  languageBottomEffect.value.style.boxShadow = '0 0 10px 10px transparent'
}
</script>