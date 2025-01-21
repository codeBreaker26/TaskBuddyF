import { MoreHorizontal } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/types/task"
import { cn } from "@/lib/utils"

interface TaskBoardProps {
  tasks: Task[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskBoard({
  tasks,
  onUpdateTask,
  onEditTask,
  onDeleteTask,
}: TaskBoardProps) {
  const columns = [
    { id: "TO-DO", title: "TO-DO", color: "bg-pink-100" },
    { id: "IN-PROGRESS", title: "IN-PROGRESS", color: "bg-blue-100" },
    { id: "COMPLETED", title: "COMPLETED", color: "bg-green-100" },
  ] as const

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const taskId = result.draggableId
    const newStatus = result.destination.droppableId as Task["status"]

    onUpdateTask(taskId, { status: newStatus })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col rounded-lg bg-gray-50"
          >
            <div className="p-2">
              <div className={cn("rounded-md px-3 py-2 text-sm font-medium", column.color)}>
                {column.title}
              </div>
            </div>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 p-2"
                >
                  {tasks.filter((task) => task.status === column.id).length ===
                  0 ? (
                    <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
                      No Tasks in {column.title.toLowerCase()}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {tasks
                        .filter((task) => task.status === column.id)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="rounded-lg border bg-white p-3 shadow-sm"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="font-medium">{task.title}</div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() => onEditTask(task)}
                                      >
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => onDeleteTask(task.id)}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                  <span>{task.category}</span>
                                  <span>{task.dueDate}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

