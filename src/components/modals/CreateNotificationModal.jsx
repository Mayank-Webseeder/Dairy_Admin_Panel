import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
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
import { Checkbox } from '../ui/checkbox';
import { Upload, Bell, Battery, Wifi, Signal } from 'lucide-react';
import { branches } from '../../lib/mockData';

export function CreateNotificationModal({ open, onOpenChange, onSave }) {
  const [activeTab, setActiveTab] = useState('create');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('promotional');
  const [targetAudience, setTargetAudience] = useState('all');
  const [image, setImage] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState('send-now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [recurring, setRecurring] = useState('none');

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

  const handleRoleToggle = (role) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleBranchToggle = (branchId) => {
    setSelectedBranches(prev =>
      prev.includes(branchId)
        ? prev.filter(b => b !== branchId)
        : [...prev, branchId]
    );
  };

  const handleSendNow = () => {
    const notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      targetAudience,
      selectedRoles,
      selectedBranches,
      image,
      status: 'sent',
      sentDate: new Date().toISOString(),
      recipients: calculateRecipients()
    };
    
    if (onSave) {
      onSave(notification);
    }
    
    handleCancel();
  };

  const handleSchedule = () => {
    const notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      targetAudience,
      selectedRoles,
      selectedBranches,
      image,
      status: 'scheduled',
      scheduledDate: `${scheduledDate} ${scheduledTime}`,
      recurring,
      recipients: calculateRecipients()
    };
    
    if (onSave) {
      onSave(notification);
    }
    
    handleCancel();
  };

  const handleSaveDraft = () => {
    const notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      targetAudience,
      selectedRoles,
      selectedBranches,
      image,
      status: 'draft',
      savedDate: new Date().toISOString(),
      recipients: calculateRecipients()
    };
    
    if (onSave) {
      onSave(notification);
    }
    
    handleCancel();
  };

  const calculateRecipients = () => {
    // This would calculate based on actual user data in production
    if (targetAudience === 'all') return 1250;
    if (targetAudience === 'branches') return selectedBranches.length * 50;
    if (targetAudience === 'role') return selectedRoles.length * 100;
    if (targetAudience === 'specific-customers') return 0;
    return 0;
  };

  const handleCancel = () => {
    setTitle('');
    setMessage('');
    setType('promotional');
    setTargetAudience('all');
    setImage(null);
    setSelectedRoles([]);
    setSelectedBranches([]);
    setDeliveryMode('send-now');
    setScheduledDate('');
    setScheduledTime('');
    setRecurring('none');
    setActiveTab('create');
    onOpenChange(false);
  };

  const isFormValid = () => {
    if (!title || !message) return false;
    if (deliveryMode === 'schedule' && (!scheduledDate || !scheduledTime)) return false;
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xs">Create New Notification</DialogTitle>
          <DialogDescription className="sr-only">
            Create and send push notifications to users
          </DialogDescription>
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
                  <div className="text-blue-500 text-xs mb-1">Upload Image</div>
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
                  <RadioGroupItem value="all" id="all-users" className="h-4 w-4" />
                  <Label htmlFor="all-users" className="text-xs font-normal cursor-pointer">
                    All Users
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="branches" id="specific-branches" className="h-4 w-4" />
                  <Label htmlFor="specific-branches" className="text-xs font-normal cursor-pointer">
                    Specific Branches
                  </Label>
                </div>
                {targetAudience === 'branches' && (
                  <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
                    {branches.map((branch) => (
                      <div key={branch.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`branch-${branch.id}`}
                          className="h-4 w-4"
                          checked={selectedBranches.includes(branch.id)}
                          onCheckedChange={() => handleBranchToggle(branch.id)}
                        />
                        <Label htmlFor={`branch-${branch.id}`} className="text-xs font-normal cursor-pointer">
                          {branch.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="role" id="by-role" className="h-4 w-4" />
                  <Label htmlFor="by-role" className="text-xs font-normal cursor-pointer">
                    By Role
                  </Label>
                </div>
                {targetAudience === 'role' && (
                  <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="role-delivery-staff" 
                        className="h-4 w-4"
                        checked={selectedRoles.includes('delivery-staff')}
                        onCheckedChange={() => handleRoleToggle('delivery-staff')}
                      />
                      <Label htmlFor="role-delivery-staff" className="text-xs font-normal cursor-pointer">
                        Delivery Staff
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="role-branch-admins" 
                        className="h-4 w-4"
                        checked={selectedRoles.includes('branch-admins')}
                        onCheckedChange={() => handleRoleToggle('branch-admins')}
                      />
                      <Label htmlFor="role-branch-admins" className="text-xs font-normal cursor-pointer">
                        Branch Admins
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="role-customers" 
                        className="h-4 w-4"
                        checked={selectedRoles.includes('customers')}
                        onCheckedChange={() => handleRoleToggle('customers')}
                      />
                      <Label htmlFor="role-customers" className="text-xs font-normal cursor-pointer">
                        Customers
                      </Label>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific-customers" id="specific-customers" className="h-4 w-4" />
                  <Label htmlFor="specific-customers" className="text-xs font-normal cursor-pointer">
                    Specific Customers
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Delivery</Label>
              <RadioGroup value={deliveryMode} onValueChange={setDeliveryMode}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="send-now" id="send-now" className="h-4 w-4" />
                  <Label htmlFor="send-now" className="text-xs font-normal cursor-pointer">
                    Send Now
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="schedule" id="schedule" className="h-4 w-4" />
                  <Label htmlFor="schedule" className="text-xs font-normal cursor-pointer">
                    Schedule
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" className="h-4 w-4" />
                  <Label htmlFor="draft" className="text-xs font-normal cursor-pointer">
                    Save as Draft
                  </Label>
                </div>
              </RadioGroup>
              
              {deliveryMode === 'schedule' && (
                <div className="ml-6 mt-2 space-y-3">
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs">Date</Label>
                      <Input
                        type="date"
                        className="text-xs h-9"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs">Time</Label>
                      <Input
                        type="time"
                        className="text-xs h-9"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs">Recurring</Label>
                    <Select value={recurring} onValueChange={setRecurring}>
                      <SelectTrigger className="text-xs h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" className="text-xs">None</SelectItem>
                        <SelectItem value="daily" className="text-xs">Daily</SelectItem>
                        <SelectItem value="weekly" className="text-xs">Weekly</SelectItem>
                        <SelectItem value="monthly" className="text-xs">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="pt-4">
            <div className="flex items-center justify-center py-8">
              {/* Mobile Phone Mockup */}
              <div className="relative w-80 h-[600px] bg-black rounded-[40px] p-3 shadow-2xl">
                {/* Phone Screen */}
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
                  {/* Status Bar */}
                  <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between">
                    <span className="text-xs">
                      {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}
                    </span>
                    <div className="flex items-center gap-1">
                      <Signal className="h-3 w-3" />
                      <Wifi className="h-3 w-3" />
                      <Battery className="h-3 w-3" />
                      <span className="text-xs">100%</span>
                    </div>
                  </div>

                  {/* Notification */}
                  <div className="bg-gray-50 p-4 m-4 rounded-xl shadow-md border-l-4 border-blue-500">
                    <div className="flex items-start gap-3">
                      {/* App Icon */}
                      <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="h-5 w-5 text-white" />
                      </div>
                      
                      {/* Notification Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Your App</span>
                          <span className="text-xs text-gray-400">now</span>
                        </div>
                        <h4 className="text-sm mb-1 truncate">
                          {title || 'Weekend Special Offer!'}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {message || 'Get 50% off on all pizzas this weekend. Limited time offer!'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preview Label */}
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-xs text-gray-400">Preview on mobile device</p>
                  </div>
                </div>

                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
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
          {deliveryMode === 'draft' ? (
            <Button
              onClick={handleSaveDraft}
              className="flex-1 bg-gray-600 hover:bg-gray-700 h-9 text-xs"
              disabled={!isFormValid()}
            >
              Save Draft
            </Button>
          ) : deliveryMode === 'schedule' ? (
            <Button
              onClick={handleSchedule}
              className="flex-1 bg-blue-500 hover:bg-blue-600 h-9 text-xs"
              disabled={!isFormValid()}
            >
              Schedule
            </Button>
          ) : (
            <Button
              onClick={handleSendNow}
              className="flex-1 bg-blue-500 hover:bg-blue-600 h-9 text-xs"
              disabled={!isFormValid()}
            >
              Send Now
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}