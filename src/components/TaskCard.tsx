
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  UserCircle,
  FileText,
  Paperclip,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'processing' | 'completed' | 'escalated';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  project?: string;
  assignee?: string;
  attachments?: number;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  className?: string;
}

const priorityConfig = {
  low: { label: 'Low', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  medium: { label: 'Medium', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  high: { label: 'High', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300' }
};

const statusConfig = {
  pending: { 
    label: 'Pending', 
    color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300',
    icon: Clock
  },
  processing: { 
    label: 'Processing', 
    color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
    icon: Clock
  },
  completed: { 
    label: 'Completed', 
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    icon: CheckCircle2
  },
  escalated: { 
    label: 'Escalated', 
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    icon: AlertCircle
  }
};

const TaskCard = ({
  id,
  title,
  description,
  dueDate,
  priority,
  status,
  project,
  assignee,
  attachments = 0,
  onStatusChange,
  className,
}: TaskCardProps) => {
  const StatusIcon = statusConfig[status].icon;
  const formattedDate = new Date(dueDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });
  
  // Calculate if task is overdue
  const isOverdue = new Date(dueDate) < new Date() && status !== 'completed';
  
  const handleStatusChange = (newStatus: TaskStatus) => {
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-elevated card-hover border",
      status === 'completed' && "opacity-80",
      className
    )}>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col">
            {project && (
              <span className="text-xs text-muted-foreground mb-1">{project}</span>
            )}
            <h3 className="font-medium text-base">{title}</h3>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleStatusChange('pending')}>Mark as Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('processing')}>Mark as Processing</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>Mark as Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('escalated')}>Escalate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn(priorityConfig[priority].color)}>
              {priorityConfig[priority].label}
            </Badge>
            
            <Badge variant="outline" className={cn(statusConfig[status].color)}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig[status].label}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span className={cn(
              isOverdue ? "text-destructive font-medium" : "text-muted-foreground"
            )}>
              {formattedDate}
              {isOverdue && " (Overdue)"}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {attachments > 0 && (
              <div className="flex items-center">
                <Paperclip className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{attachments}</span>
              </div>
            )}
            
            {assignee && (
              <div className="flex items-center">
                <UserCircle className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{assignee}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom progress indicator */}
      {status === 'processing' && (
        <div className="h-1 bg-muted w-full overflow-hidden">
          <div className="h-full bg-primary w-3/5 animate-pulse-subtle" />
        </div>
      )}
    </Card>
  );
};

export default TaskCard;
