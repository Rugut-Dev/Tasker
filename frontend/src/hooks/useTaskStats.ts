'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  completionRate: number;
  dueSoon: number;
}

export function useTaskStats() {
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0,
    completionRate: 0,
    dueSoon: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const calculateStats = (tasks: any[]) => {
    const now = new Date();
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 2).length;
    const inProgress = tasks.filter(task => task.status === 1).length;
    const overdue = tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate < now && task.status !== 2;
    }).length;
    const dueSoon = tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(now.getDate() + 3);
      return dueDate <= threeDaysFromNow && dueDate >= now && task.status !== 2;
    }).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({
      total,
      completed,
      inProgress,
      overdue,
      completionRate,
      dueSoon,
    });
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/TodoTask');
      calculateStats(response.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch task statistics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, isLoading, refetch: fetchStats };
} 