import { useState } from 'react';
import { Bike, Search, Edit2, Trash2, Eye, EyeOff, Star, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { deliveryBoys as initialDeliveryBoys } from '../lib/mockData';
import { DeliveryBoy } from '../types';
import { cn } from '../components/ui/utils';
import { EditModal } from '../components/modals/EditModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export function DeliveryStaff() {
  const [searchQuery, setSearchQuery] = useState('');
  const [staffList, setStaffList] = useState<DeliveryBoy[]>(initialDeliveryBoys);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<DeliveryBoy | null>(null);

  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeStaff = staffList.filter(s => s.status === 'active').length;
  const totalOrders = staffList.reduce((acc, s) => acc + s.orders, 0);
  const avgRating = (staffList.reduce((acc, s) => acc + s.rating, 0) / staffList.length).toFixed(1);

  const handleToggleStatus = (staff: DeliveryBoy) => {
    setStaffList(staffList.map(s => 
      s.id === staff.id 
        ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : s
    ));
  };

  const handleEditStaff = (updatedData: DeliveryBoy) => {
    setStaffList(staffList.map(s => s.id === updatedData.id ? updatedData : s));
  };

  const handleDeleteStaff = () => {
    if (selectedStaff) {
      setStaffList(staffList.filter(s => s.id !== selectedStaff.id));
      setSelectedStaff(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2>Delivery Staff Management</h2>
          <p className="text-muted-foreground">Manage delivery team and track performance</p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600">
          <Bike className="h-4 w-4 mr-2" />
          Add Delivery Staff
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Staff</p>
          <p className="text-2xl font-semibold">{staffList.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-muted-foreground mb-1">Active Now</p>
          <p className="text-2xl font-semibold text-green-600">{activeStaff}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Deliveries Today</p>
          <p className="text-2xl font-semibold">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-muted-foreground mb-1">Average Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold">{avgRating}</p>
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search delivery staff..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Member</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Today's Orders</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staff) => {
              const initials = staff.name.split(' ').map(n => n[0]).join('');
              
              return (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-red-500 text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {staff.area}
                    </div>
                  </TableCell>
                  <TableCell>{staff.orders}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{staff.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize",
                        staff.status === 'active' && "bg-green-50 text-green-600",
                        staff.status === 'inactive' && "bg-gray-100 text-gray-600"
                      )}
                    >
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => {
                          setSelectedStaff(staff);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          staff.status === 'active' 
                            ? "hover:bg-yellow-50 hover:text-yellow-600" 
                            : "hover:bg-green-50 hover:text-green-600"
                        )}
                        onClick={() => handleToggleStatus(staff)}
                      >
                        {staff.status === 'active' ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          setSelectedStaff(staff);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedStaff && (
        <>
          <EditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={handleEditStaff}
            data={selectedStaff}
            title="Edit Delivery Staff"
            fields={[
              { key: 'name', label: 'Name' },
              { key: 'area', label: 'Area' },
              { key: 'orders', label: 'Orders', type: 'number' },
              { key: 'rating', label: 'Rating', type: 'number' },
            ]}
          />

          <DeleteConfirmationModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onConfirm={handleDeleteStaff}
            title="Are you sure you want to delete?"
            description="This delivery staff member will be permanently removed."
          />
        </>
      )}
    </div>
  );
}
