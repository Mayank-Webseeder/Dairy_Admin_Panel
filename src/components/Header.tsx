import { Bell, Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { notifications } from '../lib/mockData';
import { Notification } from '../types';
import { useState } from 'react';
import { cn } from './ui/utils';
import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

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

export function Header() {
  const [notifs, setNotifs] = useState<Notification[]>(notifications);
  const unreadCount = notifs.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, isRead: true })));
  };

  return (
    <header className="h-16 border-b border-border bg-white px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, customers, menu items..."
            className="pl-10 bg-muted/50 border-0"
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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
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
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-3 pl-3 border-l">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-red-500 text-white">JD</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
