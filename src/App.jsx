import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Customers } from './pages/Customers';
import { BranchManagement } from './pages/BranchManagement';
import { DeliveryStaff } from './pages/DeliveryStaff';
import { Settings } from './pages/Settings';
import { ProfileSettings } from './pages/ProfileSettings';
import { HomePageManagement } from './pages/HomePageManagement';
import { UserManagement } from './pages/UserManagement';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { UpdatedHeader } from './components/UpdatedHeader';
import { UpdatedSettings } from './pages/UpdatedSettings';
import { SlidingSidebar } from './components/SlidingSidebar';
import { SearchPopup } from './components/SearchPopup';

const pages = {
  dashboard: <Dashboard />,
  products: <Products />,
  orders: <Orders />,
  customers: <Customers />,
  branches: <BranchManagement />,
  'delivery-staff': <DeliveryStaff />,
  settings: <Settings />,
  'profile-settings': <ProfileSettings />,
  'home-page': <HomePageManagement />,
  'user-management': <UserManagement />,
  'updated-settings': <UpdatedSettings />,
};

export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profileName, setProfileName] = useState('John Doe');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const handleSignup = () => {
    setIsLoggedIn(true);
    setAuthPage('login'); // Redirect to login after signup
  };

  const handleProfileUpdate = (name, photo) => {
    setProfileName(name);
    setProfilePhoto(photo);
  };

  useEffect(() => {
    document.title = `DairyDash | ${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}`;
  }, [currentPage]);

  if (!isLoggedIn) {
    if (authPage === 'login') {
      return <Login onLogin={handleLogin} onNavigate={setAuthPage} />;
    }
    return <Signup onSignup={handleSignup} onNavigate={setAuthPage} />;
  }

  const PageComponent = pages[currentPage] || <Dashboard />;
  
  // Clone the element to pass props
  const pageWithProps = PageComponent.type === ProfileSettings
    ? <ProfileSettings onProfileUpdate={handleProfileUpdate} />
    : PageComponent;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <SlidingSidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <UpdatedHeader 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onSearchClick={() => setIsSearchOpen(true)}
          profileName={profileName}
          profilePhoto={profilePhoto}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {pageWithProps}
          </div>
        </main>
      </div>
      
      <SearchPopup isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </div>
  );
}