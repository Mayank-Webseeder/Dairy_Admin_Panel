import { ArrowUp } from 'lucide-react';
import { Card } from './ui/card';

export function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="p-6 flex items-center justify-between transition-all duration-200 hover:shadow-md">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className="bg-red-100 p-3 rounded-full">
        <Icon className="h-6 w-6 text-red-500" />
      </div>
    </Card>
  );
}


