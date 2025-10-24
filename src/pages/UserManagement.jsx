import { useState } from 'react';
import { UserPlus, Search, Edit2, Trash2, Download, Filter, Users as UsersIcon, UserCheck, ChevronDown, X, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { users as initialUsers } from '../lib/mockData';
import { AddUserModal } from '../components/modals/AddUserModal';
import { EditModal } from '../components/modals/EditModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState(initialUsers);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState('all');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [moduleFilter, setModuleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false);
  const [sortByDropdownOpen, setSortByDropdownOpen] = useState(false);

  const filteredUsers = userList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || 
      (roleFilter === 'admin' && (user.role === 'Super Admin' || user.role === 'Admin')) ||
      (roleFilter === 'user' && (user.role === 'Manager' || user.role === 'Staff'));
    
    return matchesSearch && matchesRole;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let compareValue = 0;
    switch (sortBy) {
      case 'name':
        compareValue = a.name.localeCompare(b.name);
        break;
      case 'email':
        compareValue = a.email.localeCompare(b.email);
        break;
      case 'date':
        compareValue = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        break;
      case 'role':
        compareValue = a.role.localeCompare(b.role);
        break;
    }
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  const handleAddUser = (user) => {
    setUserList([...userList, user]);
  };

  const handleEditUser = (updatedData) => {
    setUserList(userList.map(u => u.id === updatedData.id ? updatedData : u));
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUserList(userList.filter(u => u.id !== selectedUser.id));
      setSelectedUser(null);
    }
  };

  const handleExport = () => {
    console.log('Exporting users data...');
  };

  const handleClearFilters = () => {
    setRoleFilter('all');
    setModuleFilter('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  const totalUsers = userList.length;
  const adminUsers = userList.filter(u => u.role === 'Super Admin' || u.role === 'Admin').length;
  const activeUsers = userList.filter(u => u.status === 'active').length;

  const modules = [
    'All Modules',
    'Dashboard',
    'User Management',
    'Settings',
    'Reports',
    'Analytics',
    'Audit Logs',
    'Billing',
    'Notifications',
    'Content Management',
    'Integration',
    'API Access',
    'Security'
  ];

  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'email', label: 'Sort by Email' },
    { value: 'date', label: 'Sort by Date' },
    { value: 'role', label: 'Sort by Role' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2>User Management</h2>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={handleExport}
            className="transition-all duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-600 transition-all duration-200"
            onClick={() => setAddModalOpen(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Users</p>
              <h3 className="text-2xl">{totalUsers}</h3>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Admin Users</p>
              <h3 className="text-2xl">{adminUsers}</h3>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Active Users</p>
              <h3 className="text-2xl">{activeUsers}</h3>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b">
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* All Roles Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="transition-all duration-200"
              >
                {roleFilter === 'all' ? 'All Roles' : roleFilter === 'admin' ? 'Admin' : 'User'}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              {roleDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)} />
                  <div className="absolute top-full mt-2 left-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
                    <button
                      onClick={() => {
                        setRoleFilter('all');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      All Roles
                    </button>
                    <button
                      onClick={() => {
                        setRoleFilter('admin');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => {
                        setRoleFilter('user');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      User
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* More Filters Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="transition-all duration-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                More
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Advanced Filter Bar */}
          {moreDropdownOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex gap-3 items-center">
                {/* All Modules Dropdown */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setModuleDropdownOpen(!moduleDropdownOpen)}
                    className="transition-all duration-200"
                  >
                    {moduleFilter === 'all' ? 'All Modules' : moduleFilter}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                  {moduleDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setModuleDropdownOpen(false)} />
                      <div className="absolute top-full mt-2 left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2 max-h-64 overflow-y-auto">
                        {modules.map((module) => (
                          <button
                            key={module}
                            onClick={() => {
                              setModuleFilter(module === 'All Modules' ? 'all' : module);
                              setModuleDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                          >
                            {module}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Sort By Dropdown */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortByDropdownOpen(!sortByDropdownOpen)}
                    className="transition-all duration-200"
                  >
                    {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort by Name'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                  {sortByDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setSortByDropdownOpen(false)} />
                      <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setSortByDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Sort Order Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="transition-all duration-200"
                >
                  {sortOrder === 'asc' ? (
                    <>
                      <ArrowUp className="h-4 w-4 mr-2" />
                      ASC
                    </>
                  ) : (
                    <>
                      <ArrowDown className="h-4 w-4 mr-2" />
                      DESC
                    </>
                  )}
                </Button>

                {/* Clear All Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="ml-auto transition-all duration-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={user.status === 'active' 
                      ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#2e7d32]/20 hover:bg-[#e8f5e9]' 
                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-100'}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.joinDate).toLocaleDateString('en-IN')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      onClick={() => {
                        setSelectedUser(user);
                        setEditModalOpen(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddUserModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleAddUser}
      />

      {selectedUser && (
        <>
          <EditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={handleEditUser}
            data={selectedUser}
            title="Edit User"
            fields={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role' },
            ]}
          />

          <DeleteConfirmationModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onConfirm={handleDeleteUser}
            title="Are you sure you want to delete?"
            description="This user will be permanently removed from the system."
          />
        </>
      )}
    </div>
  );
}