
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

type ReportType = 'performance' | 'quality' | 'employees' | 'attendance';

interface ReportChartsProps {
  type: ReportType;
}

// Sample data for different report types
const performanceData = [
  { name: 'Jan', calls: 4000, emails: 2400, chats: 2000 },
  { name: 'Feb', calls: 3000, emails: 1398, chats: 2210 },
  { name: 'Mar', calls: 2000, emails: 9800, chats: 2290 },
  { name: 'Apr', calls: 2780, emails: 3908, chats: 2500 },
  { name: 'May', calls: 1890, emails: 4800, chats: 2181 },
  { name: 'Jun', calls: 2390, emails: 3800, chats: 2500 },
  { name: 'Jul', calls: 3490, emails: 4300, chats: 2800 },
];

const qualityData = [
  { name: 'Week 1', score: 85, target: 80 },
  { name: 'Week 2', score: 88, target: 80 },
  { name: 'Week 3', score: 91, target: 80 },
  { name: 'Week 4', score: 84, target: 80 },
  { name: 'Week 5', score: 92, target: 80 },
  { name: 'Week 6', score: 87, target: 80 },
  { name: 'Week 7', score: 90, target: 80 },
];

const employeePerformanceData = [
  { name: 'Alice', performance: 85, quality: 88 },
  { name: 'Bob', performance: 78, quality: 82 },
  { name: 'Carol', performance: 92, quality: 90 },
  { name: 'Dave', performance: 88, quality: 85 },
  { name: 'Eve', performance: 95, quality: 96 },
  { name: 'Frank', performance: 76, quality: 79 },
  { name: 'Grace', performance: 82, quality: 88 },
];

const taskDistributionData = [
  { name: 'Pending', value: 35 },
  { name: 'Processing', value: 45 },
  { name: 'Completed', value: 120 },
  { name: 'Escalated', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const attendanceData = [
  { name: 'Mon', present: 42, absent: 3, leave: 5 },
  { name: 'Tue', present: 45, absent: 2, leave: 3 },
  { name: 'Wed', present: 44, absent: 4, leave: 2 },
  { name: 'Thu', present: 40, absent: 5, leave: 5 },
  { name: 'Fri', present: 38, absent: 7, leave: 5 },
  { name: 'Sat', present: 35, absent: 10, leave: 5 },
  { name: 'Sun', present: 30, absent: 15, leave: 5 },
];

const ReportCharts = ({ type }: ReportChartsProps) => {
  switch (type) {
    case 'performance':
      return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Communication Channels Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calls" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="emails" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="chats" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Task Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Employee Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" fill="#8884d8" name="Performance Score" />
                  <Bar dataKey="quality" fill="#82ca9d" name="Quality Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
      
    case 'quality':
      return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Weekly Quality Scores</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="target" stroke="#ff7300" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Quality by Department</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Support', score: 87 },
                  { name: 'Sales', score: 82 },
                  { name: 'Technical', score: 91 },
                  { name: 'Back Office', score: 88 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Quality Issues by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Communication', value: 35 },
                      { name: 'Accuracy', value: 25 },
                      { name: 'Procedure', value: 20 },
                      { name: 'Resolution', value: 15 },
                      { name: 'Other', value: 5 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
      
    case 'employees':
      return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Employee Performance Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" fill="#8884d8" name="Performance Score" />
                  <Bar dataKey="quality" fill="#82ca9d" name="Quality Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Employee Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Active', value: 48 },
                      { name: 'On Leave', value: 8 },
                      { name: 'Inactive', value: 4 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#00C49F" />
                    <Cell fill="#FFBB28" />
                    <Cell fill="#FF8042" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Employee Role Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Agents', value: 35 },
                      { name: 'Team Leaders', value: 8 },
                      { name: 'Managers', value: 4 },
                      { name: 'Admin', value: 2 },
                      { name: 'Other', value: 1 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
      
    case 'attendance':
      return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Weekly Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#8884d8" name="Present" />
                  <Bar dataKey="absent" stackId="a" fill="#FF8042" name="Absent" />
                  <Bar dataKey="leave" stackId="a" fill="#FFBB28" name="On Leave" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Attendance Rate by Department</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Support', rate: 92 },
                  { name: 'Sales', rate: 88 },
                  { name: 'Technical', rate: 95 },
                  { name: 'Back Office', rate: 90 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#8884d8" name="Attendance Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Monthly Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Jan', rate: 91 },
                  { name: 'Feb', rate: 93 },
                  { name: 'Mar', rate: 90 },
                  { name: 'Apr', rate: 88 },
                  { name: 'May', rate: 92 },
                  { name: 'Jun', rate: 94 },
                  { name: 'Jul', rate: 91 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#8884d8" strokeWidth={2} name="Attendance Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
      
    default:
      return <div>No data available</div>;
  }
};

export default ReportCharts;
