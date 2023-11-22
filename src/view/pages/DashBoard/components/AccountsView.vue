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
          <base-balance class="text-2xl tracking-[-1px] text-white" :balance="1000" />
          <button class="w-8 h-8 flex items-center justify-center" @click="toggleEye">
            <eye-icon :open="eyeOpen" />
          </button>
        </div>
      </div>

      <div class="flex flex-1 flex-col justify-end mt-10 md:mt-0">
        <div v-if="!accounts.length">
          <div class="mb-4">
            <strong class="text-white tracking-[-1px] text-lg"> Minhas compras </strong>
          </div>
          <base-button
            class="w-full h-52 mt-4 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col justify-center items-center gap-4 text-white"
          >
            <div
              class="w-11 h-11 rounded-full border-2 border-dashed border-white flex justify-center items-center"
            >
              <plus-icon class="w-6 h-6" />
            </div>
            <span class="tracking-[-0.5px] font-medium block w-32 text-center"
              >Cadastrar uma nova conta</span
            >
          </base-button>
        </div>

        <div v-if="accounts.length">
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
                <strong class="text-white tracking-[-1px] text-lg"> Minhas compras </strong>
                <slider-navigation />
              </div>
            </template>

            <swiper-slide>
              <account-card :balance="123" color="#7950F2" name="Nubank" type="CASH" />
            </swiper-slide>

            <swiper-slide>
              <account-card :balance="10003" color="#333" name="XP" type="INVESTMENT" />
            </swiper-slide>

            <swiper-slide>
              <account-card :balance="10003" color="#0f0" name="Carteira" type="CHECKING" />
            </swiper-slide>
            <swiper-slide>
              <account-card :balance="10003" color="#0f0" name="Carteira" type="CHECKING" />
            </swiper-slide>
            <swiper-slide>
              <account-card :balance="10003" color="#0f0" name="Carteira" type="CHECKING" />
            </swiper-slide>

            <swiper-slide>
              <account-card :balance="10003" color="#0f0" name="Carteira" type="CHECKING" />
            </swiper-slide>
            <swiper-slide>
              <account-card :balance="10003" color="#0f0" name="Carteira" type="CHECKING" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseSpinner from '@/view/components/BaseSpinner.vue'
import AccountCard from './Accounts/accountCard.vue'
import SliderNavigation from './Accounts/sliderNavigation.vue'
import EyeIcon from '@/view/components/icons/EyeIcon.vue'
import PlusIcon from '@/view/components/icons/PlusIcon.vue'
import baseBalance from './base/baseBalance.vue'

import { MEDIUM_SCREEN } from '@/app/config/constants/breakpoints'
import { useAccountsController } from './accountsController'

const { accounts, isLoading, eyeOpen, toggleEye } = useAccountsController()
</script>
