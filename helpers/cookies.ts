import { cookies } from "next/headers"

export const getVisitorId = () => {
  // Т.к. используется cookies, будет работать только для серверных компонентов
  const cookiesList = cookies()
  const visitorIdCookie = cookiesList.get('uid')
  const visitorId = visitorIdCookie ? visitorIdCookie.value : null
  return visitorId
}