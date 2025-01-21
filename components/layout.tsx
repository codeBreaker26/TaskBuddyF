import { ClipboardList } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LayoutProps {
  children: React.ReactNode
  onAddTask: () => void
}

export function Layout({ children, onAddTask }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="flex h-14 items-center gap-4 px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ClipboardList className="h-5 w-5" />
            <span>TaskBuddy</span>
          </Link>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  List
                </Button>
                <Button variant="default" size="sm">
                  Board
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <Button variant="outline" size="sm">
                  Category
                </Button>
                <Button variant="outline" size="sm">
                  Due Date
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search tasks..."
                className="w-[200px]"
              />
              <Button onClick={onAddTask} className="bg-purple-600 hover:bg-purple-700">
                ADD TASK
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}

