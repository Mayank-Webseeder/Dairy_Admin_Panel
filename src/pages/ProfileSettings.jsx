import { useState, useEffect } from 'react';
import { Camera, Save, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card } from '../components/ui/card';
import { updateCurrentUser } from '../lib/auth';
import { toast } from 'sonner';

export function ProfileSettings({ onProfileUpdate, currentUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone || '');
      setProfilePhoto(currentUser.profilePhoto || '');
    }
  }, [currentUser]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!currentUser) return;

    // Validate password change if attempted
    if (newPassword) {
      if (currentPassword !== currentUser.password) {
        toast.error('Current password is incorrect');
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }
      if (newPassword.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
    }

    const updates = {
      name,
      phone,
      profilePhoto,
    };

    if (newPassword) {
      updates.password = newPassword;
    }

    updateCurrentUser(updates);
    
    if (onProfileUpdate) {
      onProfileUpdate({ ...currentUser, ...updates });
    }

    toast.success('Profile updated successfully!');
    
    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xs">My Profile</h2>
        <p className="text-xs text-muted-foreground">Update your profile information</p>
      </div>

      <Card className="p-6">
        {/* Profile Photo Section */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {profilePhoto && <AvatarImage src={profilePhoto} alt={name} />}
              <AvatarFallback className="bg-red-500 text-white">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 h-8 w-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
            >
              <Camera className="h-4 w-4 text-white" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
          <div>
            <h3 className="text-xs">Profile Photo</h3>
            <p className="text-xs text-muted-foreground">
              Click the camera icon to upload a new photo
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="text-xs h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="text-xs h-9 bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="text-xs h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs">Role</Label>
              <Input
                id="role"
                value={currentUser?.role || ''}
                disabled
                className="text-xs h-9 bg-gray-50"
              />
            </div>
          </div>

          {/* Change Password Section */}
          <div className="pt-6 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-xs">Change Password</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-xs">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-xs">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-xs">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="text-xs h-9"
                />
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              Leave password fields empty if you don't want to change your password
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t">
            <Button
              onClick={handleSave}
              className="bg-red-500 hover:bg-red-600 text-xs h-9"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}