import { DateTime } from "luxon"

export const parseDate = (dateKey: string) => {
  // dateKey: dd-MM-yyyy -> 24-01-2024
  const date = dateKey
  ? DateTime.fromFormat(dateKey, 'dd-MM-yyyy').setLocale('ru')
  : DateTime.now().setLocale('ru')
  const actualDate = DateTime.now().setLocale('ru')
  const result_obj = {
    date: date, // Дата, которую получили из прокинутого dateKey
    actual_date: actualDate, // Текущая дата
    key: dateKey
  }
  return result_obj
}