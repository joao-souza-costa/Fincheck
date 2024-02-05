import { addMonths, addWeeks, endOfWeek, format, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns"
import { ptBR } from "date-fns/locale"

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

export default {
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
