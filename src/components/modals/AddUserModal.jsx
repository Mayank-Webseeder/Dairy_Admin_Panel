import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { UserPlus, X } from 'lucide-react';
import { addUserToSystem } from '../../lib/auth';

export function AddUserModal({ open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'User',
  });

  const [permissions, setPermissions] = useState({
    // Core
    dashboard: false,
    userManagement: false,
    settings: false,
    // Analytics & Reports
    reports: false,
    analytics: false,
    auditLogs: false,
    // Operations
    billing: false,
    notifications: false,
    contentManagement: false,
    // Development
    integrations: false,
    apiAccess: false,
    security: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user to auth system
    addUserToSystem({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role,
      profilePhoto: ''
    });
    onSave(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'User',
    });
    setPermissions({
      dashboard: false,
      userManagement: false,
      settings: false,
      reports: false,
      analytics: false,
      auditLogs: false,
      billing: false,
      notifications: false,
      contentManagement: false,
      integrations: false,
      apiAccess: false,
      security: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col [&>button]:hidden sm:max-w-2xl">
        <DialogTitle className="sr-only">Create New User</DialogTitle>
        <DialogDescription className="sr-only">Add a new user to your organization</DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <UserPlus className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Create New User</h3>
              <p className="text-xs text-muted-foreground">Add a new user to your organization</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-6 w-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit} id="add-user-form">
            {/* Basic Information */}
            <div className="mb-4">
              <h4 className="text-xs font-medium mb-3 text-red-600">* Basic Information</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name" className="text-xs">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                    className="text-xs h-9 mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                    className="text-xs h-9 mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label htmlFor="password" className="text-xs">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                    required
                    className="text-xs h-9 mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="text-xs h-9 mt-1"
                  />
                </div>
              </div>
              <div className="mt-3">
                <Label htmlFor="role" className="text-xs">Role</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full text-xs h-9 mt-1 border border-gray-300 rounded-md px-3"
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
            </div>

            {/* Permissions & Access */}
            <div className="mb-4">
              <h4 className="text-xs font-medium mb-3 text-red-600">* Permissions & Access</h4>
              
              {/* Core */}
              <div className="mb-3">
                <p className="text-xs font-medium text-blue-600 mb-2">☑️ Core</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.dashboard}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, dashboard: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Dashboard</p>
                      <p className="text-xs text-muted-foreground">Main overview and metrics</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.userManagement}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, userManagement: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">User Management</p>
                      <p className="text-xs text-muted-foreground">Manage users and permissions</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.settings}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, settings: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Settings</p>
                      <p className="text-xs text-muted-foreground">System configuration</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Analytics & Reports */}
              <div className="mb-3">
                <p className="text-xs font-medium text-blue-600 mb-2">☑️ Analytics & Reports</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.reports}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, reports: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Reports</p>
                      <p className="text-xs text-muted-foreground">Generate custom reports</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.analytics}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, analytics: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Analytics</p>
                      <p className="text-xs text-muted-foreground">Advanced analytics dashboard</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.auditLogs}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, auditLogs: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Audit Logs</p>
                      <p className="text-xs text-muted-foreground">System audit trails</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Operations */}
              <div className="mb-3">
                <p className="text-xs font-medium text-blue-600 mb-2">☑️ Operations</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.billing}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, billing: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Billing</p>
                      <p className="text-xs text-muted-foreground">Payment and subscription management</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.notifications}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, notifications: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Notifications</p>
                      <p className="text-xs text-muted-foreground">Email and push notifications</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.contentManagement}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, contentManagement: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Content Management</p>
                      <p className="text-xs text-muted-foreground">Content creation and editing</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Development */}
              <div className="mb-3">
                <p className="text-xs font-medium text-blue-600 mb-2">☑️ Development</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.integrations}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, integrations: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Integrations</p>
                      <p className="text-xs text-muted-foreground">Third-party integrations</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.apiAccess}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, apiAccess: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">API Access</p>
                      <p className="text-xs text-muted-foreground">API keys and documentation</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={permissions.security}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, security: checked })}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-medium">Security</p>
                      <p className="text-xs text-muted-foreground">Security settings and logs</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-xs h-9"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-user-form"
            className="bg-blue-500 hover:bg-blue-600 text-xs h-9"
          >
            Create User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}