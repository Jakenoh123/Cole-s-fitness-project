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

interface Schedule {
  id: number;
  className: string;
  instructor: string;
  date: string;
  time: string;
  room: string;
}

// Scheduling Panel Component
export default function SchedulingPanel() {
  const schedules: Schedule[] = [
    {
      id: 1,
      className: "Yoga Flow",
      instructor: "Sarah Johnson",
      date: "2023-05-15",
      time: "8:00 AM",
      room: "Yoga Studio",
    },
    {
      id: 2,
      className: "HIIT Blast",
      instructor: "Mike Smith",
      date: "2023-05-16",
      time: "6:00 PM",
      room: "Cardio Area",
    },
    {
      id: 3,
      className: "Strength Training",
      instructor: "Emily Brown",
      date: "2023-05-17",
      time: "5:00 PM",
      room: "Weight Room",
    },
  ];

  const columns: ColumnDef<Schedule>[] = [
    {
      accessorKey: "className",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Class
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
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "time",
      header: "Time",
    },
    {
      accessorKey: "room",
      header: "Room",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduling</CardTitle>
        <CardDescription>Manage class schedules</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={schedules} />
      </CardContent>
    </Card>
  );
}
