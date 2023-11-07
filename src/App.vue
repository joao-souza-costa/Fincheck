<script setup lang="ts">
import { RouterView } from 'vue-router'
import LaunchView from './view/pages/LauchView.vue'

import { useUserStore } from './app/store/useUserProvider'
const userStore = useUserStore()
</script>

<template>
  <LaunchView class="z-10 absolute" :is-loading="userStore.isFetching" />
  <RouterView v-if="!userStore.isFetching" />
</template>
