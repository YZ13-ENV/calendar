import Header from "@/components/widgets/header"

type Props = {
  children: JSX.Element | JSX.Element[]
}
const layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: 'calc(100vh - 64px)' }} className="w-full">{children}</div>
    </>
  )
}

export default layout