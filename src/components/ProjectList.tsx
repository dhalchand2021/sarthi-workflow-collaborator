
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle, Plus, Filter } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectForm } from './ProjectForm';

// Sample data
const mockProjects = [
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
  },
  {
    id: '3',
    title: 'E-commerce Support',
    description: 'Customer service and order management for online store',
    status: 'active' as const,
    progress: 78,
    deadline: '2023-09-20',
    client: 'ShopDirect LLC',
    team: [
      { id: '9', name: 'Irene Adams' },
      { id: '10', name: 'Jack Roberts' }
    ],
    tasksCount: 32
  },
  {
    id: '4',
    title: 'Insurance Claims Processing',
    description: 'Processing and validating insurance claims documents',
    status: 'hold' as const,
    progress: 25,
    deadline: '2023-11-30',
    client: 'SecureLife Insurance',
    team: [
      { id: '11', name: 'Karen White' },
      { id: '12', name: 'Leo Martin' },
      { id: '13', name: 'Mary Johnson' }
    ],
    tasksCount: 56
  },
  {
    id: '5',
    title: 'Government Helpline',
    description: 'Public service helpline for government department',
    status: 'completed' as const,
    progress: 100,
    deadline: '2023-07-31',
    client: 'Department of Public Services',
    team: [
      { id: '14', name: 'Nancy Garcia' },
      { id: '15', name: 'Oscar Rodriguez' },
      { id: '16', name: 'Paula Lewis' }
    ],
    tasksCount: 42
  },
  {
    id: '6',
    title: 'Travel Agency Support',
    description: 'Booking and customer support for travel agency',
    status: 'active' as const,
    progress: 55,
    deadline: '2023-10-10',
    client: 'Journey Travels',
    team: [
      { id: '17', name: 'Quincy Thompson' },
      { id: '18', name: 'Rachel Green' }
    ],
    tasksCount: 29
  }
];

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();
  
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = () => {
    setShowCreateDialog(false);
    toast({
      title: "Project created",
      description: "Your new project has been successfully created.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50 backdrop-blur-sm border-muted"
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-background/50 backdrop-blur-sm border-muted">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={() => setShowCreateDialog(true)} 
            className="gap-1 bg-primary/90 hover:bg-primary shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id}
              {...project}
            />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm bg-background/50 border-muted">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            No projects match your current search or filter criteria.
          </p>
        </Card>
      )}

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <ProjectForm onSubmit={handleCreateProject} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectList;
