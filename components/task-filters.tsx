import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskCategory } from "@/types/task"

interface TaskFiltersProps {
  onCategoryFilter: (category: TaskCategory | null) => void
  onDueDateFilter: (filter: string | null) => void
  currentCategoryFilter: TaskCategory | null
  currentDueDateFilter: string | null
}

export function TaskFilters({ 
  onCategoryFilter, 
  onDueDateFilter, 
  currentCategoryFilter, 
  currentDueDateFilter 
}: TaskFiltersProps) {
  const getCategoryDisplayText = (category: TaskCategory | null) => {
    switch (category) {
      case "WORK": return "Work"
      case "PERSONAL": return "Personal"
      default: return "All Categories"
    }
  }

  const getDueDateDisplayText = (filter: string | null) => {
    switch (filter) {
      case "today": return "Today"
      case "this-week": return "This Week"
      case "this-month": return "This Month"
      default: return "All Dates"
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Filter by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {getCategoryDisplayText(currentCategoryFilter)}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onCategoryFilter(null)}>All Categories</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCategoryFilter("WORK")}>Work</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCategoryFilter("PERSONAL")}>Personal</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {getDueDateDisplayText(currentDueDateFilter)}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onDueDateFilter(null)}>All Dates</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDueDateFilter("today")}>Today</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDueDateFilter("this-week")}>This Week</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDueDateFilter("this-month")}>This Month</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

