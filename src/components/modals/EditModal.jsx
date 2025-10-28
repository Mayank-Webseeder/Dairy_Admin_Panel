import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

export function EditModal({
  open,
  onOpenChange,
  onSave,
  data,
  title,
  fields,
}) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to the item below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {fields.map((field) => (
            <div key={String(field.key)} className="space-y-2">
              <Label>{field.label}</Label>
              {field.type === 'slider' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{field.min || 0}</span>
                    <span className="font-medium">{formData[field.key]}</span>
                    <span className="text-xs text-muted-foreground">{field.max || 100}</span>
                  </div>
                  <Slider
                    value={[formData[field.key]]}
                    onValueChange={(value) =>
                      setFormData({ ...formData, [field.key]: value[0] })
                    }
                    min={field.min || 0}
                    max={field.max || 100}
                    step={field.step || 1}
                    disabled={field.disabled}
                  />
                </div>
              ) : (
                <Input
                  type={field.type || 'text'}
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  disabled={field.disabled}
                />
              )}
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