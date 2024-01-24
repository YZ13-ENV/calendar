
type Props = {
  children: JSX.Element | JSX.Element[]
}
const layout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-6">
      {children}
    </div>
  )
}

export default layout