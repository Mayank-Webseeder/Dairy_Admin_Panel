import { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card } from '../components/ui/card';

interface ProfileSettingsProps {
  onProfileUpdate?: (name: string, photo: string) => void;
}

export function ProfileSettings({ onProfileUpdate }: ProfileSettingsProps) {
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('john.doe@dairy.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onProfileUpdate) {
      onProfileUpdate(name, profilePhoto);
    }
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2>My Profile</h2>
        <p className="text-muted-foreground">Update your profile information</p>
      </div>

      <Card className="p-6">
        {/* Profile Photo Section */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {profilePhoto && <AvatarImage src={profilePhoto} alt={name} />}
              <AvatarFallback className="bg-red-500 text-white text-2xl">
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
            <h3>Profile Photo</h3>
            <p className="text-sm text-muted-foreground">
              Click the camera icon to upload a new photo
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value="Super Admin"
              disabled
              className="bg-muted"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
