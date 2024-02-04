import { defineComponent, ref, h, computed, watch, type PropType } from "vue";
import { renderToString } from "vue/server-renderer";
import SliderNavigation from './SliderNavigation.vue'

import Swiper from "swiper";
import { Manipulation } from "swiper/modules";
import type { ManipulationMethods } from "swiper/types";


import { addMonths, endOfWeek, format, startOfWeek, subMonths, startOfMonth, addWeeks, subWeeks } from "date-fns";
import { ptBR } from "date-fns/locale";

import { MEDIUM_SCREEN } from "@/app/config/constants/breakpoints";
import { enumTransactionPeriodFilter } from "@/app/services/TransactionService";

type iSwiperProperties = Swiper & ManipulationMethods

interface iSliderOptions {
  label: string, value: string
}

const createSliderOption = ({ label, value }: iSliderOptions) => renderToString(h('div', {
  class: "swiper-slide",
  'data-value': value,
}, h('button', {
  class: 'md:w-full w-[175px] block h-full mx-auto  rounded-full text-sm text-gray-800 tracking-[-0.5px] font-medium tracking-wide',
  innerHTML: label,
})))

const handleWeek = (today: Date | number, lastDayOfWeek: Date) => {
  let dateFormat = 'dd/MM'
  const currentYear = new Date(Date.now()).getFullYear()
  const firstDayOfWeek = startOfWeek(new Date(today))

  if (currentYear !== firstDayOfWeek.getFullYear() || currentYear !== lastDayOfWeek.getFullYear())
    dateFormat = 'dd/MM/yy'

  return {
    value: firstDayOfWeek.toISOString(),
    label: format(firstDayOfWeek, dateFormat).concat(' à ').concat(format(lastDayOfWeek, dateFormat))
  }
}

const filters = {
  weekly: (today: Date, type?: 'NEXT' | 'PREV', number: number = 2) => {
    let currentDate = today

    if (type === 'NEXT')
      currentDate = addWeeks(today, number)

    if (type === 'PREV')
      currentDate = subWeeks(today, number)

    return handleWeek(currentDate, endOfWeek(new Date(currentDate)))
  },
  biweekly: (today: Date, type?: 'NEXT' | 'PREV', number: number = 2) => {

    const biweeklyNumber = 2 * number

    let currentDate = today


    if (type === 'NEXT')
      currentDate = addWeeks(today, biweeklyNumber)

    if (type === 'PREV')
      currentDate = subWeeks(today, biweeklyNumber)

    return handleWeek(currentDate, addWeeks(endOfWeek(new Date(currentDate)), 1))
  },
  monthly: (today: Date | number, type?: 'NEXT' | 'PREV', number: number = 2) => {
    let currentDate = today

    if (type === 'NEXT')
      currentDate = addMonths(today, number)

    if (type === 'PREV')
      currentDate = subMonths(today, number)

    const dateFormat = 'MMM/yy'
    const firstDayOfMonth = startOfMonth(new Date(currentDate))

    return {
      value: firstDayOfMonth.toISOString(),
      label: format(firstDayOfMonth, dateFormat, { locale: ptBR })
    }
  }
}

export const TransactionDatesSlider = defineComponent({
  name: 'TransactionDatesSlider',
  props: {
    filter: {
      type: String as PropType<enumTransactionPeriodFilter>,
      default: enumTransactionPeriodFilter.monthly
    }
  },
  emits: ['changeValue'],
  components: {
    SliderNavigation
  },
  setup(props, ctx) {
    const swiper_test = ref()
    const current = ref('')
    const canStartNow = ref<boolean>(false)
    const swiper = computed<iSwiperProperties>(() => swiper_test.value.swiper)

    const prependSlider = async (params: iSliderOptions) => {
      const slider = await createSliderOption(params)
      swiper.value.prependSlide(slider)
      swiper.value.update()
    }

    const appendSlide = async (params: iSliderOptions) => {
      const slider = await createSliderOption(params)
      swiper.value.appendSlide(slider)
      swiper.value.update()
    }

    const handlePrev = async () => {
      swiper.value.slidePrev(200)
    }

    const handleNext = async () => {
      swiper.value.slideNext(200)
    }

    const handleSelectedValue = () => {
      const item = swiper.value.wrapperEl.children.item(swiper.value.activeIndex)
      if (item) {
        current.value = item.getAttribute('data-value') as string
        ctx.emit('changeValue', current.value)
      }
    }

    const initValues = async (date: Date) => {
      await prependSlider(filters[props.filter](date, 'PREV', 1))
      await prependSlider(filters[props.filter](date, 'PREV',))
      await appendSlide(filters[props.filter](date))
      await appendSlide(filters[props.filter](date, 'NEXT', 1))
      canStartNow.value = true
    }
    const getMonth = filters.monthly


    watch(current, async (value: Date | string) => {
      const isSecondLast = swiper.value.realIndex === (swiper.value.wrapperEl.children.length - 2)
      const isSecondItemInArray = swiper.value.realIndex === 1

      const currentAsDate = new Date(value)
      if (isSecondLast) await appendSlide(filters[props.filter](currentAsDate, 'NEXT'))

      if (isSecondItemInArray) await prependSlider(filters[props.filter](currentAsDate, 'PREV'))
    })

    watch(() => props.filter, async () => {
      swiper.value.removeAllSlides()
      await initValues(new Date(current.value))
    })


    return {
      handleNext,
      handlePrev,
      prependSlider,
      appendSlide,
      initValues,
      getMonth,
      handleSelectedValue,
      canStartNow,
      current,
      swiper_test
    }
  },
  async mounted() {

    new Swiper(this.swiper_test, {
      modules: [Manipulation],
      breakpoints: {
        [MEDIUM_SCREEN]: {
          slidesPerView: 3
        }
      },
      initialSlide: 1,
      slidesPerView: 1,
      centeredSlides: true,
      slideToClickedSlide: true,
      loop: true,
      on: {
        slideChangeTransitionEnd: this.handleSelectedValue,
        beforeInit: () => {
          const today = new Date(Date.now())
          this.initValues(today)
          this.handleSelectedValue()
        }
      }
    })



  },
  template: /*html*/ `<div class="mt-6 relative overflow-hidden">
    <div ref="swiper_test" class="swipe h-12">
      <div class="swiper-wrapper">
      </div>
    </div>
    <slider-navigation @slide-next="handleNext" @slide-prev="handlePrev" />
  </div>
  `,
})