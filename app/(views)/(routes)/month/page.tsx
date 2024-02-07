import { DateTime } from 'luxon'
import { redirect } from 'next/navigation'

const page = () => {
  const key = DateTime.now().toFormat('dd-MM-yyyy')
  return redirect(`/month/${key}`)
}

export default page