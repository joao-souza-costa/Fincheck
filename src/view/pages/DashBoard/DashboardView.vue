<template>
  <div class="h-full">
    <main class="flex-1 h-full flex flex-col md:flex-row gap-4 max-h-[95%]">
      <div class="w-full md:max-w-[49.5%]">
        <accounts-view />
      </div>
      <div class="w-full md:max-w-[49.5%] ">
        <transactions-view id="transaction-view" />
      </div>
    </main>

    <base-fab />
    <account-modals />
    <transaction-modals />
  </div>
</template>

<script setup lang="ts">
import AccountsView from './components/AccountsView.vue'
import TransactionsView from './components/TransactionsView.vue'
import BaseFab from '@/view/components/BaseFab.vue'
import AccountModals from './components/modals/AccountModals.vue'
import { useBalanceProvider } from './providers/balanceProvider'
import { useModalsProvider } from './providers/modalsProvider'
import TransactionModals from './components/modals/TransactionModals/TransactionModals.vue'

useBalanceProvider()
useModalsProvider()
</script>

<style scoped></style>
