import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { X } from 'lucide-react';

export function CreateNotificationModal({ open, onOpenChange }) {
  const [activeTab, setActiveTab] = useState('create');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('promotional');
  const [targetAudience, setTargetAudience] = useState('all');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendNow = () => {
    console.log('Sending notification now...', { title, message, type, targetAudience });
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTitle('');
    setMessage('');
    setType('promotional');
    setTargetAudience('all');
    setImage(null);
    setActiveTab('create');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">Create New Notification</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border-b">
            <TabsTrigger 
              value="create" 
              className="text-xs data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Create
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className="text-xs data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Create Tab */}
          <TabsContent value="create" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter notification title"
                className="text-xs h-9"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Enter notification message"
                className="text-xs min-h-[100px] resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-xs">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="text-xs h-9">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotional" className="text-xs">Promotional</SelectItem>
                  <SelectItem value="system" className="text-xs">System</SelectItem>
                  <SelectItem value="order" className="text-xs">Order</SelectItem>
                  <SelectItem value="alert" className="text-xs">Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Image (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-blue-500 text-sm mb-1">豆 Upload Image</div>
                  {image && (
                    <div className="mt-2">
                      <img src={image} alt="Preview" className="max-h-32 mx-auto rounded" />
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Target Audience</Label>
              <RadioGroup value={targetAudience} onValueChange={setTargetAudience}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-users" />
                  <Label htmlFor="all-users" className="text-xs font-normal cursor-pointer">
                    倹 All Users
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="branches" id="specific-branches" />
                  <Label htmlFor="specific-branches" className="text-xs font-normal cursor-pointer">
                    召 Specific Branches
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="role" id="by-role" />
                  <Label htmlFor="by-role" className="text-xs font-normal cursor-pointer">
                    側 By Role
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="pt-4">
            <div className="flex items-center justify-center py-8">
              <div className="relative">
                {/* Mobile Phone Frame */}
                <div className="w-[280px] h-[540px] border-8 border-black rounded-[40px] bg-white shadow-2xl overflow-hidden">
                  {/* Phone Top Bar */}
                  <div className="bg-white px-4 py-2 flex items-center justify-between border-b">
                    <span className="text-xs font-medium">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                      <span className="text-xs">100%</span>
                    </div>
                  </div>

                  {/* Notification Preview */}
                  <div className="p-3 bg-white m-3 rounded-lg shadow-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">粕</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">Your App</span>
                          <span className="text-xs text-gray-500">now</span>
                        </div>
                        <h4 className="text-xs font-medium mb-1">
                          {title || 'Notification Title'}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {message || 'Notification message will appear here...'}
                        </p>
                        {image && (
                          <img src={image} alt="Preview" className="mt-2 rounded w-full" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-500 mt-4">
                    Preview on mobile device
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 h-9 text-xs"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendNow}
            className="flex-1 bg-blue-500 hover:bg-blue-600 h-9 text-xs"
            disabled={!title || !message}
          >
            Send Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}