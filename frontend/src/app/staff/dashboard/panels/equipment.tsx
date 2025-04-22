"use client";
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

interface Equipment {
  id: number;
  name: string;
  status: string;
  lastMaintenance: string;
}

// Equipment Panel Component
export default function EquipmentPanel() {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 1,
      name: "Treadmill",
      status: "Operational",
      lastMaintenance: "2023-05-15",
    },
    {
      id: 2,
      name: "Rowing Machine",
      status: "Under Maintenance",
      lastMaintenance: "2023-06-01",
    },
    {
      id: 3,
      name: "Squat Rack",
      status: "Operational",
      lastMaintenance: "2023-04-30",
    },
  ]);

  const columns: ColumnDef<Equipment>[] = [
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
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "lastMaintenance",
      header: "Last Maintenance",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const equipment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(equipment.id.toString())
                }
              >
                Copy equipment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Update status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipment Management</CardTitle>
        <CardDescription>Manage gym equipment inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={equipment} />
      </CardContent>
    </Card>
  );
}
