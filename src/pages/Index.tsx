
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Server, Lock, Database, Users, BarChart2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const features = [
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Role-Based Access Control',
      description: 'Secure, role-specific dashboards for every team member'
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: 'Campaign Management',
      description: 'Streamlined project handling from creation to completion'
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: 'Real-time Analytics',
      description: 'Performance tracking and insights that drive results'
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'Enhanced Security',
      description: 'Military-grade encryption for sensitive customer data'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">SARTHI</h1>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-0">
            BPO CRM
          </Badge>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="link" className="text-muted-foreground" onClick={() => navigate('/dashboard')}>
            Demo Dashboard
          </Button>
          <Button className="gap-1 group" onClick={() => navigate('/dashboard')}>
            Enter Platform
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Column - Login Form */}
        <div 
          className={cn(
            "w-full md:w-1/2 flex items-center justify-center p-8 transition-all duration-700 transform",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          )}
        >
          <LoginForm className="w-full max-w-md" />
        </div>
        
        {/* Right Column - Features */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-8 md:p-16 flex items-center">
          <div className={cn(
            "space-y-8 transition-all duration-700 delay-300 transform",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          )}>
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                BPO Workflow Management Reimagined
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A comprehensive CRM solution designed specifically for BPO operations, 
                with powerful tools for campaign management, agent productivity, and client reporting.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "p-5 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-md",
                    "transform transition-all",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-lg">{feature.title}</h3>
                  <p className="mt-1 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-6 flex items-center justify-center sm:justify-start">
              <Button 
                className="gap-1 group hidden md:flex" 
                onClick={() => navigate('/dashboard')}
              >
                Experience Demo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t border-gray-100 dark:border-gray-800">
        <p>© 2023 Sarthi BPO Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Helper function for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Index;
