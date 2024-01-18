
const MonthDayNames = () => {
  return (
    <div className="w-full h-10 shrink-0 grid grid-cols-7 grid-rows-1 border-b border-x bg-card">
      <div className="w-full h-full py-2 px-3">
        <span className="text-sm text-muted-foreground">Понедельник</span>
      </div>
      <div className="w-full h-full py-2 px-3">
        <span className="text-sm text-muted-foreground">Вторник</span>
      </div>
      <div className="w-full h-full py-2 px-3">
        <span className="text-sm text-muted-foreground">Среда</span>
      </div>
      <div className="w-full h-full py-2 px-3">
        <span className="text-sm text-muted-foreground">Четверг</span>
      </div>
      <div className="w-full h-full py-2 px-3">
        <span className="text-sm text-muted-foreground">Пятница</span>
      </div>
      <div className="w-full h-full py-2 px-3">
        <span className="text-sm text-muted-foreground">Суббота</span>
      </div>
      <div className="w-full h-full py-2 px-2">
        <span className="text-sm text-muted-foreground">Воскресенье</span>
      </div>
    </div>
  )
}

export default MonthDayNames