<template>
  <header class="flex flex-col items-center gap-4">
    <h1 class="text-2xl text-bold text-gray-900 tracking-[-1px]">Crie sua conta</h1>
    <p class="space-x-2">
      <span class="tracking-[-0.5px] text-gray-700"> Já possui sua conta ? </span>
      <router-link :to="{ name: LOGIN.name }" class="tracking-[-1px] font-medium text-teal-900">
        Fazer login
      </router-link>
    </p>
  </header>

  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="mt-[60px] flex flex-col items-center gap-4"
  >
    <base-input type="text" id="name" name="name" placeholder="Nome" />
    <base-input type="text" id="email" name="email" placeholder="Email" />
    <base-input type="password" id="password" name="password" placeholder="Senha" />
    <base-input
      type="password"
      id="password"
      name="confirmPassword"
      placeholder="Confirmar senha"
    />
    <base-button :is-loading="isLoading" type="submit" class="w-full"> Criar conta </base-button>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { RouterLink } from 'vue-router'
import { LOGIN } from '@/app/config/constants/route'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import { useRegisterController } from './useRegisterController'

const { schema, onSubmit, isLoading } = useRegisterController()
</script>

<style scoped></style>
