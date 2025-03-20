
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle, MoreHorizontal, Mail, Phone, Calendar, Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { EmployeeForm } from './EmployeeForm';
import { useToast } from '@/hooks/use-toast';

type EmployeeRole = 'agent' | 'team-leader' | 'manager' | 'admin';
type EmployeeStatus = 'active' | 'inactive' | 'on-leave';
type EmployeeType = 'voice' | 'non-voice' | 'both';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  department: string;
  status: EmployeeStatus;
  type: EmployeeType;
  joinDate: string;
  avatar?: string;
}

// Sample data
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@sarthi.com',
    phone: '+91 98765 43210',
    role: 'agent',
    department: 'Customer Support',
    status: 'active',
    type: 'voice',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@sarthi.com',
    phone: '+91 98765 43211',
    role: 'agent',
    department: 'Data Processing',
    status: 'inactive',
    type: 'non-voice',
    joinDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@sarthi.com',
    phone: '+91 98765 43212',
    role: 'team-leader',
    department: 'Customer Support',
    status: 'active',
    type: 'both',
    joinDate: '2022-11-05'
  },
  {
    id: '4',
    name: 'Dave Wilson',
    email: 'dave.wilson@sarthi.com',
    phone: '+91 98765 43213',
    role: 'agent',
    department: 'Technical Support',
    status: 'on-leave',
    type: 'voice',
    joinDate: '2023-03-10'
  },
  {
    id: '5',
    name: 'Eve Brown',
    email: 'eve.brown@sarthi.com',
    phone: '+91 98765 43214',
    role: 'manager',
    department: 'Operations',
    status: 'active',
    type: 'both',
    joinDate: '2022-08-15'
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.miller@sarthi.com',
    phone: '+91 98765 43215',
    role: 'agent',
    department: 'Customer Support',
    status: 'active',
    type: 'non-voice',
    joinDate: '2023-04-22'
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace.lee@sarthi.com',
    phone: '+91 98765 43216',
    role: 'team-leader',
    department: 'Technical Support',
    status: 'active',
    type: 'voice',
    joinDate: '2022-12-01'
  },
  {
    id: '8',
    name: 'Henry Clark',
    email: 'henry.clark@sarthi.com',
    phone: '+91 98765 43217',
    role: 'admin',
    department: 'Management',
    status: 'active',
    type: 'both',
    joinDate: '2022-06-10'
  }
];

const getRoleBadge = (role: EmployeeRole) => {
  switch (role) {
    case 'agent':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">Agent</Badge>;
    case 'team-leader':
      return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-0">Team Leader</Badge>;
    case 'manager':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-0">Manager</Badge>;
    case 'admin':
      return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-0">Admin</Badge>;
    default:
      return null;
  }
};

const getStatusBadge = (status: EmployeeStatus) => {
  switch (status) {
    case 'active':
      return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0">Active</Badge>;
    case 'inactive':
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 border-0">Inactive</Badge>;
    case 'on-leave':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0">On Leave</Badge>;
    default:
      return null;
  }
};

const getTypeBadge = (type: EmployeeType) => {
  switch (type) {
    case 'voice':
      return <Badge variant="outline" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border-0">Voice</Badge>;
    case 'non-voice':
      return <Badge variant="outline" className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-0">Non-Voice</Badge>;
    case 'both':
      return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-0">Voice & Non-Voice</Badge>;
    default:
      return null;
  }
};

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleEditEmployee = () => {
    setIsEditDialogOpen(false);
    
    toast({
      title: "Employee Updated",
      description: "Employee details have been updated successfully.",
    });
  };
  
  const handleCreateEmployee = () => {
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Employee Created",
      description: "New employee has been added successfully.",
    });
  };
  
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search employees..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50 backdrop-blur-sm border-muted"
          />
        </div>
        
        <div className="flex gap-3 flex-wrap">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[130px] bg-background/50 backdrop-blur-sm border-muted">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="team-leader">Team Leader</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-background/50 backdrop-blur-sm border-muted">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            className="gap-1 bg-primary/90 hover:bg-primary shadow-sm"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>
      
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredEmployees.map(employee => (
            <Card key={employee.id} className="overflow-hidden hover:shadow-md transition-all duration-300 bg-background/80 backdrop-blur-sm border-muted/80">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-primary/20">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.department}</p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                        setSelectedEmployee(employee);
                        setIsEditDialogOpen(true);
                      }}>
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        {employee.status === 'active' ? 'Deactivate Employee' : 'Activate Employee'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {getRoleBadge(employee.role)}
                  {getStatusBadge(employee.status)}
                  {getTypeBadge(employee.type)}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 mr-2 text-primary/70" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 mr-2 text-primary/70" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-2 text-primary/70" />
                    <span>Joined: {new Date(employee.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm bg-background/50 border-muted">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No employees found</h3>
          <p className="text-muted-foreground">
            No employees match your current search or filter criteria.
          </p>
        </Card>
      )}
      
      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update employee details
            </DialogDescription>
          </DialogHeader>
          {selectedEmployee && <EmployeeForm employee={selectedEmployee} onSubmit={handleEditEmployee} />}
        </DialogContent>
      </Dialog>
      
      {/* Create Employee Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new employee
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm onSubmit={handleCreateEmployee} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
