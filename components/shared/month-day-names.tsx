
const MonthDayNames = () => {
  const day_names = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ]
  return (
    <div className="w-full h-fit shrink-0 grid grid-cols-7 grid-rows-1 border-b border-x bg-card">
      {
        day_names.map(name =>
          <div className="w-full h-full py-1 px-3" key={name}>
            <span className="text-xs text-muted-foreground">{ name }</span>
          </div>
        )
      }
    </div>
  )
}

export default MonthDayNames