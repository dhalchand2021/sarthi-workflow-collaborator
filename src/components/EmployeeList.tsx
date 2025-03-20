import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle, MoreHorizontal, Mail, Phone, Calendar, Plus, User, FileSpreadsheet } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";

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

interface EmployeeListProps {
  viewMode?: 'cards' | 'table';
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

const EmployeeList: React.FC<EmployeeListProps> = ({ viewMode = 'cards' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
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
  
  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };
  
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  const employeeActions = (employee: Employee) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleViewEmployee(employee)}>
          <User className="mr-2 h-4 w-4" />
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setSelectedEmployee(employee);
          setIsEditDialogOpen(true);
        }}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Edit Details
        </DropdownMenuItem>
        <DropdownMenuItem>Assign to Project</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          {employee.status === 'active' ? 'Deactivate Employee' : 'Activate Employee'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  
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
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'cards' ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredEmployees.map(employee => (
                  <motion.div key={employee.id} variants={cardVariants}>
                    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 bg-background/80 backdrop-blur-sm border-muted/80 group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-primary/20 group-hover:border-primary/50 transition-colors">
                              <AvatarImage src={employee.avatar} alt={employee.name} />
                              <AvatarFallback className="bg-primary/10 text-primary">{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium group-hover:text-primary transition-colors">{employee.name}</h3>
                              <p className="text-sm text-muted-foreground">{employee.department}</p>
                            </div>
                          </div>
                          
                          {employeeActions(employee)}
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
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="rounded-md border bg-background/80 backdrop-blur-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Employee</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map(employee => (
                      <TableRow key={employee.id} className="hover:bg-primary/5">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={employee.avatar} alt={employee.name} />
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(employee.role)}</TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell>{getTypeBadge(employee.type)}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{employeeActions(employee)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <Card className="flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm bg-background/50 border-muted">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No employees found</h3>
          <p className="text-muted-foreground">
            No employees match your current search or filter criteria.
          </p>
        </Card>
      )}
      
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
      
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Employee Profile</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">{selectedEmployee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{selectedEmployee.name}</h2>
                  <p className="text-muted-foreground">{selectedEmployee.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Department</h3>
                    <p>{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Role</h3>
                    <div>{getRoleBadge(selectedEmployee.role)}</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                    <div>{getStatusBadge(selectedEmployee.status)}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                    <p>{selectedEmployee.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Type</h3>
                    <div>{getTypeBadge(selectedEmployee.type)}</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Joined Date</h3>
                    <p>{new Date(selectedEmployee.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  setIsEditDialogOpen(true);
                }}>Edit Profile</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
