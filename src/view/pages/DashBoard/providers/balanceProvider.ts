import { ref, type Ref, provide } from "vue"

export type balanceProviderProps = {
  areVisible: Ref<boolean>
  toggleVisibility: Function
}


export function useBalanceProvider() {

  const areVisible = ref<boolean>(true)

  function toggleVisibility() {
    return areVisible.value = !areVisible.value
  }

  provide('balanceProvider', {
    areVisible,
    toggleVisibility
  })

}