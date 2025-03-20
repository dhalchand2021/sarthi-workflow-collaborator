
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EmployeeList from '@/components/EmployeeList';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, SortAsc, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

const Employees = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Employee Management</h1>
              <p className="text-muted-foreground mt-1">Manage all employees and their profiles</p>
            </div>
          </div>
          
          {isLoading ? (
            <Card className="h-[600px] flex items-center justify-center bg-background/50 backdrop-blur-sm border-muted">
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">Loading employees...</p>
              </div>
            </Card>
          ) : (
            <EmployeeList />
          )}
        </div>
      </main>
    </div>
  );
};

export default Employees;
