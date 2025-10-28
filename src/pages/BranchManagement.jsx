import { useState } from 'react';
import { Building2, Search, Edit2, Trash2, Download, MapPin, TrendingUp, CheckCircle, Phone, Mail, ToggleLeft, ToggleRight, MoreVertical, ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
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
import { branches as initialBranches } from '../lib/mockData';
import { AddBranchModal } from '../components/modals/AddBranchModal';
import { EditBranchModal } from '../components/modals/EditBranchModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export function BranchManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [branchList, setBranchList] = useState(initialBranches);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  
  // More filter states
  const [performanceFilter, setPerformanceFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredBranches = branchList.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || branch.status === statusFilter;
    const matchesCity = cityFilter === 'all' || branch.city === cityFilter;
    
    // Performance filter
    let matchesPerformance = true;
    if (performanceFilter !== 'all') {
      const performancePercent = Math.min((branch.revenue / 150000) * 100, 100);
      if (performanceFilter === 'high') {
        matchesPerformance = performancePercent >= 80;
      } else if (performanceFilter === 'medium') {
        matchesPerformance = performancePercent >= 60 && performancePercent < 80;
      } else if (performanceFilter === 'low') {
        matchesPerformance = performancePercent < 60;
      }
    }
    
    return matchesSearch && matchesStatus && matchesCity && matchesPerformance;
  }).sort((a, b) => {
    // Apply sorting
    let compareValue = 0;
    if (sortBy === 'name') compareValue = a.name.localeCompare(b.name);
    else if (sortBy === 'city') compareValue = a.city.localeCompare(b.city);
    else if (sortBy === 'performance') compareValue = a.revenue - b.revenue;
    else if (sortBy === 'revenue') compareValue = a.revenue - b.revenue;
    else if (sortBy === 'date') compareValue = 0; // Add date field if needed
    else if (sortBy === 'contact') compareValue = (a.contactNumber || '').localeCompare(b.contactNumber || '');
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  const handleAddBranch = (branch) => {
    setBranchList([...branchList, branch]);
  };

  const handleEditBranch = (updatedData) => {
    setBranchList(branchList.map(b => b.id === updatedData.id ? updatedData : b));
  };

  const handleDeleteBranch = () => {
    if (selectedBranch) {
      setBranchList(branchList.filter(b => b.id !== selectedBranch.id));
      setSelectedBranch(null);
    }
  };

  const toggleBranchStatus = (branchId) => {
    setBranchList(branchList.map(b => 
      b.id === branchId 
        ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' }
        : b
    ));
  };

  const handleExport = () => {
    console.log('Exporting branches data...');
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setCityFilter('all');
    setPerformanceFilter('all');
    setTimeFilter('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  const totalBranches = branchList.length;
  const activeBranches = branchList.filter(b => b.status === 'active').length;
  const cities = [...new Set(branchList.map(b => b.city))].length;
  const avgPerformance = Math.round(branchList.reduce((acc, b) => acc + b.revenue, 0) / branchList.length / 1000);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-end">
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="transition-all duration-200 h-9 text-xs border border-gray-300"
          >
            🔄 Refresh
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="transition-all duration-200 h-9 text-xs bg-red-500 text-white hover:bg-red-600 border border-red-500"
          >
            Export
          </Button>
          <Button 
            size="sm"
            className="bg-red-500 hover:bg-red-600 transition-all duration-200 h-9 text-xs border border-red-500"
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
        <div className="p-4 border-b space-y-3">
          {/* Single Row with Search and Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Search branches..."
                className="pl-9 text-xs h-9 transition-all duration-200 border border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 text-xs w-[140px] border border-gray-300">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Status</SelectItem>
                <SelectItem value="active" className="text-xs">Active</SelectItem>
                <SelectItem value="inactive" className="text-xs">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="h-9 text-xs w-[140px] border border-gray-300">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Cities</SelectItem>
                {[...new Set(branchList.map(b => b.city))].map(city => (
                  <SelectItem key={city} value={city} className="text-xs">{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 text-xs gap-1 border border-gray-300"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
            >
              <Filter className="h-3 w-3" />
              More
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>

          {/* More Filters Row (shown when More is clicked) */}
          {moreDropdownOpen && (
            <div className="flex items-center gap-2 flex-wrap p-3 bg-gray-50 rounded-lg">
              <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                <SelectTrigger className="w-40 h-9 text-xs border border-gray-300">
                  <SelectValue placeholder="All Performance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Performance</SelectItem>
                  <SelectItem value="high">High (80%+)</SelectItem>
                  <SelectItem value="medium">Medium (60-79%)</SelectItem>
                  <SelectItem value="low">Low (&lt;60%)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32 h-9 text-xs border border-gray-300">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Active Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36 h-9 text-xs border border-gray-300">
                  <SelectValue placeholder="Sort by Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="city">Sort by City</SelectItem>
                  <SelectItem value="performance">Sort by Performance</SelectItem>
                  <SelectItem value="revenue">Sort by Revenue</SelectItem>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="h-9 text-xs border border-gray-300"
              >
                {sortOrder === 'asc' ? '↑ ASC' : '↓ DESC'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="gap-1 h-9 text-xs border border-gray-300"
              >
                <X className="h-3 w-3" />
                Clear All
              </Button>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Showing {filteredBranches.length} of {branchList.length} branches
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Admin
                </div>
              </TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enable</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBranches.slice(0, parseInt(entriesPerPage)).map((branch) => (
              <TableRow key={branch.id} className="hover:bg-gray-50 transition-colors duration-200 text-xs">
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
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
                <TableCell className="text-muted-foreground">{branch.location}</TableCell>
                <TableCell className="text-muted-foreground">
                  {branch.contactNumber || '+91 98765 43210'}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{branch.manager || branch.name.split(' ')[0] + ' Admin'}</p>
                    <p className="text-xs text-muted-foreground">{branch.adminEmail || 'admin@dairy.com'}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${Math.min((branch.revenue / 150000) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((branch.revenue / 150000) * 100)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">₹{(branch.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">{branch.orders} orders</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`text-xs h-5 ${
                      branch.status === 'active' 
                        ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#2e7d32]/20 hover:bg-[#e8f5e9]' 
                        : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {branch.status === 'active' ? 'Active' : 'Disabled'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleBranchStatus(branch.id)}
                    className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  >
                    {branch.status === 'active' ? (
                      <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-blue-500">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-5" />
                      </div>
                    ) : (
                      <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-0.5" />
                      </div>
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

        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
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

      <AddBranchModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleAddBranch}
      />

      {selectedBranch && (
        <>
          <EditBranchModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={handleEditBranch}
            data={selectedBranch}
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