'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ListTodo, Plus, CheckCircle2, XCircle, Clock4, LucideIcon, Search, Bell, User } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TaskCard } from '@/components/tasks/TaskCard'
import { CreateTaskDialog } from '@/components/tasks/CreateTaskDialog'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TaskList } from '@/components/tasks/TaskList'
import { useSearchParams } from 'next/navigation'
import { useTaskStats } from '@/hooks/useTaskStats'

interface Task {
  id: string
  title: string
  description: string
  status: string
  dueDate: string
  createdAt: string
  userName?: string
}

export default function Dashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const { stats, isLoading: statsLoading } = useTaskStats()

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setIsCreateDialogOpen(true)
    }
  }, [searchParams])

  const handleTaskCreated = () => {
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <aside className="hidden w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:block">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Tasker Logo"
              width={40}
              height={40}
              className="dark:invert"
            />
            <span className="font-bold text-xl tracking-tight text-gray-800 dark:text-white">Tasker</span>
          </Link>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-blue-100 dark:bg-blue-900 dark:text-white">
            <ListTodo className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/50 dark:text-gray-300">
            <Calendar className="w-5 h-5 mr-3" />
            Calendar
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/50 dark:text-gray-300">
            <Clock className="w-5 h-5 mr-3" />
            Time Tracking
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-4 lg:hidden">
              <ListTodo className="h-6 w-6" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8 w-64 bg-gray-100 dark:bg-gray-700 border-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.email} />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Overview</h2>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> New Task
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Tasks"
                value={stats.total.toString()}
                icon={ListTodo}
                trend={`${stats.dueSoon} due soon`}
                isLoading={statsLoading}
              />
              <StatCard
                title="Completed"
                value={stats.completed.toString()}
                icon={CheckCircle2}
                trend={`${stats.completionRate}% completion rate`}
                className="bg-green-50 dark:bg-green-900/20"
                isLoading={statsLoading}
              />
              <StatCard
                title="In Progress"
                value={stats.inProgress.toString()}
                icon={Clock4}
                trend={`${stats.dueSoon} due soon`}
                className="bg-yellow-50 dark:bg-yellow-900/20"
                isLoading={statsLoading}
              />
              <StatCard
                title="Overdue"
                value={stats.overdue.toString()}
                icon={XCircle}
                trend="Action needed"
                className="bg-red-50 dark:bg-red-900/20"
                isLoading={statsLoading}
              />
            </div>

            {/* Tasks Section */}
            <Card className="mt-8 border-none shadow-lg">
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="today">Due Today</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <TaskList />
                  </TabsContent>
                  {/* Add other TabsContent components similarly */}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
  className?: string
  isLoading?: boolean
}

function StatCard({ title, value, icon: Icon, trend, className = '', isLoading = false }: StatCardProps) {
  return (
    <Card className={`${className} border-none shadow-md dark:shadow-none`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {isLoading ? (
            <div className="h-8 w-16 animate-pulse bg-gray-200 dark:bg-gray-700 rounded"></div>
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {isLoading ? (
            <div className="h-4 w-24 animate-pulse bg-gray-200 dark:bg-gray-700 rounded"></div>
          ) : (
            trend
          )}
        </p>
      </CardContent>
    </Card>
  )
}