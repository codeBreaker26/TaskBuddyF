'use client'

import { useState } from 'react'
import { Layout } from "@/components/layout"
import { TaskBoard } from "@/components/task-board"
import { TaskDialog } from "@/components/task-dialog"
import { Task } from "@/types/task"

export default function BoardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()

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
      userId: '1', // Placeholder userId since we're not using auth
    }

    setTasks([...tasks, newTask])
    setIsDialogOpen(false)
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    )
    setIsDialogOpen(false)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <Layout onAddTask={() => {
      setEditingTask(undefined)
      setIsDialogOpen(true)
    }}>
      <TaskBoard
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onEditTask={(task) => {
          setEditingTask(task)
          setIsDialogOpen(true)
        }}
        onDeleteTask={handleDeleteTask}
      />
      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
        task={editingTask}
      />
    </Layout>
  )
}

