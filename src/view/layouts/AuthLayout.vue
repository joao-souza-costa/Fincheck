<template>
  <div class="flex flex-row h-full">
    <section class="lg:w-1/2 w-full h-full flex items-center justify-center flex-col gap-16">
      <fincheck-logo class="text-gray-500 h-6" />
      <div class="max-w-[504px] w-full px-8">
        <router-view />
      </div>
    </section>

    <section class="w-1/2 h-full hidden justify-center items-center p-8 relative lg:flex">
      <img
        :src="ilustration"
        class="object-contain w-full h-full max-w-[656px] select-none max-h-[960px] rounded-[32px]"
      />

      <div class="max-w-[592px] bottom-8 rounded-b-[32px] bg-white p-10 absolute rounded-[32px]">
        <fincheck-logo class="text-teal-900 h-8" />

        <p class="mt-8">
          Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor,
          totalmente de graça!
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ilustration from '@/assets/images/ilustration.png'
import FincheckLogo from '@/view/components/FincheckLogo.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
#home-view {
  margin: 3.2rem;
}
</style>
