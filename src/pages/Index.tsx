
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Shield, 
  Users, 
  BarChart2, 
  Clock, 
  Sparkles,
  Clipboard,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Auto-rotate features
    const featuresInterval = setInterval(() => {
      setCurrentFeatureIndex(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(featuresInterval);
    };
  }, []);
  
  const features = [
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Role-Based Access Control',
      description: 'Secure, role-specific dashboards for every team member'
    },
    {
      icon: <Clipboard className="h-5 w-5" />,
      title: 'Campaign Management',
      description: 'Streamlined project handling from creation to completion'
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: 'Real-time Analytics',
      description: 'Performance tracking and insights that drive results'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Enhanced Security',
      description: 'Military-grade encryption for sensitive customer data'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Time Tracking',
      description: 'Monitor productivity and optimize agent workloads'
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'AI-Powered Insights',
      description: 'Leverage machine learning for predictive analytics'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-100 dark:border-gray-800 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Shield className="h-6 w-6 text-primary" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">SARTHI</h1>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-0">
            BPO CRM
          </Badge>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="link" className="text-muted-foreground" onClick={() => navigate('/dashboard')}>
            Demo Dashboard
          </Button>
          <Button className="gap-1 group relative overflow-hidden" onClick={() => navigate('/dashboard')}>
            <span className="relative z-10">Enter Platform</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Column - Login Form */}
        <motion.div 
          className="w-full md:w-1/2 flex items-center justify-center p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-muted-foreground">Sign in to access your workspace</p>
            </motion.div>
            
            <LoginForm className="w-full bg-card shadow-lg rounded-xl p-6 border border-border/50" />
            
            <motion.div 
              className="mt-6 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>New to Sarthi? <Button variant="link" className="p-0 h-auto font-semibold">Request access</Button></p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Right Column - Features */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-8 md:p-16 flex items-center backdrop-blur-sm">
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                BPO Workflow Management Reimagined
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A comprehensive CRM solution designed specifically for BPO operations, 
                with powerful tools for campaign management, agent productivity, and client reporting.
              </p>
            </motion.div>
            
            {/* Featured highlight */}
            <motion.div 
              variants={itemVariants}
              className="bg-background/80 backdrop-blur-md border border-primary/20 rounded-xl p-6 shadow-md transform transition-all duration-500 hover:shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {features[currentFeatureIndex].icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{features[currentFeatureIndex].title}</h3>
                  <p className="mt-1 text-muted-foreground">{features[currentFeatureIndex].description}</p>
                </div>
              </div>
              
              {/* Progress indicators */}
              <div className="flex gap-1 mt-4 justify-center">
                {features.map((_, index) => (
                  <span 
                    key={index} 
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      index === currentFeatureIndex ? 'w-6 bg-primary' : 'w-3 bg-primary/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                index !== currentFeatureIndex && (
                  <motion.div 
                    key={index} 
                    className="p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:border-primary/20 group"
                    whileHover={{ y: -3 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-medium text-base group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                )
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-4">
              <Button 
                className="w-full sm:w-auto gap-1 group relative overflow-hidden" 
                onClick={() => navigate('/dashboard')}
                size="lg"
              >
                <span className="relative z-10">Experience Interactive Demo</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t border-gray-100 dark:border-gray-800 backdrop-blur-md bg-background/50">
        <p>© 2023 Sarthi BPO Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
