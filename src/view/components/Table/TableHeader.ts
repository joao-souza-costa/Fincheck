import { h } from 'vue'

export interface iHeader {
  key: string
  title?: string
  class: string
}

export default (headers: iHeader[], slots: { [key: string]: Function }) => {
  const th = h(
    'tr',
    { class: 'w-full' },
    headers?.map((header, key) => {
      return h(
        'th',
        { class: [`inline-block font-normal w-1/${headers.length}`, header.class], key },
        slots?.[`header.${header?.key}`]?.() || header?.title || header?.key
      )
    })
  )
  return h(
    'thead',
    { class: 'sticky p-5 top-0 flex justify-between border border-b-gray-300 bg-white' },
    th
  )
}