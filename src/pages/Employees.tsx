
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EmployeeList from '@/components/EmployeeList';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Filter, 
  Download, 
  Upload, 
  ListFilter, 
  Loader2, 
  UserPlus 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

const Employees = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setEmployeeCount(8); // Mock count from data
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Employee data is being prepared for export",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export completed",
        description: "Employee data has been exported successfully",
      });
    }, 1500);
  };
  
  const handleImportData = () => {
    toast({
      title: "Import feature",
      description: "Please select a CSV file to import employee data",
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 md:px-8">
        <motion.div 
          className="max-w-screen-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4"
            variants={itemVariants}
          >
            <div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Employee Management</h1>
              <p className="text-muted-foreground mt-1">Manage all employees and their profiles</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {employeeCount} Employees
              </Badge>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
              >
                <ListFilter className="h-4 w-4" />
                {viewMode === 'cards' ? 'Table View' : 'Card View'}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Employee Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleExportData} className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleImportData} className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import Data
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Bulk Add Employees
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button className="gap-1 relative overflow-hidden group">
                <PlusCircle className="h-4 w-4" />
                <span className="relative z-10">Add Employee</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            {isLoading ? (
              <Card className="h-[600px] flex items-center justify-center bg-background/50 backdrop-blur-sm border-muted">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  <p className="mt-4 text-muted-foreground">Loading employees...</p>
                </div>
              </Card>
            ) : (
              <EmployeeList viewMode={viewMode} />
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Employees;
