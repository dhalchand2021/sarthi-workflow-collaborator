
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Clock,
  MoreHorizontal,
  Users,
  FileText,
  ExternalLink
} from 'lucide-react';

export type ProjectStatus = 'active' | 'pending' | 'completed' | 'hold';

interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;
  client?: string;
  team?: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  tasksCount?: number;
  className?: string;
  onClick?: () => void;
}

const statusConfig = {
  active: { label: 'Active', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  hold: { label: 'On Hold', color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300' }
};

const ProjectCard = ({
  id,
  title,
  description,
  status,
  progress,
  deadline,
  client,
  team = [],
  tasksCount = 0,
  className,
  onClick,
}: ProjectCardProps) => {
  const formattedDate = new Date(deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Calculate if project is near deadline (within 7 days)
  const isNearDeadline = 
    status !== 'completed' && 
    new Date(deadline).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000 &&
    new Date(deadline) > new Date();
    
  // Calculate if project is overdue
  const isOverdue = status !== 'completed' && new Date(deadline) < new Date();
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-elevated cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn(statusConfig[status].color)}>
                {statusConfig[status].label}
              </Badge>
              {client && (
                <span className="text-xs text-muted-foreground">
                  {client}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => e.stopPropagation()}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="font-medium">Progress</div>
          <div className={cn(
            progress === 100 ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
          )}>
            {progress}%
          </div>
        </div>
        
        <Progress value={progress} className="h-1.5 mb-4" />
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className={cn(
              "text-sm",
              isOverdue 
                ? "text-destructive font-medium" 
                : isNearDeadline 
                  ? "text-amber-600 dark:text-amber-400 font-medium" 
                  : "text-muted-foreground"
            )}>
              {formattedDate}
            </span>
          </div>
          
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {tasksCount} Tasks
            </span>
          </div>
        </div>
        
        {team.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {team.slice(0, 4).map((member) => (
                <Avatar key={member.id} className="h-7 w-7 border-2 border-background">
                  {member.avatar ? (
                    <AvatarImage src={member.avatar} alt={member.name} />
                  ) : (
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
              ))}
              
              {team.length > 4 && (
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-medium text-muted-foreground">
                    +{team.length - 4}
                  </span>
                </div>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2.5 text-xs text-muted-foreground gap-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;
