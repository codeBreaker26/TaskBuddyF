import { Checkbox } from "@/components/ui/checkbox"
import { Task } from "@/lib/types"

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="flex items-center gap-4 p-4">
      <Checkbox />
      <div className="flex-1">
        <div className="font-medium">{task.title}</div>
        <div className="text-sm text-muted-foreground">{task.dueDate}</div>
      </div>
      <div className="text-sm font-medium">
        {task.status}
      </div>
    </div>
  )
}

