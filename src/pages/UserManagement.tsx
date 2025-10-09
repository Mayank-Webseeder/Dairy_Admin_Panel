import { useState } from 'react';
import { UserPlus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { users as initialUsers } from '../lib/mockData';
import { User } from '../types';
import { AddUserModal } from '../components/modals/AddUserModal';
import { EditModal } from '../components/modals/EditModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = userList.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (user: Partial<User>) => {
    setUserList([...userList, user as User]);
  };

  const handleEditUser = (updatedData: User) => {
    setUserList(userList.map(u => u.id === updatedData.id ? updatedData : u));
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUserList(userList.filter(u => u.id !== selectedUser.id));
      setSelectedUser(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2>User Management</h2>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>
        <Button 
          className="bg-red-500 hover:bg-red-600"
          onClick={() => setAddModalOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
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
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    className={user.status === 'active' ? 'bg-green-500' : ''}
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
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
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
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
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
