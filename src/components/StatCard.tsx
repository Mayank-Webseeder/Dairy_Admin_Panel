import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-2xl">{value}</h3>
        </div>
        <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
          <Icon className="h-5 w-5 text-red-500" />
        </div>
      </div>
      {trend && (
        <p className="text-sm text-green-600 mt-3">{trend}</p>
      )}
    </Card>
  );
}
