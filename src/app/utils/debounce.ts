import { ref } from "vue";

const timerId = ref<ReturnType<typeof setTimeout>>();

export default function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    clearTimeout(timerId.value);
    timerId.value = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}