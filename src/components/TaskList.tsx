
import React, { useState } from 'react';
import TaskCard, { TaskPriority, TaskStatus } from './TaskCard';
import { Input } from '@/components/ui/input';
import { 
  Search,
  AlertCircle
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Sample data
const mockTasks = [
  {
    id: '1',
    title: 'Data Entry Verification',
    description: 'Verify customer data entries from recent campaign',
    dueDate: '2023-08-12',
    priority: 'high' as TaskPriority,
    status: 'pending' as TaskStatus,
    project: 'FinTech Solutions',
    assignee: 'John D.',
    attachments: 2
  },
  {
    id: '2',
    title: 'Call Script Review',
    description: 'Review and approve updated call scripts for outbound campaign',
    dueDate: '2023-08-15',
    priority: 'medium' as TaskPriority,
    status: 'processing' as TaskStatus,
    project: 'TeleHealth Support',
    assignee: 'Sarah M.',
    attachments: 1
  },
  {
    id: '3',
    title: 'Customer Feedback Analysis',
    description: 'Analyze recent customer feedback and prepare summary report',
    dueDate: '2023-08-10',
    priority: 'low' as TaskPriority,
    status: 'completed' as TaskStatus,
    project: 'E-commerce Support',
    assignee: 'Alex K.'
  },
  {
    id: '4',
    title: 'Quality Check on Outbound Calls',
    description: 'Perform quality check on recorded outbound calls from yesterday',
    dueDate: '2023-08-05',
    priority: 'high' as TaskPriority,
    status: 'escalated' as TaskStatus,
    project: 'TeleHealth Support',
    assignee: 'Mike P.',
    attachments: 5
  },
  {
    id: '5',
    title: 'Update Knowledge Base Articles',
    description: 'Update knowledge base articles with new product information',
    dueDate: '2023-08-18',
    priority: 'medium' as TaskPriority,
    status: 'pending' as TaskStatus,
    project: 'E-commerce Support',
    assignee: 'Jennifer R.'
  },
  {
    id: '6',
    title: 'Customer Onboarding Flow Review',
    description: 'Review and optimize customer onboarding process flow',
    dueDate: '2023-08-20',
    priority: 'medium' as TaskPriority,
    status: 'processing' as TaskStatus,
    project: 'FinTech Solutions',
    assignee: 'David L.',
    attachments: 3
  }
];

const TaskList = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const { toast } = useToast();
  
  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    
    toast({
      title: "Task Status Updated",
      description: `Task status has been changed to ${newStatus}`,
    });
  };
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskCard 
              key={task.id}
              {...task}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            No tasks match your current search or filter criteria.
          </p>
        </Card>
      )}
    </div>
  );
};

export default TaskList;
