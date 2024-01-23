import Header from "@/components/widgets/header"

type Props = {
  children: JSX.Element | JSX.Element[]
}
const layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      { children }
    </>
  )
}

export default layout