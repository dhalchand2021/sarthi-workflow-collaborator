
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, Bell, Search, ChevronDown, User, LogOut,
  Settings, HelpCircle, MessageSquare
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-apple",
        isScrolled 
          ? "py-2 bg-white/80 dark:bg-card/90 backdrop-blur-lg shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              SARTHI
            </span>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">
              BPO
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem href="/dashboard" isActive={isActive('/dashboard')}>Dashboard</NavItem>
          <NavItem href="/tasks" isActive={isActive('/tasks')}>Tasks</NavItem>
          <NavItem href="/projects" isActive={isActive('/projects')}>Projects</NavItem>
          <NavItem href="/employees" isActive={isActive('/employees')}>Employees</NavItem>
          <NavItem href="/reports" isActive={isActive('/reports')}>Reports</NavItem>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <UserDropdown />
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background animate-fade-in">
          <div className="container py-6 flex flex-col space-y-4">
            <MobileNavItem href="/dashboard" onClick={closeMobileMenu}>Dashboard</MobileNavItem>
            <MobileNavItem href="/tasks" onClick={closeMobileMenu}>Tasks</MobileNavItem>
            <MobileNavItem href="/projects" onClick={closeMobileMenu}>Projects</MobileNavItem>
            <MobileNavItem href="/employees" onClick={closeMobileMenu}>Employees</MobileNavItem>
            <MobileNavItem href="/reports" onClick={closeMobileMenu}>Reports</MobileNavItem>
            
            <div className="pt-4 border-t">
              <MobileNavItem href="/profile" onClick={closeMobileMenu}>Profile</MobileNavItem>
              <MobileNavItem href="/settings" onClick={closeMobileMenu}>Settings</MobileNavItem>
              <MobileNavItem href="/" onClick={closeMobileMenu}>Logout</MobileNavItem>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavItem = ({ 
  href, 
  isActive, 
  children 
}: { 
  href: string; 
  isActive: boolean; 
  children: React.ReactNode;
}) => {
  return (
    <Link 
      to={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
        isActive 
          ? "text-primary bg-primary/5" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavItem = ({ 
  href, 
  onClick,
  children 
}: { 
  href: string; 
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link 
      to={href} 
      onClick={onClick}
      className="px-4 py-3 text-foreground hover:bg-muted rounded-lg flex items-center"
    >
      <span className="text-base font-medium">{children}</span>
    </Link>
  );
};

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="pl-3 pr-2 rounded-full flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-sm">Admin</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 animate-zoom-in">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="h-4 w-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <MessageSquare className="h-4 w-4 mr-2" />
          Messages
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help Center
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
