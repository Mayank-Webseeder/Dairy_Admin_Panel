import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function UpdatedSettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2>Account Settings</h2>
        <p className="text-muted-foreground">Manage your application and security settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Business Information</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" defaultValue="DairyDash" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@dairydash.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+91 98765 43210" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street, Mumbai, India" />
              </div>
              <Button className="bg-red-500 hover:bg-red-600">Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Operating Hours</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Monday - Friday</Label>
                  <p className="text-sm text-muted-foreground">6:00 AM - 10:00 PM</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Saturday - Sunday</Label>
                  <p className="text-sm text-muted-foreground">7:00 AM - 9:00 PM</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Regional Settings</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" defaultValue="INR (₹)" disabled className="bg-muted" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="Asia/Kolkata (IST)" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Account Email</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email-setting">Email Address</Label>
                <Input id="email-setting" type="email" defaultValue="admin@dairydash.com" />
              </div>
              <p className="text-sm text-muted-foreground">
                This email will be used for account notifications and password recovery
              </p>
              <Button className="bg-red-500 hover:bg-red-600">Update Email</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Change Password</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter current password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
              <Button className="bg-red-500 hover:bg-red-600">Update Password</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Two-Factor Authentication</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable 2FA</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Login Sessions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p>Chrome on Windows</p>
                  <p className="text-sm text-muted-foreground">Last active: 2 minutes ago</p>
                </div>
                <Button variant="outline" size="sm">Revoke</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email about your account activity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new orders arrive</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert when products are running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>System Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about system updates</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Subscription Plan</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4>Pro Plan</h4>
                  <p className="text-sm text-muted-foreground">₹3,999/month • Unlimited orders</p>
                </div>
                <Button variant="outline">Manage Plan</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Payment Method</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p>Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                </div>
                <Button variant="outline">Update</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
