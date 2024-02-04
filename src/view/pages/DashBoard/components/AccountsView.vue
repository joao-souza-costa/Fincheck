<template>
  <div class="bg-teal-900 rounded-2xl h-full w-full md:p-10 px-4 py-8 flex flex-col">
    <template v-if="isLoading">
      <div class="w-full h-full flex justify-center items-center">
        <base-spinner class="w-10 h-10" />
      </div>
    </template>
    <template v-else>
      <div>
        <span class="text-white block tracking-[-0.5px]">Saldo Total</span>
        <div class="flex flex-row items-center gap-2">
          <base-balance class="text-2xl tracking-[-1px] text-white" :balance="total" />
          <button class="w-8 h-8 flex items-center justify-center" @click="toggleEye">
            <eye-icon :open="eyeOpen" />
          </button>
        </div>
      </div>

      <div class="flex flex-1 flex-col justify-end mt-10 md:mt-0">
        <div v-if="!accounts?.length">
          <div class="mb-4">
            <strong class="text-white tracking-[-1px] text-lg"> Minhas contas </strong>
          </div>
          <base-button
            @click="toggleAccountModal('CREATE')"
            class="w-full h-52 mt-4 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col justify-center items-center gap-4 text-white"
          >
            <div
              class="w-11 h-11 rounded-full border-2 border-dashed border-white flex justify-center items-center"
            >
              <plus-icon class="w-6 h-6" />
            </div>
            <span class="tracking-[-0.5px] font-medium block w-32 text-center">
              Cadastrar uma nova conta
            </span>
          </base-button>
        </div>

        <div v-if="accounts?.length">
          <swiper
            :space-between="16"
            :slides-per-view="1.5"
            :breakpoints="{
              [MEDIUM_SCREEN]: {
                slidesPerView: 2.1
              }
            }"
          >
            <template #container-start>
              <div class="flex items-center justify-between mb-4">
                <strong class="text-white tracking-[-1px] text-lg"> Minhas contas </strong>
                <slider-navigation />
              </div>
            </template>

            <swiper-slide v-for="account in accounts" :key="account!.id">
              <account-card
                v-if="account"
                @click="toggleAccountModal('EDIT', account)"
                :balance="account.currentBalance"
                :color="account.color"
                :name="account.name"
                :type="account.type"
                :id="account.id"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseSpinner from '@/view/components/BaseSpinner.vue'
import AccountCard from './Accounts/accountCard.vue'
import SliderNavigation from './Accounts/sliderNavigation.vue'
import EyeIcon from '@/view/components/icons/EyeIcon.vue'
import PlusIcon from '@/view/components/icons/PlusIcon.vue'
import BaseBalance from '@/view/components/BaseBalance.vue'

import { MEDIUM_SCREEN } from '@/app/config/constants/breakpoints'
import { useAccountsController } from './accountsController'
import { type modalsProviderProps, MODALS_PROVIDER } from '../providers/modalsProvider'

const { toggleAccountModal } = inject(MODALS_PROVIDER) as modalsProviderProps

const { accounts, total, isLoading, eyeOpen, toggleEye } = useAccountsController()
</script>
