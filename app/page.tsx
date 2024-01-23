import { DateTime } from "luxon"
import { redirect } from "next/navigation"

const page = () => {
  const date = DateTime.now().toFormat('dd-MM-yyyy')
  return redirect(`/month/${date}`)
}

export default page