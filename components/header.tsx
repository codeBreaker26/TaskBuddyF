import { ClipboardList, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ViewToggle } from "./view-toggle"
import { TaskFilters } from "./task-filters"
import { UserNav } from "./user-nav"
import type { ViewMode, TaskCategory } from "@/types/task"

interface HeaderProps {
  view: ViewMode
  onViewChange: (view: ViewMode) => void
  onAddTask: () => void
  onSearch: (query: string) => void
  onCategoryFilter: (category: TaskCategory | null) => void
  onDueDateFilter: (filter: string | null) => void
  currentCategoryFilter: TaskCategory | null
  currentDueDateFilter: string | null
}

export function Header({
  view,
  onViewChange,
  onAddTask,
  onSearch,
  onCategoryFilter,
  onDueDateFilter,
  currentCategoryFilter,
  currentDueDateFilter,
}: HeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="flex h-14 items-center gap-4 px-4">
        <div className="flex items-center gap-2 font-semibold">
          <ClipboardList className="h-5 w-5" />
          <span>TaskBuddy</span>
        </div>
        <ViewToggle view={view} onChange={onViewChange} />
        <TaskFilters
          onCategoryFilter={onCategoryFilter}
          onDueDateFilter={onDueDateFilter}
          currentCategoryFilter={currentCategoryFilter}
          currentDueDateFilter={currentDueDateFilter}
        />
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="w-[200px] pl-8"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <Button onClick={onAddTask} className="bg-purple-600 hover:bg-purple-700">
            ADD TASK
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

