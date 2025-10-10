import { useState } from 'react';
import { Building2, Search, Edit2, Trash2, Download, MapPin, TrendingUp, CheckCircle, Phone, Mail, ToggleLeft, ToggleRight } from 'lucide-react';
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
    branch.location.toLowerCase().includes(searchQuery.toLowerCase())
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

  const toggleBranchStatus = (branchId: string) => {
    setBranchList(branchList.map(b => 
      b.id === branchId 
        ? { ...b, status: b.status === 'active' ? 'inactive' as 'inactive' : 'active' as 'active' }
        : b
    ));
  };

  const handleExport = () => {
    console.log('Exporting branches data...');
  };

  const totalBranches = branchList.length;
  const activeBranches = branchList.filter(b => b.status === 'active').length;
  const cities = [...new Set(branchList.map(b => b.city))].length;
  const avgPerformance = Math.round(branchList.reduce((acc, b) => acc + b.revenue, 0) / branchList.length / 1000);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg">Branches</h2>
          <p className="text-muted-foreground text-xs">Management</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="transition-all duration-200 h-9 text-xs border-gray-200"
          >
            🔄 Refresh
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="transition-all duration-200 h-9 text-xs bg-red-500 text-white hover:bg-red-600 border-red-500"
          >
            Export
          </Button>
          <Button 
            size="sm"
            className="bg-red-500 hover:bg-red-600 transition-all duration-200 h-9 text-xs"
            onClick={() => setAddModalOpen(true)}
          >
            + Add Branch
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Branches</p>
              <h3 className="text-lg">{totalBranches}</h3>
            </div>
            <div className="h-9 w-9 bg-blue-50 rounded-full flex items-center justify-center">
              <Building2 className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Active Branches</p>
              <h3 className="text-lg">{activeBranches}</h3>
            </div>
            <div className="h-9 w-9 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Cities</p>
              <h3 className="text-lg">{cities}</h3>
            </div>
            <div className="h-9 w-9 bg-purple-50 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4 text-purple-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Avg Performance</p>
              <h3 className="text-lg">₹{avgPerformance}K</h3>
            </div>
            <div className="h-9 w-9 bg-orange-50 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search branches..."
              className="pl-9 text-xs h-9 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>Branch Name</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Admin
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Location
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Contact
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Performance
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBranches.map((branch) => (
              <TableRow key={branch.id} className="hover:bg-gray-50 transition-colors duration-200 text-xs">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">{branch.name}</p>
                      <p className="text-xs text-muted-foreground">{branch.city}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{branch.manager || branch.name.split(' ')[0] + ' Admin'}</p>
                    <p className="text-xs text-muted-foreground">{branch.adminEmail || 'admin@dairy.com'}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{branch.location}</TableCell>
                <TableCell className="text-muted-foreground">
                  {branch.contactNumber || '+91 98765 43210'}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">₹{(branch.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">{branch.orders} orders</p>
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleBranchStatus(branch.id)}
                    className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  >
                    {branch.status === 'active' ? (
                      <>
                        <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-blue-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-5" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-50 text-green-700 hover:bg-green-50 text-xs"
                        >
                          Active
                        </Badge>
                      </>
                    ) : (
                      <>
                        <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-0.5" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs"
                        >
                          Inactive
                        </Badge>
                      </>
                    )}
                  </button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      onClick={() => {
                        setSelectedBranch(branch);
                        setEditModalOpen(true);
                      }}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                      onClick={() => {
                        setSelectedBranch(branch);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
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
              { key: 'manager', label: 'Admin' },
            ]}
          />

          <DeleteConfirmationModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onConfirm={handleDeleteBranch}
            title="Are you sure you want to delete?"
            description="This branch will be permanently removed from the system."
          />
        </>
      )}
    </div>
  );
}
