import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { ChevronDown, Search, CreditCard, Calendar, ArrowDown, X } from "lucide-react";

// Updated order data with new branch names and various statuses
const ordersData = [
    {
        orderId: "#281209",
        product: "Cow Milk",
        customer: "John Doe",
        branch: "Koramangala Branch",
        amount: "₹1200.00",
        status: "Delivered",
    },
    {
        orderId: "#281210",
        product: "Buffalo Milk",
        customer: "Jane Smith",
        branch: "Andheri West Branch",
        amount: "₹800.00",
        status: "Preparing",
    },
    {
        orderId: "#281211",
        product: "Ghee",
        customer: "Robert Brown",
        branch: "Sector 29 Branch",
        amount: "₹1500.00",
        status: "In Progress",
    },
    {
        orderId: "#281212",
        product: "Curd",
        customer: "Emily White",
        branch: "T. Nagar Branch",
        amount: "₹500.00",
        status: "Completed",
    },
    {
        orderId: "#281213",
        product: "Cow Milk",
        customer: "Michael Green",
        branch: "Koramangala Branch",
        amount: "₹1200.00",
        status: "Cancelled",
    },
     {
        orderId: "#281214",
        product: "Paneer",
        customer: "David Wilson",
        branch: "Andheri West Branch",
        amount: "₹750.00",
        status: "Delivered",
    },
];

const branchOptions = [
    "All Branches",
    "Koramangala Branch",
    "Andheri West Branch",
    "Sector 29 Branch",
    "T. Nagar Branch",
];

const statusOptions = [
    "All Status",
    "Completed",
    "Delivered",
    "In Progress",
    "Preparing",
    "Cancelled",
];


// Updated getStatusBadge function for the new UI
const getStatusBadge = (status) => {
  let dotColorClass = "";
  switch (status) {
    case "Completed":
    case "Delivered":
      dotColorClass = "bg-green-500";
      break;
    case "Preparing":
      dotColorClass = "bg-orange-500";
      break;
    case "In Progress":
      dotColorClass = "bg-blue-500";
      break;
    case "Cancelled":
      dotColorClass = "bg-red-500";
      break;
    default:
      dotColorClass = "bg-gray-500";
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${dotColorClass}`}></span>
      <span className="capitalize text-sm">{status}</span>
    </div>
  );
};

export const Orders = () => {
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedStatus, setSelectedStatus] = useState("All Status");


  const filteredOrders = ordersData.filter(order => {
      const branchMatch = selectedBranch === "All Branches" || order.branch === selectedBranch;
      const statusMatch = selectedStatus === "All Status" || order.status === selectedStatus;
      return branchMatch && statusMatch;
  });

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      {/* Search and Filter Section */}
      <Popover>
        <div className="flex flex-col gap-4 mb-6">
          {/* Top row: Search bar and main buttons */}
          <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                      type="text"
                      placeholder="Search by order ID, customer name, or phone number..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>

              {/* Branch Filter Dropdown */}
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-gray-300 flex-shrink-0">
                          {selectedBranch} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      {branchOptions.map(branch => (
                          <DropdownMenuItem key={branch} onSelect={() => setSelectedBranch(branch)}>
                              {branch}
                          </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
              </DropdownMenu>

              {/* Status Filter Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="border-gray-300 flex-shrink-0">
                            {selectedStatus} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {statusOptions.map(status => (
                            <DropdownMenuItem key={status} onSelect={() => setSelectedStatus(status)}>
                                {status}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

              <PopoverTrigger asChild>
                  <Button variant="outline" className="border-gray-300 flex-shrink-0">
                      More <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
              </PopoverTrigger>
          </div>

          {/* Popover Content for 'More' filters */}
          <PopoverContent className="w-full mt-2 p-2 border-gray-300" align="start">
            <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1 border-gray-300">
                   <CreditCard className="mr-2 h-4 w-4" /> All Payment Methods
                </Button>
                <Button variant="outline" className="flex-1 border-gray-300">
                   <Calendar className="mr-2 h-4 w-4" /> All Time
                </Button>
                <Button variant="outline" className="flex-1 border-gray-300">
                    Sort by Date <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
                 <Button variant="outline" className="flex-1 border-gray-300 hover:bg-red-50 hover:text-red-600">
                   <X className="mr-2 h-4 w-4" /> Clear All
                </Button>
            </div>
          </PopoverContent>
        </div>
      </Popover>


      {/* Orders Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.branch}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};