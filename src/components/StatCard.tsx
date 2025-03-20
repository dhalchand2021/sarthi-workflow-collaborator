
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown,
  MoreHorizontal 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const StatCard = ({
  title,
  value,
  change,
  icon,
  className,
  isLoading = false,
}: StatCardProps) => {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 group hover:shadow-elevated",
      className
    )}>
      {/* Background pattern for design flair */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 rotate-45 translate-x-8 -translate-y-8">
        {icon && React.cloneElement(icon as React.ReactElement, {
          className: "w-full h-full"
        })}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
        
        {isLoading ? (
          <div className="h-9 w-28 rounded-md bg-muted animate-pulse" />
        ) : (
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold">{value}</span>
            
            {change && (
              <div className={cn(
                "flex items-center ml-3 text-xs font-medium px-1.5 py-0.5 rounded-full",
                change.type === 'increase' 
                  ? "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400" 
                  : "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400"
              )}>
                {change.type === 'increase' ? (
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-0.5" />
                )}
                <span>{Math.abs(change.value)}%</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Accent bottom line with animation */}
      <div className={cn(
        "absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500",
        change?.type === 'increase' ? "bg-green-500" : 
        change?.type === 'decrease' ? "bg-red-500" : 
        "bg-primary"
      )} />
    </Card>
  );
};

export default StatCard;
