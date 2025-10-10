import { useState } from 'react';
import { SlidingSidebar } from './components/SlidingSidebar';
import { UpdatedHeader } from './components/UpdatedHeader';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Products } from './pages/Products';
import { Customers } from './pages/Customers';
import { UpdatedSettings } from './pages/UpdatedSettings';
import { ProfileSettings } from './pages/ProfileSettings';
import { UserManagement } from './pages/UserManagement';
import { BranchManagement } from './pages/BranchManagement';
import { DeliveryStaff } from './pages/DeliveryStaff';
import { HomePageManagement } from './pages/HomePageManagement';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TrendingUp, FileText } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [userName, setUserName] = useState('John Doe');

  const handleProfileUpdate = (name: string, photo: string) => {
    setUserName(name);
    setProfilePhoto(photo);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
      setCurrentPage('login');
      setProfilePhoto('');
      setUserName('John Doe');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'products':
        return <Products />;
      case 'customers':
        return <Customers />;
      case 'delivery-staff':
        return <DeliveryStaff />;
      case 'users':
        return <UserManagement />;
      case 'branches':
        return <BranchManagement />;
      case 'home-management':
        return <HomePageManagement />;
      case 'settings':
        return <UpdatedSettings />;
      case 'profile':
        return <ProfileSettings onProfileUpdate={handleProfileUpdate} />;
      case 'analytics':
        return <ComingSoonPage icon={TrendingUp} title="Analytics" />;
      case 'reports':
        return <ComingSoonPage icon={FileText} title="Reports" />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    if (currentPage === 'signup') {
      return <Signup onSignup={handleSignup} onNavigate={setCurrentPage} />;
    }
    return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
  }

  return (
    <div className="relative h-screen bg-gray-50">
      <SlidingSidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <div className="flex flex-col h-full ml-20">
        <UpdatedHeader 
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          profilePhoto={profilePhoto}
          userName={userName}
          userRole="Super Admin"
        />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

function ComingSoonPage({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="mb-2">{title}</h2>
        <p className="text-muted-foreground">This feature is coming soon!</p>
      </div>
    </div>
  );
}
