import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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
import { Search, Eye, Edit2, Copy, Trash2 } from 'lucide-react';
import { CreateNotificationModal } from '../components/modals/CreateNotificationModal';
import { EditNotificationModal } from '../components/modals/EditNotificationModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export function PushNotifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Weekend Special Offer!',
      description: 'Get 50% off on all pizzas this weekend. Limited time offer!',
      audience: 'All Users',
      type: 'Promo',
      status: 'sent',
      delivered: 12450,
      opened: 8725,
      clickRate: '37.0%',
      date: '4 Oct 2025',
      time: '03:30 PM',
    },
    {
      id: '2',
      title: 'System Maintenance Notice',
      description: 'Our app will be under maintenance from 2 AM to 4 AM tomorrow.',
      audience: 'All Users',
      type: 'System',
      status: 'scheduled',
      delivered: 0,
      opened: 0,
      clickRate: '0.0%',
      date: '4 Oct 2025',
      time: '02:00 AM',
    },
    {
      id: '3',
      title: 'New Menu Items Available!',
      description: 'Check out our delicious new pasta collection. Order now!',
      audience: 'Downtown Branch',
      type: 'Promo',
      status: 'draft',
      delivered: 0,
      opened: 0,
      clickRate: '0.0%',
      date: 'N/A',
      time: '',
    },
    {
      id: '4',
      title: 'Order Ready for Pickup',
      description: 'Your order #ORD-1234 is ready for pickup at Downtown Branch.',
      audience: 'Specific Customers',
      type: 'Order',
      status: 'sent',
      delivered: 1,
      opened: 1,
      clickRate: '100%',
      date: '3 Oct 2025',
      time: '12:45 PM',
    },
  ]);

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience = audienceFilter === 'all' || notif.audience === audienceFilter;
    const matchesType = typeFilter === 'all' || notif.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || notif.status === statusFilter;

    return matchesSearch && matchesAudience && matchesType && matchesStatus;
  });

  const stats = {
    totalSent: notifications.filter(n => n.status === 'sent').length,
    scheduled: notifications.filter(n => n.status === 'scheduled').length,
    drafts: notifications.filter(n => n.status === 'draft').length,
    avgClickRate: '9.3%',
  };

  const handleRefresh = () => {
    console.log('Refreshing notifications...');
  };

  const handleView = (id) => {
    console.log('Viewing notification:', id);
  };

  const handleEdit = (id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      setSelectedNotification(notification);
      setEditModalOpen(true);
    }
  };

  const handleSaveEdit = (updatedData) => {
    if (selectedNotification) {
      setNotifications(notifications.map(n =>
        n.id === selectedNotification.id
          ? { ...n, ...updatedData }
          : n
      ));
      setEditModalOpen(false);
      setSelectedNotification(null);
    }
  };

  const handleDuplicate = (id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      const duplicated = {
        ...notification,
        id: Date.now().toString(),
        title: `${notification.title} (Copy)`,
        status: 'draft',
        delivered: 0,
        opened: 0,
        clickRate: '0.0%',
        date: 'N/A',
        time: '',
      };
      setNotifications([...notifications, duplicated]);
    }
  };

  const handleDelete = (id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      setSelectedNotification(notification);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedNotification) {
      setNotifications(notifications.filter(n => n.id !== selectedNotification.id));
      setDeleteModalOpen(false);
      setSelectedNotification(null);
    }
  };

  return (
    <div className="p-4">
      {/* Header Controls */}
      <div className="mb-4 flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="h-9 text-xs border border-gray-300"
        >
          🔄 Refresh
        </Button>
        <Button
          size="sm"
          onClick={() => setCreateModalOpen(true)}
          className="h-9 text-xs bg-red-500 hover:bg-red-600 border border-red-500"
        >
          + Create Notification
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Total Sent</p>
              <h3 className="text-lg">{stats.totalSent}</h3>
            </div>
            <div className="text-red-500 text-xl">📧</div>
          </div>
        </Card>

        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Scheduled</p>
              <h3 className="text-lg">{stats.scheduled}</h3>
            </div>
            <div className="text-orange-500 text-xl">⏰</div>
          </div>
        </Card>

        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Drafts</p>
              <h3 className="text-lg">{stats.drafts}</h3>
            </div>
            <div className="text-gray-500 text-xl">📝</div>
          </div>
        </Card>

        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Avg Click Rate</p>
              <h3 className="text-lg">{stats.avgClickRate}</h3>
            </div>
            <div className="text-purple-500 text-xl">📊</div>
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
                placeholder="Search notifications..."
                className="pl-9 text-xs h-9 transition-all duration-200 border border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={audienceFilter} onValueChange={setAudienceFilter}>
              <SelectTrigger className="h-9 text-xs w-[140px] border border-gray-300">
                <SelectValue placeholder="All Audiences" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Audiences</SelectItem>
                <SelectItem value="All Users" className="text-xs">All Users</SelectItem>
                <SelectItem value="Downtown Branch" className="text-xs">Downtown Branch</SelectItem>
                <SelectItem value="Specific Customers" className="text-xs">Specific Customers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-9 text-xs w-[120px] border border-gray-300">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Types</SelectItem>
                <SelectItem value="Promo" className="text-xs">Promo</SelectItem>
                <SelectItem value="System" className="text-xs">System</SelectItem>
                <SelectItem value="Order" className="text-xs">Order</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 text-xs w-[120px] border border-gray-300">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Status</SelectItem>
                <SelectItem value="sent" className="text-xs">Sent</SelectItem>
                <SelectItem value="scheduled" className="text-xs">Scheduled</SelectItem>
                <SelectItem value="draft" className="text-xs">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="h-9 text-xs w-[120px] border border-gray-300">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Time</SelectItem>
                <SelectItem value="today" className="text-xs">Today</SelectItem>
                <SelectItem value="week" className="text-xs">This Week</SelectItem>
                <SelectItem value="month" className="text-xs">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>TITLE</TableHead>
              <TableHead>AUDIENCE</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ANALYTICS</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead className="text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id} className="hover:bg-gray-50 transition-colors duration-200 text-xs">
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      {notification.status === 'sent' && '🔴'}
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {notification.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground flex items-center gap-1">
                    👥 {notification.audience}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    notification.type === 'Promo' ? 'bg-blue-50 text-blue-700' :
                    notification.type === 'System' ? 'bg-orange-50 text-orange-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {notification.type === 'Promo' && '🎁'}
                    {notification.type === 'System' && '⚙️'}
                    {notification.type === 'Order' && '📦'}
                    {notification.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    notification.status === 'sent' ? 'bg-[#e8f5e9] text-[#2e7d32]' :
                    notification.status === 'scheduled' ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {notification.status === 'sent' && '✓'}
                    {notification.status === 'scheduled' && '⏰'}
                    {notification.status === 'draft' && '📝'}
                    {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Delivered:</span>
                      <span className="font-medium">{notification.delivered.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Opened:</span>
                      <span className="font-medium">{notification.opened.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Click Rate:</span>
                      <span className="font-medium">{notification.clickRate}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground">
                    {notification.date !== 'N/A' && (
                      <>
                        <p>{notification.date}</p>
                        <p className="text-xs">{notification.time}</p>
                      </>
                    )}
                    {notification.date === 'N/A' && <p>N/A</p>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 hover:bg-green-50 hover:text-green-600"
                      onClick={() => handleView(notification.id)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => handleEdit(notification.id)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => handleDuplicate(notification.id)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 text-xs border border-gray-300" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-red-500 text-white border border-red-500">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border border-gray-300">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border border-gray-300">
              Next
            </Button>
          </div>
        </div>
      </div>

      <CreateNotificationModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      {selectedNotification && (
        <>
          <EditNotificationModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={handleSaveEdit}
            notification={selectedNotification}
          />

          <DeleteConfirmationModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onConfirm={handleConfirmDelete}
            title="Delete Notification"
            description={`Are you sure you want to delete "${selectedNotification.title}"? This action cannot be undone.`}
          />
        </>
      )}
    </div>
  );
}