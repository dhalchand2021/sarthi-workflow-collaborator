
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StatCard from './StatCard';
import TaskCard from './TaskCard';
import ProjectCard from './ProjectCard';
import UserProfile from './UserProfile';
import { 
  BarChart3, 
  Users, 
  FileClock, 
  CheckCircle2, 
  Bell,
  FileBarChart,
  AlertCircle,
  ArrowUpRight,
  PlusCircle,
  MoreHorizontal,
  UserPlus,
  FileUp,
  CalendarClock
} from 'lucide-react';

interface DashboardProps {
  className?: string;
}

const Dashboard = ({ className }: DashboardProps) => {
  // Sample data
  const stats = [
    { title: 'Active Employees', value: '48', change: { value: 12, type: 'increase' as const }, icon: <Users /> },
    { title: 'Ongoing Projects', value: '6', change: { value: 2, type: 'increase' as const }, icon: <FileBarChart /> },
    { title: 'Pending Tasks', value: '32', change: { value: 5, type: 'decrease' as const }, icon: <FileClock /> },
    { title: 'Completed Tasks', value: '189', change: { value: 24, type: 'increase' as const }, icon: <CheckCircle2 /> },
  ];
  
  const recentTasks = [
    {
      id: '1',
      title: 'Data Entry Verification',
      description: 'Verify customer data entries from recent campaign',
      dueDate: '2023-08-12',
      priority: 'high' as const,
      status: 'pending' as const,
      project: 'FinTech Solutions',
      assignee: 'John D.',
      attachments: 2
    },
    {
      id: '2',
      title: 'Call Script Review',
      description: 'Review and approve updated call scripts for outbound campaign',
      dueDate: '2023-08-15',
      priority: 'medium' as const,
      status: 'processing' as const,
      project: 'TeleHealth Support',
      assignee: 'Sarah M.',
      attachments: 1
    },
    {
      id: '3',
      title: 'Customer Feedback Analysis',
      dueDate: '2023-08-10',
      priority: 'low' as const,
      status: 'completed' as const,
      project: 'E-commerce Support',
      assignee: 'Alex K.'
    }
  ];
  
  const projects = [
    {
      id: '1',
      title: 'FinTech Solutions Support',
      description: 'Customer support for banking application users',
      status: 'active' as const,
      progress: 65,
      deadline: '2023-09-30',
      client: 'GlobalBank Inc.',
      team: [
        { id: '1', name: 'Alice Johnson' },
        { id: '2', name: 'Bob Smith' },
        { id: '3', name: 'Carol Davis' },
        { id: '4', name: 'Dave Wilson' },
        { id: '5', name: 'Eve Brown' }
      ],
      tasksCount: 24
    },
    {
      id: '2',
      title: 'TeleHealth Support Project',
      description: 'Medical appointment scheduling and patient support',
      status: 'active' as const,
      progress: 42,
      deadline: '2023-10-15',
      client: 'MediCare Plus',
      team: [
        { id: '6', name: 'Frank Miller' },
        { id: '7', name: 'Grace Lee' },
        { id: '8', name: 'Henry Clark' }
      ],
      tasksCount: 18
    }
  ];
  
  const notifications = [
    { id: '1', title: 'Task deadline approaching', description: 'Data Entry Verification is due in 2 days', time: '2 hours ago' },
    { id: '2', title: 'New project assigned', description: 'You have been assigned to E-commerce Support project', time: '5 hours ago' },
    { id: '3', title: 'Quality check completed', description: 'Your task "Customer Feedback Analysis" passed QC with 95% score', time: '1 day ago' }
  ];
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Tasks */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Recent Tasks</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Create Task
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-muted-foreground text-sm gap-1">
                  View All Tasks
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Active Projects */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Active Projects</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  New Project
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-muted-foreground text-sm gap-1">
                  View All Projects
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* User Profile */}
          <UserProfile
            name="Jane Smith"
            role="Team Leader"
            email="jane.smith@sarthi.com"
            phone="+1 (555) 123-4567"
            location="New York, USA"
            joinDate="2023-01-15"
            kycStatus="verified"
          />
          
          {/* Quick Actions */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start gap-2 py-5">
                  <UserPlus className="h-4 w-4 text-primary" />
                  <span>Add Employee</span>
                </Button>
                
                <Button variant="outline" className="justify-start gap-2 py-5">
                  <FileUp className="h-4 w-4 text-primary" />
                  <span>Upload Data</span>
                </Button>
                
                <Button variant="outline" className="justify-start gap-2 py-5">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span>Run Report</span>
                </Button>
                
                <Button variant="outline" className="justify-start gap-2 py-5">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  <span>Schedule Task</span>
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Notifications */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </h2>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-muted-foreground text-sm">
                  View All Notifications
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
