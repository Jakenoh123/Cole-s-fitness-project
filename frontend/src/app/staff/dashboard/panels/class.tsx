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

interface Class {
  id: number;
  name: string;
  instructor: string;
  schedule: string;
  room: string;
  capacity: number;
}

// Class Panel Component
export default function ClassPanel() {
  const classes: Class[] = [
    {
      id: 1,
      name: "Yoga Flow",
      instructor: "Sarah Johnson",
      schedule: "Mon, Wed, Fri 8:00 AM",
      room: "Yoga Studio",
      capacity: 20,
    },
    {
      id: 2,
      name: "HIIT Blast",
      instructor: "Mike Smith",
      schedule: "Tue, Thu 6:00 PM",
      room: "Cardio Area",
      capacity: 15,
    },
    {
      id: 3,
      name: "Strength Training",
      instructor: "Emily Brown",
      schedule: "Mon, Wed, Fri 5:00 PM",
      room: "Weight Room",
      capacity: 12,
    },
  ];

  const columns: ColumnDef<Class>[] = [
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
      accessorKey: "instructor",
      header: "Instructor",
    },
    {
      accessorKey: "schedule",
      header: "Schedule",
    },
    {
      accessorKey: "room",
      header: "Room",
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Management</CardTitle>
        <CardDescription>Manage fitness classes</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={classes} />
      </CardContent>
    </Card>
  );
}
