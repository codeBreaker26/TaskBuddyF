export type TaskStatus = 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
export type TaskCategory = 'WORK' | 'PERSONAL'
export type ViewMode = 'list' | 'board'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  category: TaskCategory
  dueDate: string
  createdAt: string
  updatedAt: string
  attachments?: string[]
}

export interface TaskActivity {
  id: string
  taskId: string
  action: string
  timestamp: string
}

