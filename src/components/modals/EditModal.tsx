import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface EditModalProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: T) => void;
  data: T;
  title: string;
  fields: {
    key: keyof T;
    label: string;
    type?: 'text' | 'number' | 'email';
    disabled?: boolean;
  }[];
}

export function EditModal<T extends Record<string, any>>({
  open,
  onOpenChange,
  onSave,
  data,
  title,
  fields,
}: EditModalProps<T>) {
  const [formData, setFormData] = useState<T>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {fields.map((field) => (
            <div key={String(field.key)} className="space-y-2">
              <Label>{field.label}</Label>
              <Input
                type={field.type || 'text'}
                value={formData[field.key] as string}
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
                disabled={field.disabled}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
