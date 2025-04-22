"use client";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/ui/data-table";

interface Branch {
  id: number;
  name: string;
  address: string;
  manager: string;
  openingHours: string;
}

// Branch Panel Component
export default function BranchPanel() {
  const branches: Branch[] = [
    {
      id: 1,
      name: "Downtown Branch",
      address: "123 Main St, City",
      manager: "John Doe",
      openingHours: "6:00 AM - 10:00 PM",
    },
    {
      id: 2,
      name: "Uptown Branch",
      address: "456 Oak Ave, City",
      manager: "Jane Smith",
      openingHours: "5:00 AM - 11:00 PM",
    },
    {
      id: 3,
      name: "Suburb Branch",
      address: "789 Pine Rd, Suburb",
      manager: "Mike Johnson",
      openingHours: "7:00 AM - 9:00 PM",
    },
  ];

  const columns: ColumnDef<Branch>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "manager",
      header: "Manager",
    },
    {
      accessorKey: "openingHours",
      header: "Opening Hours",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branch Management</CardTitle>
        <CardDescription>Manage gym branches</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={branches} />
      </CardContent>
    </Card>
  );
}
