import { useState } from 'react';
import { Search, Edit2, Trash2, MoreVertical, Users, UserCheck, Repeat, TrendingUp, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
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
import { customers as initialCustomers } from '../lib/mockData';
import { EditModal } from '../components/modals/EditModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';
import { AddCustomerModal } from '../components/modals/AddCustomerModal';

export function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [customerList, setCustomerList] = useState(initialCustomers);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customerList.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesBranch = branchFilter === 'all' || customer.branch === branchFilter;
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const handleEditCustomer = (updatedData) => {
    setCustomerList(customerList.map(c => c.id === updatedData.id ? updatedData : c));
  };

  const handleAddCustomer = (customer) => {
    setCustomerList([...customerList, customer]);
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomerList(customerList.filter(c => c.id !== selectedCustomer.id));
      setSelectedCustomer(null);
    }
  };

  const toggleCustomerStatus = (customerId) => {
    setCustomerList(customerList.map(c => 
      c.id === customerId 
        ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
        : c
    ));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId, checked) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    }
  };

  const totalCustomers = customerList.length;
  const activeCustomers = customerList.filter(c => c.status === 'active').length;
  const returningCustomers = customerList.filter(c => c.customerType === 'returning').length;
  const highValueCustomers = customerList.filter(c => c.customerType === 'high-value').length;

  const branches = [...new Set(customerList.map(c => c.branch).filter(Boolean))];

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg">Customers</h2>
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
            className="transition-all duration-200 h-9 text-xs bg-red-500 text-white hover:bg-red-600 border-red-500"
          >
            Export
          </Button>
          <Button 
            size="sm"
            className="bg-red-500 hover:bg-red-600 transition-all duration-200 h-9 text-xs"
            onClick={() => setAddModalOpen(true)}
          >
            + Add Customer
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Customers</p>
              <h3 className="text-lg">{totalCustomers}</h3>
            </div>
            <div className="h-9 w-9 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Active Customers</p>
              <h3 className="text-lg">{activeCustomers}</h3>
            </div>
            <div className="h-9 w-9 bg-green-50 rounded-full flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Returning</p>
              <h3 className="text-lg">{returningCustomers}</h3>
            </div>
            <div className="h-9 w-9 bg-purple-50 rounded-full flex items-center justify-center">
              <Repeat className="h-4 w-4 text-purple-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">High-Value</p>
              <h3 className="text-lg">{highValueCustomers}</h3>
            </div>
            <div className="h-9 w-9 bg-orange-50 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b space-y-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-9 text-xs h-8 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="h-8 text-xs w-[140px]">
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
                <SelectTrigger className="h-8 text-xs w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Status</SelectItem>
                  <SelectItem value="active" className="text-xs">Active</SelectItem>
                  <SelectItem value="inactive" className="text-xs">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                <MoreVertical className="h-3 w-3" />
                More
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Show:</span>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="h-8 text-xs w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5" className="text-xs">5</SelectItem>
                  <SelectItem value="10" className="text-xs">10</SelectItem>
                  <SelectItem value="25" className="text-xs">25</SelectItem>
                  <SelectItem value="50" className="text-xs">50</SelectItem>
                </SelectContent>
              </Select>
              <span>entries</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Showing {filteredCustomers.length} of {customerList.length} customers
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
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
                  <MapPin className="h-3 w-3" />
                  Branch
                </div>
              </TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last Order
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enable</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => {
              const initials = customer.name.split(' ').map(n => n[0]).join('').substring(0, 2);
              return (
                <TableRow key={customer.id} className="hover:bg-gray-50 transition-colors duration-200 text-xs">
                  <TableCell>
                    <Checkbox 
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-medium">{initials}</span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        {customer.customerType && (
                          <Badge 
                            variant="secondary" 
                            className={`text-[10px] h-4 px-1 ${
                              customer.customerType === 'high-value' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                              customer.customerType === 'returning' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-green-50 text-green-700 border-green-200'
                            }`}
                          >
                            {customer.customerType}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{customer.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{customer.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{customer.branch || '-'}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{customer.totalOrders}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">₹{customer.totalSpent.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={customer.status === 'active' ? 'default' : 'secondary'}
                      className={`text-[10px] h-5 ${
                        customer.status === 'active' 
                          ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#2e7d32]/20 hover:bg-[#e8f5e9]' 
                          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={customer.status === 'active'}
                      onCheckedChange={() => toggleCustomerStatus(customer.id)}
                      className="h-5 w-9 data-[state=checked]:bg-blue-500"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          setSelectedCustomer(customer);
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
            Showing {Math.min(filteredCustomers.length, parseInt(entriesPerPage))} of {filteredCustomers.length} entries
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 text-xs" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-red-500 text-white border-red-500">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleAddCustomer}
        branches={branches}
      />

      {/* Edit Modal */}
      {selectedCustomer && (
        <EditModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onSave={handleEditCustomer}
          data={selectedCustomer}
          title="Edit Customer"
          fields={[
            { key: 'name', label: 'Customer Name', type: 'text' },
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
        onConfirm={handleDeleteCustomer}
        title="Delete Customer"
        description={`Are you sure you want to delete ${selectedCustomer?.name}? This action cannot be undone.`}
      />
    </div>
  );
}