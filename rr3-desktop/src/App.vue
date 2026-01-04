<script setup lang="ts">


import { i18n } from "@/i18n.ts";

function toggleLocalization(): void {
  console.log(i18n);
  const localeGlobal = i18n.global
  const currentLocale = localeGlobal.locale;
  localeGlobal.locale = currentLocale === 'ru' ? 'en' : 'ru';
}

function changeBg(): void {
    document.querySelector('html')?.classList.toggle('dark_theme')
}
</script>

<template>
  <h1>{{ $t('bikes.title') }}</h1>
  <button @click="toggleLocalization"> toggle locale</button>
  <button @click="changeBg"> toggle theme</button>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped>
@import "assets/colors/dark.css";
@import "assets/colors/light.css";

button {
  background: var(--main-bg);
  color: var(--main-text);
}
</style>
