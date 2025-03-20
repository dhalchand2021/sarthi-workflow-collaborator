
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EmployeeList from '@/components/EmployeeList';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, SortAsc } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { EmployeeForm } from '@/components/EmployeeForm';
import { useToast } from '@/hooks/use-toast';

const Employees = () => {
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
  
  const handleCreateEmployee = () => {
    setIsCreateDialogOpen(false);
    toast({
      title: "Employee added",
      description: "New employee has been successfully added to the system.",
    });
  };
  
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold">Employee Management</h1>
              <p className="text-muted-foreground mt-1">Manage all employees and their profiles</p>
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
                Add Employee
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="h-[600px] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="mt-4 text-muted-foreground">Loading employees...</p>
              </div>
            </div>
          ) : (
            <EmployeeList />
          )}
        </div>
      </main>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Fill in the employee details to add them to the system
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm onSubmit={handleCreateEmployee} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
