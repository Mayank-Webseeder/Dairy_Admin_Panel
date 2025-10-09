import { Bell, Search, ChevronDown, User, Settings, HelpCircle, Globe, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { notifications } from '../lib/mockData';
import { Notification } from '../types';
import { useState } from 'react';
import { cn } from './ui/utils';
import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Separator } from './ui/separator';
import { SearchPopup } from './SearchPopup';

const notificationIcons = {
  alert: AlertTriangle,
  success: CheckCircle,
  info: Info,
  warning: AlertCircle,
};

const notificationColors = {
  alert: 'text-red-500',
  success: 'text-green-500',
  info: 'text-blue-500',
  warning: 'text-yellow-600',
};

interface HeaderProps {
  onNavigate: (page: string) => void;
  onLogout: () => void; // Add this line
  profilePhoto?: string;
  userName?: string;
  userRole?: string;
}

export function UpdatedHeader({ 
  onNavigate, 
  onLogout,
  profilePhoto, 
  userName = 'John Doe', 
  userRole = 'Super Admin' 
}: HeaderProps) {
  const [notifs, setNotifs] = useState<Notification[]>(notifications);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadCount = notifs.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, isRead: true })));
  };

  const handleProfileClick = () => {
    setProfileOpen(false);
    onNavigate('profile');
  };

  const handleSettingsClick = () => {
    setProfileOpen(false);
    onNavigate('settings');
  };

  return (
    <header className="h-16 border-b border-border bg-white px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search orders, customers, menu items..."
            className="pl-10 bg-muted/50 border-0 cursor-pointer"
            readOnly
            onClick={() => setSearchOpen(true)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground hidden sm:block">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            05:03 PM
          </span>
          <span className="mx-2">•</span>
          Wed, Oct 8
        </span>

        {/* Notifications Button */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                {unreadCount}
              </Badge>
            )}
          </Button>

          {/* Notification Dropdown */}
          {notificationOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setNotificationOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3>Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="bg-red-500">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifs.map((notification) => {
                    const Icon = notificationIcons[notification.type];
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors",
                          !notification.isRead && "bg-red-50/50"
                        )}
                      >
                        <div className="flex gap-3">
                          <div className={cn("mt-0.5", notificationColors[notification.type])}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium">{notification.title}</p>
                              {!notification.isRead && (
                                <span className="h-2 w-2 rounded-full bg-red-500 mt-1.5"></span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-3 border-t">
                  <Button
                    variant="ghost"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center gap-3 pl-3 border-l h-auto py-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <Avatar className="h-9 w-9">
              {profilePhoto && <AvatarImage src={profilePhoto} alt={userName} />}
              <AvatarFallback className="bg-red-500 text-white">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <p className="text-sm">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {/* Profile Header */}
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      {profilePhoto && <AvatarImage src={profilePhoto} alt={userName} />}
                      <AvatarFallback className="bg-red-500 text-white">
                        {userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{userName}</p>
                      <p className="text-sm text-muted-foreground truncate">{userRole}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left"
                  >
                    <User className="h-4 w-4 text-gray-600" />
                    <span>My Profile</span>
                  </button>
                  
                  <button
                    onClick={handleSettingsClick}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left"
                  >
                    <Settings className="h-4 w-4 text-gray-600" />
                    <span>Account Settings</span>
                  </button>
                  
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left"
                  >
                    <HelpCircle className="h-4 w-4 text-gray-600" />
                    <span>Help & Support</span>
                  </button>
                  
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left"
                  >
                    <Globe className="h-4 w-4 text-gray-600" />
                    <span>Language</span>
                  </button>
                </div>

                <Separator />

                {/* Sign Out */}
                <div className="p-2">
                  <button
                    onClick={onLogout} // Use the onLogout prop here
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 text-red-600 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Popup */}
      <SearchPopup 
        open={searchOpen} 
        onOpenChange={setSearchOpen}
        onNavigate={onNavigate}
      />
    </header>
  );
}