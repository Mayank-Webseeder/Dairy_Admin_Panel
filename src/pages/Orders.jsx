import { useState } from 'react';
import { Search, Edit2, Trash2, Download, Filter, ChevronDown, X, Eye, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { orders as initialOrders } from '../lib/mockData';
import { EditModal } from '../components/modals/EditModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orderList, setOrderList] = useState(initialOrders);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredOrders = orderList.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditOrder = (updatedData) => {
    setOrderList(orderList.map(o => o.id === updatedData.id ? updatedData : o));
  };

  const handleDeleteOrder = () => {
    if (selectedOrder) {
      setOrderList(orderList.filter(o => o.id !== selectedOrder.id));
      setSelectedOrder(null);
    }
  };

  const handleExport = () => {
    console.log('Exporting orders data...');
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setDateFilter('all');
    setSearchQuery('');
  };

  const totalOrders = orderList.length;
  const completedOrders = orderList.filter(o => o.status === 'completed').length;
  const pendingOrders = orderList.filter(o => o.status === 'pending').length;
  const cancelledOrders = orderList.filter(o => o.status === 'cancelled').length;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg">Orders</h2>
          <p className="text-muted-foreground text-xs">Manage all customer orders</p>
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
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
              <h3 className="text-lg">{totalOrders}</h3>
            </div>
            <div className="h-9 w-9 bg-blue-50 rounded-full flex items-center justify-center">
              <span className="text-blue-500">📦</span>
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Completed</p>
              <h3 className="text-lg">{completedOrders}</h3>
            </div>
            <div className="h-9 w-9 bg-green-50 rounded-full flex items-center justify-center">
              <span className="text-green-500">✓</span>
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Pending</p>
              <h3 className="text-lg">{pendingOrders}</h3>
            </div>
            <div className="h-9 w-9 bg-yellow-50 rounded-full flex items-center justify-center">
              <span className="text-yellow-500">⏱</span>
            </div>
          </div>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Cancelled</p>
              <h3 className="text-lg">{cancelledOrders}</h3>
            </div>
            <div className="h-9 w-9 bg-red-50 rounded-full flex items-center justify-center">
              <span className="text-red-500">✕</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b space-y-3">
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Search orders, customers..."
                className="pl-9 text-xs h-9 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* All Status Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="transition-all duration-200 text-xs h-9"
              >
                All Status
                <ChevronDown className="h-3 w-3 ml-2" />
              </Button>
              {statusDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setStatusDropdownOpen(false)} />
                  <div className="absolute top-full mt-2 left-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
                    {['all', 'completed', 'pending', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setStatusDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 text-xs capitalize"
                      >
                        {status === 'all' ? 'All Status' : status}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* All Time Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                className="transition-all duration-200 text-xs h-9"
              >
                All Time
                <ChevronDown className="h-3 w-3 ml-2" />
              </Button>
              {dateDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDateDropdownOpen(false)} />
                  <div className="absolute top-full mt-2 left-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
                    {['all', 'today', 'week', 'month'].map((period) => (
                      <button
                        key={period}
                        onClick={() => {
                          setDateFilter(period);
                          setDateDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 text-xs capitalize"
                      >
                        {period === 'all' ? 'All Time' : period}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* More Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="transition-all duration-200 text-xs h-9"
              >
                <Filter className="h-3 w-3 mr-2" />
                More
                <ChevronDown className="h-3 w-3 ml-2" />
              </Button>
            </div>

            {/* Clear All Button */}
            {(statusFilter !== 'all' || dateFilter !== 'all' || searchQuery) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="transition-all duration-200 text-xs h-9"
              >
                <X className="h-3 w-3 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Showing entries */}
        <div className="px-4 py-2 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Show:</span>
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-xs"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Showing {Math.min(filteredOrders.length, entriesPerPage)} of {filteredOrders.length} orders
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.slice(0, entriesPerPage).map((order) => {
              const initials = order.customerName.split(' ').map(n => n[0]).join('');
              return (
                <TableRow key={order.id} className="hover:bg-gray-50 transition-colors duration-200 text-xs">
                  <TableCell>
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell>
                    <span className="text-blue-600 font-medium">#{order.id.split('-')[1]}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-gray-900 text-white text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{order.customerName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.items}</TableCell>
                  <TableCell className="font-medium">₹{order.total}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.date).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        order.status === 'completed' 
                          ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#2e7d32]/20 hover:bg-[#e8f5e9] text-[10px] h-5' 
                          : order.status === 'pending'
                          ? 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50 text-[10px] h-5'
                          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-100 text-[10px] h-5'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-7 w-7 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-7 w-7 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        onClick={() => {
                          setSelectedOrder(order);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-7 w-7 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                        onClick={() => {
                          setSelectedOrder(order);
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

        {/* Pagination info */}
        <div className="p-4 border-t flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs">
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

      {selectedOrder && (
        <>
          <EditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={handleEditOrder}
            data={selectedOrder}
            title="Edit Order"
            fields={[
              { key: 'customerName', label: 'Customer Name' },
              { key: 'items', label: 'Items', type: 'number' },
              { key: 'total', label: 'Total', type: 'number' },
            ]}
          />

          <DeleteConfirmationModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onConfirm={handleDeleteOrder}
            title="Are you sure you want to delete?"
            description="This order will be permanently removed from the system."
          />
        </>
      )}
    </div>
  );
}