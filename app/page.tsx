"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { TaskList } from "@/components/task-list"
import { TaskBoard } from "@/components/task-board"
import { TaskDialog } from "@/components/task-dialog"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import type { Task, ViewMode, TaskCategory } from "@/types/task"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [view, setView] = useState<ViewMode>("list")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | null>(null)
  const [dueDateFilter, setDueDateFilter] = useState<string | null>(null)
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set())

  const { user } = useAuth()

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter ? task.category === categoryFilter : true
      let matchesDueDate = true

      if (dueDateFilter) {
        const dueDate = new Date(task.dueDate)
        const today = new Date()
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

        switch (dueDateFilter) {
          case "today":
            matchesDueDate = dueDate.toDateString() === today.toDateString()
            break
          case "this-week":
            matchesDueDate = dueDate >= weekStart && dueDate < new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
            break
          case "this-month":
            matchesDueDate = dueDate >= monthStart && dueDate < new Date(today.getFullYear(), today.getMonth() + 1, 0)
            break
        }
      }

      return matchesSearch && matchesCategory && matchesDueDate
    })
  }, [tasks, searchQuery, categoryFilter, dueDateFilter])

  const todoTasks = filteredTasks.filter((task) => task.status === "TO-DO")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "IN-PROGRESS")
  const completedTasks = filteredTasks.filter((task) => task.status === "COMPLETED")

  const handleCreateTask = (data: Partial<Task>) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title: data.title!,
      description: data.description,
      status: data.status as Task["status"],
      category: data.category as Task["category"],
      dueDate: data.dueDate!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user?.uid, // Add user ID to task
    }

    setTasks([...tasks, newTask])
    setIsDialogOpen(false)
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task)),
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setSelectedTasks((prev) => {
      const next = new Set(prev)
      next.delete(taskId)
      return next
    })
  }

  const handleTaskSelect = (taskId: string, checked: boolean) => {
    setSelectedTasks((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(taskId)
      } else {
        next.delete(taskId)
      }
      return next
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header
          view={view}
          onViewChange={setView}
          onAddTask={() => {
            setEditingTask(undefined)
            setIsDialogOpen(true)
          }}
          onSearch={setSearchQuery}
          onCategoryFilter={setCategoryFilter}
          onDueDateFilter={setDueDateFilter}
          currentCategoryFilter={categoryFilter}
          currentDueDateFilter={dueDateFilter}
        />
        <main className="container mx-auto py-6">
          {view === "list" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-[auto_1fr_200px_150px_150px_40px] gap-4 px-4 py-2 text-sm text-muted-foreground">
                <div></div>
                <div>Task name</div>
                <div>Due on</div>
                <div>Task Status</div>
                <div>Task Category</div>
                <div></div>
              </div>
              <TaskList
                title="Todo"
                tasks={todoTasks}
                color="#fce7f3"
                onAddTask={() => {
                  setEditingTask(undefined)
                  setIsDialogOpen(true)
                }}
                onEditTask={(task) => {
                  setEditingTask(task)
                  setIsDialogOpen(true)
                }}
                onDeleteTask={handleDeleteTask}
                onStatusChange={(taskId, status) => handleUpdateTask(taskId, { status })}
                onTaskSelect={handleTaskSelect}
              />
              <TaskList
                title="In Progress"
                tasks={inProgressTasks}
                color="#bae6fd"
                onEditTask={(task) => {
                  setEditingTask(task)
                  setIsDialogOpen(true)
                }}
                onDeleteTask={handleDeleteTask}
                onStatusChange={(taskId, status) => handleUpdateTask(taskId, { status })}
                onTaskSelect={handleTaskSelect}
              />
              <TaskList
                title="Completed"
                tasks={completedTasks}
                color="#bbf7d0"
                onEditTask={(task) => {
                  setEditingTask(task)
                  setIsDialogOpen(true)
                }}
                onDeleteTask={handleDeleteTask}
                onStatusChange={(taskId, status) => handleUpdateTask(taskId, { status })}
                onTaskSelect={handleTaskSelect}
              />
            </div>
          ) : (
            <TaskBoard
              tasks={filteredTasks}
              onUpdateTask={handleUpdateTask}
              onEditTask={(task) => {
                setEditingTask(task)
                setIsDialogOpen(true)
              }}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </main>
        <TaskDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
          task={editingTask}
        />
      </div>
    </ProtectedRoute>
  )
}

