<template>
  <header class="flex flex-col items-center gap-4">
    <h1 class="text-2xl text-bold text-gray-900 tracking-[-1px]">Entre em sua conta</h1>
    <p class="space-x-2">
      <span class="tracking-[-0.5px] text-gray-700"> Novo por aqui ? </span>
      <router-link :to="{ name: REGISTER.name }" class="tracking-[-1px] font-medium text-teal-900">
        Crie sua conta
      </router-link>
    </p>
  </header>

  <form action="" class="mt-[60px] flex flex-col items-center gap-4">
    <base-input type="text" id="email" name="email" placeholder="Email" />
    <base-input type="password" id="password" name="password" placeholder="Password" />
    <base-button type="submit" class="w-full"> Entrar </base-button>
  </form>
</template>

<script setup lang="ts">
import { REGISTER } from '@/router/const'
import { RouterLink } from 'vue-router'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
</script>

<style scoped></style>
