import { deliveryBoys } from '../lib/mockData';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';
import { cn } from './ui/utils';

const statusColors = {
  active: 'bg-green-500',
  inactive: 'bg-gray-400',
};

const statusTextColors = {
  active: 'text-green-600',
  inactive: 'text-gray-600',
};

export function DeliveryBoysCard() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3>Delivery Boys</h3>
          <p className="text-sm text-muted-foreground">Today's delivery team performance</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {deliveryBoys.map((boy) => {
          const initials = boy.name.split(' ').map(n => n[0]).join('');
          
          return (
            <div key={boy.id} className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gray-600 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span 
                  className={cn(
                    "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white",
                    statusColors[boy.status]
                  )}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{boy.name}</p>
                <p className="text-sm text-muted-foreground">{boy.area}</p>
              </div>
              
              <div className="text-right">
                <p className="font-medium">{boy.orders}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{boy.rating}</span>
              </div>
              
              <Badge 
                variant="secondary"
                className={cn(
                  "capitalize",
                  boy.status === 'active' && "bg-green-50 text-green-600",
                  boy.status === 'busy' && "bg-yellow-50 text-yellow-600",
                  boy.status === 'offline' && "bg-gray-100 text-gray-600"
                )}
              >
                {boy.status}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}