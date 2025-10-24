import { Bike } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { deliveryBoys } from '../lib/mockData';

export function DeliveryBoysCard() {
  return (
    <Card className="p-6">
      <h3 className="mb-4">Top Delivery Boys</h3>
      <div className="space-y-4">
        {deliveryBoys.slice(0, 5).map((boy, index) => {
          const initials = boy.name.split(' ').map(n => n[0]).join('');
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-red-500 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">{boy.name}</p>
                  <p className="text-xs text-muted-foreground">{boy.area}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bike className="h-4 w-4 text-green-500" />
                <span className="text-sm">{boy.orders} deliveries</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}