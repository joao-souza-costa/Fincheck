<template>
  <header class="flex flex-col items-center gap-4">
    <h1 class="text-2xl text-bold text-gray-900 tracking-[-1px]">Redefinição de senha</h1>
  </header>

  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="mt-[30px] flex flex-col items-center gap-4"
  >
    <base-input type="password" id="password" name="password" placeholder="Nova senha" />
    <base-input
      type="password"
      id="password"
      name="confirmPassword"
      placeholder="Confirmar nova senha"
    />
    <base-button :is-loading="isLoading" type="submit" class="w-full mt-2"> Confirmar </base-button>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseButton from '@/view/components/BaseButton.vue'

import { useForgotConfirmPasswordController } from './useForgotConfirmPasswordController'

const { schema, onSubmit, isLoading } = useForgotConfirmPasswordController()
</script>

<style scoped></style>
