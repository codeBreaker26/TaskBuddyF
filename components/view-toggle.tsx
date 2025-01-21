import { LayoutList, Trello } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ViewMode } from "@/types/task"

interface ViewToggleProps {
  view: ViewMode
  onChange: (view: ViewMode) => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
      >
        <LayoutList className="mr-2 h-4 w-4" />
        List
      </Button>
      <Button
        variant={view === "board" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("board")}
      >
        <Trello className="mr-2 h-4 w-4" />
        Board
      </Button>
    </div>
  )
}

