
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  Shield, 
  Edit, 
  FileCheck,
  AlignLeft
} from 'lucide-react';

export type UserRole = 'Super Admin' | 'Manager' | 'Team Leader' | 'Voice Agent' | 'Non-Voice Agent' | 'Client';

interface UserProfileProps {
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  location?: string;
  joinDate?: string;
  avatar?: string;
  kycStatus?: 'verified' | 'pending' | 'not-verified';
  isActive?: boolean;
  className?: string;
}

const UserProfile = ({
  name,
  role,
  email,
  phone,
  location,
  joinDate,
  avatar,
  kycStatus = 'not-verified',
  isActive = true,
  className,
}: UserProfileProps) => {
  const roleColors = {
    'Super Admin': 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
    'Manager': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    'Team Leader': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'Voice Agent': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    'Non-Voice Agent': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    'Client': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  };
  
  const kycStatusConfig = {
    'verified': { 
      label: 'KYC Verified', 
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      icon: FileCheck
    },
    'pending': { 
      label: 'KYC Pending', 
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      icon: AlignLeft
    },
    'not-verified': { 
      label: 'KYC Required', 
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
      icon: FileCheck
    },
  };
  
  const KycIcon = kycStatusConfig[kycStatus].icon;
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300",
      className
    )}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-background">
              {avatar ? (
                <AvatarImage src={avatar} alt={name} />
              ) : (
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{name}</h3>
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  isActive ? "bg-emerald-500" : "bg-gray-300"
                )} />
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={cn(roleColors[role])}>
                  {role}
                </Badge>
                
                <Badge variant="outline" className={kycStatusConfig[kycStatus].color}>
                  <KycIcon className="h-3 w-3 mr-1" />
                  {kycStatusConfig[kycStatus].label}
                </Badge>
              </div>
            </div>
          </div>
          
          <Button size="sm" variant="outline" className="gap-1 h-8">
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
            <span className="text-sm">{email}</span>
          </div>
          
          {phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-sm">{phone}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-sm">{location}</span>
            </div>
          )}
          
          {joinDate && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-sm">Joined {new Date(joinDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
