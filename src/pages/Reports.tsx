
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Printer, Mail, BarChart2, FileText, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReportCharts from '@/components/ReportCharts';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded successfully.",
    });
  };
  
  const handleSendReport = () => {
    toast({
      title: "Report Sent",
      description: "Your report has been sent to the specified email addresses.",
    });
  };
  
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
              <p className="text-muted-foreground mt-1">Generate and view detailed reports</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleDownloadReport} className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button size="sm" onClick={handleSendReport} className="gap-1">
                <Mail className="h-4 w-4" />
                Send Report
              </Button>
            </div>
          </div>
          
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Report Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select defaultValue="performance">
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance Report</SelectItem>
                    <SelectItem value="productivity">Productivity Report</SelectItem>
                    <SelectItem value="quality">Quality Control Report</SelectItem>
                    <SelectItem value="attendance">Attendance Report</SelectItem>
                    <SelectItem value="client">Client Report</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Date Range</CardTitle>
              </CardHeader>
              <CardContent>
                <Select defaultValue="this-month">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Project Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="fintech">FinTech Solutions</SelectItem>
                    <SelectItem value="telehealth">TeleHealth Support</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Support</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full md:w-fit">
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span className="hidden md:inline">Performance</span>
              </TabsTrigger>
              <TabsTrigger value="quality" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">Quality</span>
              </TabsTrigger>
              <TabsTrigger value="employees" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Employees</span>
              </TabsTrigger>
              <TabsTrigger value="attendance" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Attendance</span>
              </TabsTrigger>
            </TabsList>
            
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="mt-4 text-muted-foreground">Loading report data...</p>
                </div>
              </div>
            ) : (
              <>
                <TabsContent value="performance" className="space-y-6">
                  <ReportCharts type="performance" />
                </TabsContent>
                
                <TabsContent value="quality" className="space-y-6">
                  <ReportCharts type="quality" />
                </TabsContent>
                
                <TabsContent value="employees" className="space-y-6">
                  <ReportCharts type="employees" />
                </TabsContent>
                
                <TabsContent value="attendance" className="space-y-6">
                  <ReportCharts type="attendance" />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Reports;
