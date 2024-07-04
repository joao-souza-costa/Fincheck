import { h } from 'vue'

export interface iCell {
  [key: string]: {
    key: string
    value?: string
    class?: string
  }
}

export default (item: iCell, slots: { [key: string]: Function }) => {
  const tableData = []

  for (const property in item) {
    const attributes = {
      key: item[property]?.key,
      class: [item[property].class, `w-1/${Object.keys(item).length}`]
    }

    tableData.push(
      h('td', attributes, slots[`body.${attributes.key}`]?.({ item }) || item[property].value)
    )
  }

  return h(
    'tr',
    {
      class:
        'py-3 px-5 cursor-pointer hover:bg-gray-100 flex items-center justify-between border border-b-gray-300 transition-all'
    },
    tableData
  )
}
