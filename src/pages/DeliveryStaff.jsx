import { useState } from 'react';
import { Search, Edit2, Trash2, Eye, X, ChevronDown, Star, Users, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { deliveryBoys as initialDeliveryBoys } from '../lib/mockData';
import { AddDeliveryStaffModal } from '../components/modals/AddDeliveryStaffModal';
import { EditModal } from '../components/modals/EditModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export function DeliveryStaff() {
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deliveryStaffList, setDeliveryStaffList] = useState(initialDeliveryBoys);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStaffMember, setSelectedStaffMember] = useState(null);
  const [bulkAction, setBulkAction] = useState('');

  const filteredStaff = deliveryStaffList.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone?.includes(searchQuery);
    const matchesBranch = branchFilter === 'all' || staff.branch === branchFilter;
    const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
    
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const handleAddStaff = (staff) => {
    setDeliveryStaffList([...deliveryStaffList, staff]);
  };

  const handleEditStaff = (updatedData) => {
    setDeliveryStaffList(deliveryStaffList.map(s => s.id === updatedData.id ? updatedData : s));
  };

  const handleDeleteStaff = () => {
    if (selectedStaffMember) {
      setDeliveryStaffList(deliveryStaffList.filter(s => s.id !== selectedStaffMember.id));
      setSelectedStaffMember(null);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStaff(filteredStaff.map(s => s.id));
    } else {
      setSelectedStaff([]);
    }
  };

  const handleSelectStaff = (staffId, checked) => {
    if (checked) {
      setSelectedStaff([...selectedStaff, staffId]);
    } else {
      setSelectedStaff(selectedStaff.filter(id => id !== staffId));
    }
  };

  const handleBulkAction = () => {
    if (bulkAction === 'activate') {
      setDeliveryStaffList(deliveryStaffList.map(s => 
        selectedStaff.includes(s.id) ? { ...s, status: 'active' } : s
      ));
    } else if (bulkAction === 'deactivate') {
      setDeliveryStaffList(deliveryStaffList.map(s => 
        selectedStaff.includes(s.id) ? { ...s, status: 'inactive' } : s
      ));
    } else if (bulkAction === 'delete') {
      setDeliveryStaffList(deliveryStaffList.filter(s => !selectedStaff.includes(s.id)));
    }
    setSelectedStaff([]);
    setBulkAction('');
  };

  const activeStaff = deliveryStaffList.filter(s => s.status === 'active').length;
  const totalOrders = deliveryStaffList.reduce((acc, s) => acc + (s.completedOrders || 0), 0);
  const avgDeliveryTime = '30m';

  const branches = [...new Set(deliveryStaffList.map(s => s.branch).filter(Boolean))];

  return (
    <div className="p-4">
      {/* Top Buttons */}
      <div className="mb-4 flex items-center justify-end">
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="transition-all duration-200 h-9 text-xs border border-gray-300"
          >
            📤 Export
          </Button>
          <Button 
            size="sm"
            className="bg-red-500 hover:bg-red-600 transition-all duration-200 h-9 text-xs border border-red-500"
            onClick={() => setAddModalOpen(true)}
          >
            + Add Staff
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Active Staff</p>
              <h3 className="text-2xl font-semibold">{activeStaff}</h3>
            </div>
            <div className="h-9 w-9 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Orders</p>
              <h3 className="text-2xl font-semibold">{totalOrders}</h3>
            </div>
            <div className="h-9 w-9 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Avg Delivery Time</p>
              <h3 className="text-2xl font-semibold">{avgDeliveryTime}</h3>
            </div>
            <div className="h-9 w-9 bg-orange-50 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b space-y-3">
          {/* Search and Filters Row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Search by name or phone..."
                className="pl-9 text-xs h-9 transition-all duration-200 border border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="h-9 text-xs w-[140px] border border-gray-300">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Branches</SelectItem>
                {branches.map(branch => (
                  <SelectItem key={branch} value={branch} className="text-xs">{branch}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 text-xs w-[120px] border border-gray-300">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Status</SelectItem>
                <SelectItem value="active" className="text-xs">Active</SelectItem>
                <SelectItem value="inactive" className="text-xs">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {selectedStaff.length > 0 && (
              <>
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="h-9 text-xs w-[140px] border border-gray-300">
                    <SelectValue placeholder="Bulk Actions..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activate" className="text-xs">Activate Selected</SelectItem>
                    <SelectItem value="deactivate" className="text-xs">Deactivate Selected</SelectItem>
                    <SelectItem value="delete" className="text-xs text-red-600">Delete Selected</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 h-9 text-xs border border-red-500"
                  onClick={handleBulkAction}
                  disabled={!bulkAction}
                >
                  Apply
                </Button>
              </>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedStaff.length === filteredStaff.length && filteredStaff.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>STAFF</TableHead>
              <TableHead>CONTACT</TableHead>
              <TableHead>BRANCH</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>PERFORMANCE</TableHead>
              <TableHead>CURRENT ORDERS</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staff) => {
              const initials = staff.name.split(' ').map(n => n[0]).join('').substring(0, 2);
              return (
                <TableRow key={staff.id} className="hover:bg-gray-50 transition-colors duration-200 text-xs">
                  <TableCell>
                    <Checkbox 
                      checked={selectedStaff.includes(staff.id)}
                      onCheckedChange={(checked) => handleSelectStaff(staff.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-medium">{initials}</span>
                      </div>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">Joined {staff.joinedDate || 'N/A'}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{staff.phone || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">{staff.email || 'N/A'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{staff.branch || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={staff.status === 'active' ? 'default' : 'secondary'}
                      className={`text-[10px] h-5 ${
                        staff.status === 'active' 
                          ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#2e7d32]/20 hover:bg-[#e8f5e9]' 
                          : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-50'
                      }`}
                    >
                      {staff.status === 'active' ? '✓ active' : '✕ inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{staff.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {staff.completedOrders || 0} orders completed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {staff.avgDeliveryTime || 'N/A'} avg delivery
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{staff.currentOrders || 0} active orders</p>
                      <p className="text-xs text-muted-foreground">
                        Today: {staff.currentOrders || 0} | Week: {staff.weekOrders || 0}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => {
                          setSelectedStaffMember(staff);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-green-50 hover:text-green-600"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          setSelectedStaffMember(staff);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing {filteredStaff.length} of {deliveryStaffList.length} staff members
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 text-xs border border-gray-300" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-red-500 text-white border border-red-500">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border border-gray-300">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      <AddDeliveryStaffModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleAddStaff}
      />

      {/* Edit Modal */}
      {selectedStaffMember && (
        <EditModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onSave={handleEditStaff}
          data={selectedStaffMember}
          title="Edit Delivery Staff"
          fields={[
            { key: 'name', label: 'Staff Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'phone', label: 'Phone', type: 'text' },
            { key: 'branch', label: 'Branch', type: 'text' },
          ]}
        />
      )}

      {/* Delete Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteStaff}
        title="Delete Delivery Staff"
        description={`Are you sure you want to delete ${selectedStaffMember?.name}? This action cannot be undone.`}
      />
    </div>
  );
}