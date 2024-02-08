'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const NewTodoModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild><Button>Добавить задачу</Button></DialogTrigger>
      <DialogContent>

      </DialogContent>
    </Dialog>
  )
}

export default NewTodoModal