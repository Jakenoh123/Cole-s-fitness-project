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

interface Room {
  id: number;
  name: string;
  capacity: number;
  equipment: string[];
}

// Room Panel Component
export default function RoomPanel() {
  const rooms: Room[] = [
    {
      id: 1,
      name: "Yoga Studio",
      capacity: 20,
      equipment: ["Yoga mats", "Blocks", "Straps"],
    },
    {
      id: 2,
      name: "Weight Room",
      capacity: 30,
      equipment: ["Dumbbells", "Barbells", "Squat racks"],
    },
    {
      id: 3,
      name: "Cardio Area",
      capacity: 25,
      equipment: ["Treadmills", "Ellipticals", "Stationary bikes"],
    },
  ];

  const columns: ColumnDef<Room>[] = [
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
      accessorKey: "capacity",
      header: "Capacity",
    },
    {
      accessorKey: "equipment",
      header: "Equipment",
      cell: ({ row }) => {
        const equipment = row.getValue("equipment") as string[];
        return <div>{equipment.join(", ")}</div>;
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Management</CardTitle>
        <CardDescription>Manage gym rooms</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={rooms} />
      </CardContent>
    </Card>
  );
}
