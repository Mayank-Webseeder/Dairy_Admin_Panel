import { useState } from 'react';
import { Building2, Search, Edit2, Trash2, TrendingUp } from 'lucide-react';
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
import { branches as initialBranches } from '../lib/mockData';
import { Branch } from '../types';
import { AddBranchModal } from '../components/modals/AddBranchModal';
import { EditModal } from '../components/modals/EditModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export function BranchManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [branchList, setBranchList] = useState<Branch[]>(initialBranches);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const filteredBranches = branchList.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBranch = (branch: Partial<Branch>) => {
    setBranchList([...branchList, branch as Branch]);
  };

  const handleEditBranch = (updatedData: Branch) => {
    setBranchList(branchList.map(b => b.id === updatedData.id ? updatedData : b));
  };

  const handleDeleteBranch = () => {
    if (selectedBranch) {
      setBranchList(branchList.filter(b => b.id !== selectedBranch.id));
      setSelectedBranch(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2>Branch Management</h2>
          <p className="text-muted-foreground">Manage all branches and their performance</p>
        </div>
        <Button 
          className="bg-red-500 hover:bg-red-600"
          onClick={() => setAddModalOpen(true)}
        >
          <Building2 className="h-4 w-4 mr-2" />
          Add Branch
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Branches</p>
          <p className="text-2xl font-semibold">{branchList.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
          <p className="text-2xl font-semibold">
            {branchList.reduce((acc, b) => acc + b.orders, 0).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold">
            ₹{branchList.reduce((acc, b) => acc + b.revenue, 0).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-muted-foreground mb-1">Active Branches</p>
          <p className="text-2xl font-semibold">
            {branchList.filter(b => b.status === 'active').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search branches..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Branch Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBranches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell className="text-muted-foreground">{branch.location}</TableCell>
                <TableCell>{branch.manager}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>{branch.orders.toLocaleString('en-IN')}</span>
                  </div>
                </TableCell>
                <TableCell>₹{branch.revenue.toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <Badge
                    variant={branch.status === 'active' ? 'default' : 'secondary'}
                    className={branch.status === 'active' ? 'bg-green-500' : ''}
                  >
                    {branch.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => {
                        setSelectedBranch(branch);
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
                        setSelectedBranch(branch);
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

      <AddBranchModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleAddBranch}
      />

      {selectedBranch && (
        <>
          <EditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={handleEditBranch}
            data={selectedBranch}
            title="Edit Branch"
            fields={[
              { key: 'name', label: 'Branch Name' },
              { key: 'location', label: 'Location' },
              { key: 'manager', label: 'Manager' },
              { key: 'orders', label: 'Orders', type: 'number' },
              { key: 'revenue', label: 'Revenue (₹)', type: 'number' },
            ]}
          />

          <DeleteConfirmationModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onConfirm={handleDeleteBranch}
            title="Are you sure you want to delete?"
            description="This branch and all its data will be permanently removed."
          />
        </>
      )}
    </div>
  );
}
