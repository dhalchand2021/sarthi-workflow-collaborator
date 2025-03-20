
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, SortAsc } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { TaskForm } from '@/components/TaskForm';
import { useToast } from '@/hooks/use-toast';

const Tasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCreateTask = () => {
    setIsCreateDialogOpen(false);
    toast({
      title: "Task created",
      description: "New task has been successfully created.",
    });
  };
  
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold">Tasks Management</h1>
              <p className="text-muted-foreground mt-1">Manage and track all your tasks</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
              <Button size="sm" className="gap-1" onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="h-4 w-4" />
                Create Task
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="h-[600px] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="mt-4 text-muted-foreground">Loading tasks...</p>
              </div>
            </div>
          ) : (
            <TaskList />
          )}
        </div>
      </main>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new task
            </DialogDescription>
          </DialogHeader>
          <TaskForm onSubmit={handleCreateTask} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
