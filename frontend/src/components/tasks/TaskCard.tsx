'use client';   

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, Circle, MoreVertical } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
    createdAt: string;
  };
  onTaskUpdated: () => void;
}

enum TaskStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2
}

export function TaskCard({ task, onTaskUpdated }: TaskCardProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.Completed:
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case TaskStatus.InProgress:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case TaskStatus.Pending:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.Completed:
        return <CheckCircle className="h-4 w-4" />;
      case TaskStatus.InProgress:
        return <Circle className="h-4 w-4" />;
      case TaskStatus.Pending:
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: TaskStatus) => {
    return TaskStatus[status];
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      await api.put(`/TodoTask/${task.id}`, {
        ...task,
        status: newStatus
      });
      onTaskUpdated();
      toast({
        title: "Success",
        description: "Task status updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/TodoTask/${task.id}`);
      onTaskUpdated();
      toast({
        title: "Success",
        description: "Task deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700" onClick={() => setIsExpanded(!isExpanded)}>
        <CardHeader className="flex flex-row items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Badge className={`${getStatusColor(task.status)} flex items-center space-x-1 px-2 py-1 rounded-lg`}>
              {getStatusIcon(task.status)}
              <span>{getStatusText(task.status)}</span>
            </Badge>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{task.title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg shadow-lg">
              <DropdownMenuItem onClick={() => handleStatusChange(TaskStatus.Pending)}>
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(TaskStatus.InProgress)}>
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(TaskStatus.Completed)}>
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 dark:text-red-400">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-5">
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Due {format(new Date(task.dueDate), 'PPP')}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Created {formatDistanceToNow(new Date(task.createdAt))} ago</span>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
