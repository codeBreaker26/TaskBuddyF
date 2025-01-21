import { ChevronDown, MoreHorizontal, Plus } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task } from "@/types/task"
import { cn } from "@/lib/utils"

interface TaskListProps {
  title: string
  tasks: Task[]
  color: string
  onAddTask?: () => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task["status"]) => void
  onTaskSelect?: (taskId: string, checked: boolean) => void
}

export function TaskList({
  title,
  tasks,
  color,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onTaskSelect,
}: TaskListProps) {
  return (
    <Collapsible defaultOpen>
      <div
        className={cn(
          "flex items-center justify-between rounded-t-md px-4 py-2",
          color === "#fce7f3" && "bg-pink-100",
          color === "#bae6fd" && "bg-blue-100",
          color === "#bbf7d0" && "bg-green-100",
        )}
      >
        <CollapsibleTrigger className="flex items-center gap-2">
          <h3 className="font-medium">
            {title} ({tasks.length})
          </h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="rounded-b-md border-x border-b bg-background">
        {tasks.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No Tasks in {title}</div>
        ) : (
          <div className="divide-y">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[auto_1fr_200px_150px_150px_40px] items-center gap-4 px-4 py-3 hover:bg-muted/50"
              >
                <Checkbox
                  checked={task.status === "COMPLETED"}
                  onCheckedChange={(checked) => {
                    if (onTaskSelect) {
                      onTaskSelect(task.id, checked as boolean)
                    }
                    onStatusChange(task.id, checked ? "COMPLETED" : "TO-DO")
                  }}
                />
                <div className="flex items-center gap-2">
                  <div className="font-medium">{task.title}</div>
                </div>
                <div className="text-sm text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</div>
                <Select value={task.status} onValueChange={(value) => onStatusChange(task.id, value as Task["status"])}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TO-DO">To Do</SelectItem>
                    <SelectItem value="IN-PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2 py-1 text-xs font-medium",
                      task.category === "WORK" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700",
                    )}
                  >
                    {task.category}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditTask(task)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => onDeleteTask(task.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
        {onAddTask && (
          <div className="border-t p-4">
            <Button variant="ghost" className="w-full justify-start" onClick={onAddTask}>
              <Plus className="mr-2 h-4 w-4" />
              ADD TASK
            </Button>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

